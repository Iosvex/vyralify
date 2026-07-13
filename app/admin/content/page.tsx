"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { db, storage } from "@/lib/firebase/client";
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  UploadCloud,
  File as FileIcon,
  Trash2,
  Search,
  ExternalLink,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

interface ContentAsset {
  id: string;
  name: string;
  fileType: "video" | "pdf" | "template";
  tier: "standard" | "pro";
  category: "Hooks" | "CTAs" | "Templates";
  storagePath: string;
  downloadURL: string;
  uploadedAt: any;
}

export default function ContentManager() {
  const [assets, setAssets] = useState<ContentAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTierFilter, setSelectedTierFilter] = useState<"all" | "standard" | "pro">("all");

  // Form states
  const [assetName, setAssetName] = useState("");
  const [fileType, setFileType] = useState<"video" | "pdf" | "template">("video");
  const [category, setCategory] = useState<"Hooks" | "CTAs" | "Templates">("Hooks");
  const [tier, setTier] = useState<"standard" | "pro">("standard");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [directURL, setDirectURL] = useState("");

  // Upload progress states
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch current assets from Firestore
  const fetchAssets = useCallback(async () => {
    try {
      setLoading(true);
      const q = query(collection(db, "contentAssets"), orderBy("uploadedAt", "desc"));
      const querySnapshot = await getDocs(q);
      const fetchedAssets: ContentAsset[] = [];
      querySnapshot.forEach((docSnap) => {
        const data = docSnap.data();
        fetchedAssets.push({
          id: docSnap.id,
          name: data.name,
          fileType: data.fileType,
          tier: data.tier,
          category: data.category,
          storagePath: data.storagePath,
          downloadURL: data.downloadURL,
          uploadedAt: data.uploadedAt,
        });
      });
      setAssets(fetchedAssets);
    } catch (error) {
      console.error("Error fetching content assets:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  // Dropzone handling
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      // Auto-populate asset name if empty
      if (!assetName) {
        // Strip extension
        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
        setAssetName(nameWithoutExt);
      }
      // Infer file type from extension
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext === "pdf") {
        setFileType("pdf");
      } else if (["mp4", "mov", "avi", "mkv"].includes(ext || "")) {
        setFileType("video");
      } else if (["zip", "rar", "fig", "psd"].includes(ext || "")) {
        setFileType("template");
      }
    }
  }, [assetName]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  // Handle uploading asset
  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const isUsingDirectURL = directURL.trim() !== "";

    if (!isUsingDirectURL && !selectedFile) {
      setErrorMessage("Please select a file to upload or paste a direct URL link.");
      setUploadStatus("error");
      return;
    }

    if (!assetName.trim()) {
      setErrorMessage("Please enter an asset name.");
      setUploadStatus("error");
      return;
    }

    try {
      setUploadStatus("uploading");
      setUploadProgress(10);
      setErrorMessage("");

      if (isUsingDirectURL) {
        // Direct URL Case (Bypasses Storage completely)
        setUploadProgress(50);
        const assetData = {
          name: assetName,
          fileType,
          tier,
          category,
          storagePath: "external_link",
          downloadURL: directURL.trim(),
          uploadedAt: serverTimestamp(),
        };

        await addDoc(collection(db, "contentAssets"), assetData);
        
        setUploadStatus("success");
        setUploadProgress(null);
        setSelectedFile(null);
        setAssetName("");
        setDirectURL("");
        fetchAssets();
      } else {
        // File Upload Case (Uses Local API Upload to public/uploads directory)
        setUploadProgress(30);
        const formData = new FormData();
        formData.append("file", selectedFile!);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        setUploadProgress(70);

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          throw new Error(errData.error || "Failed to upload file to local server");
        }

        const result = await response.json();
        const downloadURL = result.downloadURL;
        setUploadProgress(90);

        const assetData = {
          name: assetName,
          fileType,
          tier,
          category,
          storagePath: `local_upload_${Date.now()}`,
          downloadURL,
          uploadedAt: serverTimestamp(),
        };

        await addDoc(collection(db, "contentAssets"), assetData);

        setUploadStatus("success");
        setUploadProgress(null);
        setSelectedFile(null);
        setAssetName("");
        setDirectURL("");
        fetchAssets();
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setErrorMessage(err.message || "An unexpected error occurred.");
      setUploadStatus("error");
    }
  };

  // Handle deleting asset
  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this asset?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "contentAssets", id));
      // In production, we'd also delete from Storage if needed, but for simplicity:
      setAssets((prev) => prev.filter((asset) => asset.id !== id));
    } catch (error) {
      console.error("Error deleting asset:", error);
      alert("Failed to delete asset.");
    }
  };

  // Filters logic
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTier = selectedTierFilter === "all" || asset.tier === selectedTierFilter;
    
    return matchesSearch && matchesTier;
  });

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Content Vault Manager</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Upload and manage Hooks, Call-to-Actions, and templates distributed to members.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Upload Form Panel */}
        <Card className="lg:col-span-1 border-zinc-200 dark:border-zinc-800">
          <CardHeader>
            <CardTitle>Upload New Asset</CardTitle>
            <CardDescription>Drag files and specify tier access restrictions.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpload} className="space-y-4">
              {/* Dropzone Container */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20"
                    : selectedFile
                    ? "border-zinc-300 dark:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/50"
                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center gap-2">
                  <UploadCloud className={`h-8 w-8 ${isDragActive ? "text-blue-500 animate-pulse" : "text-zinc-400"}`} />
                  {selectedFile ? (
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-50 truncate max-w-[200px] mx-auto">
                        {selectedFile.name}
                      </p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  ) : (
                    <>
                      <p className="text-xs font-semibold">
                        Drag and drop file here, or click to select
                      </p>
                      <p className="text-[10px] text-zinc-400">
                        Supports MP4, PDF, ZIP (Max 100MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="text-center text-[10px] font-bold text-zinc-400 uppercase my-2">— OR —</div>

              <div className="space-y-1.5">
                <label htmlFor="directURL" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  Paste Direct URL Link
                </label>
                <input
                  id="directURL"
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={directURL}
                  onChange={(e) => setDirectURL(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm bg-white dark:border-zinc-800 dark:bg-zinc-900 focus:outline-hidden focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>

              {/* Asset Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Asset Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 50 Highly-Converting Hooks Template"
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm bg-white dark:border-zinc-800 dark:bg-zinc-900 focus:outline-hidden focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                />
              </div>

              {/* Asset Fields Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">File Type</label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value as any)}
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm bg-white dark:border-zinc-800 dark:bg-zinc-900 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="video">Video</option>
                    <option value="pdf">PDF</option>
                    <option value="template">Template</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm bg-white dark:border-zinc-800 dark:bg-zinc-900 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                  >
                    <option value="Hooks">Hooks</option>
                    <option value="CTAs">CTAs</option>
                    <option value="Templates">Templates</option>
                  </select>
                </div>
              </div>

              {/* Tier Access */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Access Tier</label>
                <div className="grid grid-cols-2 gap-2 bg-zinc-100 p-1 rounded-lg dark:bg-zinc-800">
                  <button
                    type="button"
                    onClick={() => setTier("standard")}
                    className={`py-1.5 rounded-md text-xs font-medium transition-all ${
                      tier === "standard"
                        ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-white"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    Standard
                  </button>
                  <button
                    type="button"
                    onClick={() => setTier("pro")}
                    className={`py-1.5 rounded-md text-xs font-medium transition-all ${
                      tier === "pro"
                        ? "bg-blue-600 text-white shadow-xs dark:bg-blue-500"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                    }`}
                  >
                    Pro
                  </button>
                </div>
              </div>

              {/* Action Buttons & Feedback */}
              <div className="pt-2">
                {uploadStatus === "uploading" && (
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs font-medium">
                      <span className="flex items-center gap-1.5 text-blue-600">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Uploading to Storage...
                      </span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-100 rounded-full overflow-hidden dark:bg-zinc-800">
                      <div
                        className="h-full bg-blue-600 transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {uploadStatus === "success" && (
                  <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-4 bg-emerald-50 dark:bg-emerald-950/20 p-3 rounded-lg">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Asset uploaded successfully!</span>
                  </div>
                )}

                {uploadStatus === "error" && (
                  <div className="flex items-center gap-2 text-xs font-medium text-rose-600 dark:text-rose-400 mb-4 bg-rose-50 dark:bg-rose-950/20 p-3 rounded-lg">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span className="break-all">{errorMessage}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={uploadStatus === "uploading" || !selectedFile}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white disabled:bg-zinc-100 dark:disabled:bg-zinc-800 disabled:text-zinc-400"
                >
                  Confirm Upload
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Existing Assets List Panel */}
        <Card className="lg:col-span-2 border-zinc-200 dark:border-zinc-800">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4">
            <div>
              <CardTitle>Asset Directory</CardTitle>
              <CardDescription>Browse, filter, and delete vault contents.</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Search name/category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 rounded-lg border border-zinc-200 pl-9 pr-3 py-1.5 text-xs bg-white dark:border-zinc-800 dark:bg-zinc-900 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                />
              </div>

              {/* Tier Filters */}
              <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-lg dark:bg-zinc-800 text-xs">
                <button
                  onClick={() => setSelectedTierFilter("all")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    selectedTierFilter === "all"
                      ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setSelectedTierFilter("standard")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    selectedTierFilter === "standard"
                      ? "bg-white text-zinc-900 shadow-xs dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-500 hover:text-zinc-900"
                  }`}
                >
                  Std
                </button>
                <button
                  onClick={() => setSelectedTierFilter("pro")}
                  className={`px-2.5 py-1 rounded-md transition-all ${
                    selectedTierFilter === "pro"
                      ? "bg-blue-600 text-white shadow-xs dark:bg-blue-500"
                      : "text-zinc-500 hover:text-white"
                  }`}
                >
                  Pro
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <p className="text-sm text-zinc-500">Querying asset index...</p>
              </div>
            ) : filteredAssets.length === 0 ? (
              <div className="text-center py-20">
                <FileIcon className="h-10 w-10 text-zinc-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-zinc-500">No assets found</p>
                <p className="text-xs text-zinc-400 mt-1">Upload a file or adjust search filters.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-y border-zinc-100 bg-zinc-50/50 dark:border-zinc-800 dark:bg-zinc-900/50 text-[10px] uppercase font-semibold text-zinc-500 tracking-wider">
                      <th className="px-6 py-3">Asset Details</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Type</th>
                      <th className="px-6 py-3">Access Tier</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                    {filteredAssets.map((asset) => (
                      <tr key={asset.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30">
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-zinc-900 dark:text-white">{asset.name}</span>
                            <span className="text-[10px] text-zinc-400 mt-0.5 truncate max-w-[200px]">
                              {asset.storagePath}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium text-zinc-600 dark:text-zinc-300">{asset.category}</td>
                        <td className="px-6 py-4 uppercase font-semibold text-[10px] text-zinc-400">{asset.fileType}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            asset.tier === "pro"
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400"
                              : "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-300"
                          }`}>
                            {asset.tier}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <a
                              href={asset.downloadURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </a>
                            <button
                              onClick={() => handleDelete(asset.id)}
                              className="p-1 text-zinc-400 hover:text-rose-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
