"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useUserProfile } from "@/components/user-profile-provider";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Check,
  Star,
  Sparkles,
  BookOpen,
  Calendar,
  Lock,
  Download,
  ExternalLink,
  MessageSquare,
  Gift,
  Award,
  Video,
  Play,
  FileText,
  Search,
  DollarSign,
  TrendingUp,
  HelpCircle,
  Plus,
} from "lucide-react";
import { db } from "@/lib/firebase/client";
import { collection, query, getDocs, doc, updateDoc, onSnapshot } from "firebase/firestore";
import AiStudio from "@/components/dashboard/ai-studio";

interface ContentAsset {
  id: string;
  title: string;
  description: string;
  category: string;
  tier: "standard" | "pro";
  fileUrl: string;
  createdAt?: any;
}

const CHECKLIST_ITEMS = [
  { id: "pick_niche", label: "Choose Niche", desc: "Run niche quiz & pick monetization targets" },
  { id: "create_name", label: "Create Account Name", desc: "Keep name under 12 characters, niche-focused" },
  { id: "bio_setup", label: "Configure Bio", desc: "1 Hook + 1 Benefit + 1 CTA pointing to link" },
  { id: "grid_aesthetic", label: "Visual Grid Aesthetic", desc: "Select 2 primary colors & premium typography" },
  { id: "clean_posts", label: "Clean Existing Posts", desc: "Delete low performance or off-theme posts" },
  { id: "profile_pic", label: "Upgrade Profile Picture", desc: "Use high-contrast avatar or brand logo" },
  { id: "creator_account", label: "Transition to Creator Account", desc: "Enable full analytics inside Instagram settings" },
  { id: "setup_store", label: "Configure Payhip/Beacons Store", desc: "Set up shop to offer digital products" },
  { id: "payment_gateway", label: "Connect Payment Gateway", desc: "Integrate Stripe or Razorpay for checkout" },
  { id: "affiliate_link", label: "Copy Affiliate Link", desc: "Get custom link to earn 50% commissions" },
];

export default function MemberDashboard() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "home";
  const { profile } = useUserProfile();
  const isPro = profile?.tier === "pro";
  const hasAiAccess =
    profile?.role === "admin" || profile?.subscriptionStatus === "active";

  const [checklist, setChecklist] = useState<Record<string, boolean>>({});

  // Sync checklist state from Firestore
  useEffect(() => {
    if (!profile?.uid) return;
    const userDocRef = doc(db, "users", profile.uid);
    const unsubscribe = onSnapshot(userDocRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setChecklist(data.checklistState || {});
      }
    });
    return () => unsubscribe();
  }, [profile?.uid]);

  const toggleChecklist = async (itemId: string) => {
    if (!profile?.uid) return;
    const updated = { ...checklist, [itemId]: !checklist[itemId] };
    setChecklist(updated); // Optimistic update
    try {
      const userDocRef = doc(db, "users", profile.uid);
      await updateDoc(userDocRef, {
        checklistState: updated,
      });
    } catch (err) {
      console.error("Failed to update checklist in Firestore:", err);
    }
  };

  // Assets state for Content Vault
  const [assets, setAssets] = useState<ContentAsset[]>([]);
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [vaultFilter, setVaultFilter] = useState<"all" | "standard" | "pro">("all");

  // Load Content Vault assets from Firestore
  useEffect(() => {
    if (activeTab === "vault" || activeTab === "downloads") {
      const fetchAssets = async () => {
        setLoadingAssets(true);
        try {
          const q = query(collection(db, "contentAssets"));
          const snap = await getDocs(q);
          const list: ContentAsset[] = [];
          snap.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() } as ContentAsset);
          });
          setAssets(list);
        } catch (err) {
          console.error("Failed to load assets:", err);
        } finally {
          setLoadingAssets(false);
        }
      };
      fetchAssets();
    }
  }, [activeTab]);

  // Tab 1: Home Hub states
  interface NicheRecommendation {
    title: string;
    subNiches: string[];
    cpm: string;
    monetization: string[];
    strategy: string;
  }

  const [nicheAnswers, setNicheAnswers] = useState<string[]>([]);
  const [nicheRecommendation, setNicheRecommendation] = useState<NicheRecommendation | null>(null);
  
  const handleNicheQuiz = (answer: string) => {
    if (nicheAnswers.includes(answer)) {
      setNicheAnswers(nicheAnswers.filter(a => a !== answer));
    } else {
      setNicheAnswers([...nicheAnswers, answer]);
    }
  };

  const calculateNiche = () => {
    if (nicheAnswers.length === 0) return;
    
    if (nicheAnswers.includes("wealth") && nicheAnswers.includes("productivity")) {
      setNicheRecommendation({
        title: "Finance & Solo SaaS Growth",
        subNiches: ["Personal Finance Hacks", "Solopreneur AI Tools", "SaaS Software Walkthroughs"],
        cpm: "High CPM ($18 - $35 per 1k views)",
        monetization: ["Software affiliate links", "Sponsorship listings", "Exclusive newsletters"],
        strategy: "Focus on presenting micro-case studies of SaaS founders using minimalist b-roll slides. Keep descriptions text-heavy with clear action items.",
      });
    } else if (nicheAnswers.includes("luxury") || nicheAnswers.includes("travel")) {
      setNicheRecommendation({
        title: "Aesthetic Luxury & Scenic Escapes",
        subNiches: ["Quiet Luxury Lifestyle", "Cinematic Hotel Tours", "Minimalist Travel Reels"],
        cpm: "Medium-High CPM ($10 - $18 per 1k views)",
        monetization: ["Hotel affiliate bookings", "Brand product integrations", "Aesthetic presets"],
        strategy: "Use slow-paced cinematic drone footage overlayed with high-retention quotes about business, philosophy, and focus. Focus highly on sound effects.",
      });
    } else if (nicheAnswers.includes("health") || nicheAnswers.includes("mindset")) {
      setNicheRecommendation({
        title: "Biohacking & Peak Human Performance",
        subNiches: ["Gym Focus Routines", "Dopamine Detox Blueprints", "Cold Plunge & Sleep Optimization"],
        cpm: "Medium CPM ($6 - $12 per 1k views)",
        monetization: ["High-converting e-books", "Peak Performance templates", "Supplements affiliate"],
        strategy: "Highlight negative hooks (e.g. 'Do not do this in the morning') with high-contrast text slides and fast-paced edits.",
      });
    } else {
      setNicheRecommendation({
        title: "AI Tools & Automation Showcase",
        subNiches: ["Faceless Workflow Automations", "AI Voice Generators", "ChatGPT Prompts Library"],
        cpm: "High CPM ($12 - $22 per 1k views)",
        monetization: ["AI product referral links", "Exclusive prompt manuals", "SaaS sponsorship slots"],
        strategy: "Demonstrate simple screenshared tutorials showing step-by-step instructions. Always include a call to action asking followers to comment a keyword.",
      });
    }
  };

  // Tab 4: Hook Vault states
  const [hookSearch, setHookSearch] = useState("");
  const [hookCategory, setHookCategory] = useState<"all" | "provocative" | "negative" | "question">("all");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyHook = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  // Audio preview states
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);
  const [previewAudio, setPreviewAudio] = useState<HTMLAudioElement | null>(null);

  const togglePlayAudio = (url: string) => {
    if (playingUrl === url) {
      previewAudio?.pause();
      setPlayingUrl(null);
    } else {
      if (previewAudio) {
        previewAudio.pause();
      }
      const audio = new Audio(url);
      audio.play();
      setPreviewAudio(audio);
      setPlayingUrl(url);
      audio.onended = () => {
        setPlayingUrl(null);
      };
    }
  };
  const hooksData = [
    { text: "The government doesn't want you to know this simple tax trick...", category: "provocative", retention: "94%", tier: "standard" },
    { text: "Stop posting reels without doing these 3 things first.", category: "negative", retention: "89%", tier: "standard" },
    { text: "Why does nobody talk about this website that pays you $50/hour?", category: "question", retention: "91%", tier: "standard" },
    { text: "I analyzed 500 viral reels and found a secret structure...", category: "provocative", retention: "96%", tier: "pro" },
    { text: "Do not buy a courses before reading this single page document.", category: "negative", retention: "92%", tier: "pro" },
    { text: "How this faceless account makes $4,000/mo using only free AI tools.", category: "question", retention: "95%", tier: "pro" },
  ];

  // Tab 9: Dropbox Affiliate states
  const [referralsCount, setReferralsCount] = useState(2); // Simulated count
  const referralLink = `https://vyralify.in/?ref=${profile?.affiliateCode || "YOURCODE"}`;

  return (
    <div className="space-y-6 max-w-6xl mx-auto text-zinc-900 dark:text-zinc-50 font-sans">
      
      {/* Dynamic Tab Render */}
      
      {/* -------------------- 1. HOME HUB -------------------- */}
      {activeTab === "home" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Welcome to Vyralify.io!</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Your step-by-step blueprint to build, scale, and monetize your faceless empire starts here.</p>
          </div>

          {/* Intro Welcome Video & Progress Banner */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2 rounded-xl bg-zinc-900 text-white p-6 relative overflow-hidden border border-zinc-800 flex flex-col justify-between min-h-[300px]">
              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Introduction video</span>
                <h3 className="text-2xl font-bold">Watch This First: How To Navigate the Platform</h3>
                <p className="text-zinc-300 text-sm max-w-lg"> Ashwin walks you through the exact structure of Vyralify, where to grab your viral hooks, and how to configure your affiliate link to earn commissions.</p>
              </div>
              <div className="mt-6 flex items-center gap-3">
                <Button className="bg-emerald-600 hover:bg-emerald-500 text-white border-none shadow-lg shadow-emerald-500/20">
                  <Play className="h-4 w-4 fill-white mr-2" /> Play Guide (5:14)
                </Button>
                <span className="text-xs text-zinc-400">Updated: 3 days ago</span>
              </div>
            </div>

            <div className="rounded-xl bg-white border border-zinc-200 p-6 dark:bg-zinc-900 dark:border-zinc-800 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-lg">Your Milestone Progress</h4>
                <p className="text-xs text-zinc-400 mt-1">Unlock rewards by sharing your code and referring new creators.</p>
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Milestone 1 (Canva Pack)</span>
                    <span className="text-emerald-500">2 / 1 Ref</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[100%]" />
                  </div>
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Milestone 2 (CapCut Library)</span>
                    <span className="text-zinc-400">2 / 3 Refs</span>
                  </div>
                  <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-600 h-full w-[66%]" />
                  </div>
                </div>
              </div>
              <Button variant="outline" className="mt-6 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 text-sm font-semibold">
                Go to Affiliate Hub
              </Button>
            </div>
          </div>

          {/* Phase 1: Interactive Niche Quiz */}
          <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-500" /> Phase 1: Choose Your Niche
              </CardTitle>
              <CardDescription>Select your core interests to calculate your high-converting faceless niche suggestion.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                {[
                  { id: "wealth", label: "Wealth & Stocks", desc: "Finance & CPM focus" },
                  { id: "luxury", label: "Luxury Lifestyle", desc: "Premium aesthetic" },
                  { id: "productivity", label: "Productivity/AI", desc: "Software affiliate focus" },
                  { id: "health", label: "Biohacking & Gym", desc: "Ebook / course monetization" },
                  { id: "travel", label: "Cinematic Travel", desc: "Hotel deals & sponsorships" },
                  { id: "mindset", label: "Philosophy & Motivation", desc: "Mass appeal audience" },
                ].map((niche) => (
                  <div
                    key={niche.id}
                    onClick={() => handleNicheQuiz(niche.id)}
                    className={`cursor-pointer border rounded-xl p-4 transition-all duration-200 ${
                      nicheAnswers.includes(niche.id)
                        ? "border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20"
                        : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                    }`}
                  >
                    <span className="block font-semibold text-sm">{niche.label}</span>
                    <span className="block text-[10px] text-zinc-400 mt-1">{niche.desc}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <Button onClick={calculateNiche} className="bg-emerald-600 hover:bg-emerald-500 text-white border-none font-semibold">
                  Calculate Suggestion
                </Button>
                
                {nicheRecommendation && (
                  <div className="mt-6 p-6 border border-emerald-500/20 bg-emerald-50/5 dark:bg-emerald-950/10 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <h4 className="font-extrabold text-base text-emerald-600 dark:text-emerald-400">
                        🎯 Recommended Niche: {nicheRecommendation.title}
                      </h4>
                      <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                        {nicheRecommendation.cpm}
                      </span>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 text-xs">
                      <div>
                        <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Sub-Niches to Target:</span>
                        <ul className="list-disc list-inside space-y-1 text-zinc-500">
                          {nicheRecommendation.subNiches.map((sub, i) => <li key={i}>{sub}</li>)}
                        </ul>
                      </div>

                      <div>
                        <span className="font-bold text-zinc-700 dark:text-zinc-300 block mb-1">Monetization Channels:</span>
                        <ul className="list-disc list-inside space-y-1 text-zinc-500">
                          {nicheRecommendation.monetization.map((mon, i) => <li key={i}>{mon}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className="text-xs border-t border-zinc-100 dark:border-zinc-800 pt-3 text-zinc-650 dark:text-zinc-400">
                      <span className="font-bold block mb-1 text-zinc-700 dark:text-zinc-300">Action Strategy:</span>
                      <p>{nicheRecommendation.strategy}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Interactive Launch Checklist */}
          <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-500" /> Interactive Launch Checklist
                </CardTitle>
                <CardDescription>Complete these 10 actions to set up and launch your faceless empire.</CardDescription>
              </div>
              {/* Progress indicator */}
              <div className="shrink-0 flex items-center gap-3 bg-zinc-50 dark:bg-zinc-800/50 px-4 py-2 rounded-xl border border-zinc-100 dark:border-zinc-850">
                <span className="text-xs font-bold text-zinc-500">Progress:</span>
                <span className="text-sm font-extrabold text-emerald-500">
                  {Object.values(checklist).filter(Boolean).length} / {CHECKLIST_ITEMS.length}
                </span>
                <div className="w-24 h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full transition-all duration-300"
                    style={{ width: `${(Object.values(checklist).filter(Boolean).length / CHECKLIST_ITEMS.length) * 100}%` }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 sm:grid-cols-2">
                {CHECKLIST_ITEMS.map((item) => {
                  const isCompleted = !!checklist[item.id];
                  return (
                    <div 
                      key={item.id}
                      onClick={() => toggleChecklist(item.id)}
                      className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                        isCompleted
                          ? "border-emerald-500/30 bg-emerald-50/10 dark:bg-emerald-950/5"
                          : "border-zinc-100 hover:border-zinc-200 dark:border-zinc-800 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900"
                      }`}
                    >
                      <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-sm border ${
                        isCompleted 
                          ? "border-emerald-500 bg-emerald-500 text-white" 
                          : "border-zinc-300 dark:border-zinc-700"
                      }`}>
                        {isCompleted && <Check className="h-3 w-3 stroke-[3]" />}
                      </div>
                      <div>
                        <span className={`text-xs font-semibold block ${isCompleted ? "line-through text-zinc-400" : "text-zinc-900 dark:text-zinc-100"}`}>
                          {item.label}
                        </span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* -------------------- 2. GROWTH SYSTEMS -------------------- */}
      {activeTab === "growth" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Phase 3: Scaling & Growth Systems</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Deploy our viral scheduling frameworks to build massive follower volume.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Algorithm guide */}
            <Card className="md:col-span-2 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-md font-bold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-500" /> Algorithm Signals (How IG Ranks Content)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center">
                    <span className="text-xs text-zinc-400">Priority 1</span>
                    <h5 className="font-extrabold text-lg mt-1 text-emerald-500">Watch Retention</h5>
                    <p className="text-[10px] text-zinc-400 mt-1">Re-watching reels pushes it directly to explore feed.</p>
                  </div>
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center">
                    <span className="text-xs text-zinc-400">Priority 2</span>
                    <h5 className="font-extrabold text-lg mt-1 text-emerald-500">Shares</h5>
                    <p className="text-[10px] text-zinc-400 mt-1">DMs or story shares double your distribution score.</p>
                  </div>
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 text-center">
                    <span className="text-xs text-zinc-400">Priority 3</span>
                    <h5 className="font-extrabold text-lg mt-1 text-emerald-500">Saves</h5>
                    <p className="text-[10px] text-zinc-400 mt-1">Indicates educational value for archiving.</p>
                  </div>
                </div>
                <div className="text-xs text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                  💡 **Viral Tip:** Never exceed 7 seconds for simple text-overlay reels. The shorter the reel, the easier it is to hit 100%+ watch retention.
                </div>
              </CardContent>
            </Card>

            {/* Success Cases */}
            <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-md font-bold">Growth Case Studies</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">niche: finance</span>
                  <h6 className="font-bold text-sm mt-0.5">@growthalpha — 52k in 3 weeks</h6>
                  <p className="text-[11px] text-zinc-400 mt-1">Used short AI luxury clips + controversial financial hooks.</p>
                </div>
                <div className="p-3 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg">
                  <span className="text-[10px] font-bold text-emerald-500 uppercase">niche: travel</span>
                  <h6 className="font-bold text-sm mt-0.5">@escapehorizon — 100k in 2 months</h6>
                  <p className="text-[11px] text-zinc-400 mt-1">Utilized capcut cinematic filters + trending audio drops.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar Template */}
          <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
            <CardHeader>
              <CardTitle className="text-md font-bold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-500" /> Posting Calendar & Blueprint (First 7 Days)
              </CardTitle>
              <CardDescription>Follow this daily calendar plan to prime your new account for maximum algorithm reach.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-4 md:grid-cols-7">
                {[
                  { day: "Day 1", title: "Controversy Hook", desc: "Post 1 controversial statement reel." },
                  { day: "Day 2", title: "Actionable List", desc: "3 secrets about your niche." },
                  { day: "Day 3", title: "Trending Audio", desc: "Sync to high-velocity audio drops." },
                  { day: "Day 4", title: "Mistake Hook", desc: "Highlight common beginner failures." },
                  { day: "Day 5", title: "Resource Share", desc: "Direct free template file offering." },
                  { day: "Day 6", title: "Mini Case Study", desc: "Show how someone else hit X result." },
                  { day: "Day 7", title: "Deep Save Reel", desc: "Save this reel to protect your progress." },
                ].map((item, idx) => (
                  <div key={idx} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 bg-white dark:bg-zinc-900 hover:border-emerald-500 transition-colors">
                    <span className="text-[10px] font-bold text-emerald-500">{item.day}</span>
                    <h6 className="font-bold text-xs mt-1">{item.title}</h6>
                    <p className="text-[10px] text-zinc-400 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* -------------------- 3. CONTENT VAULT (TIERED) -------------------- */}
      {activeTab === "vault" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">Content Vault</h1>
              <p className="text-zinc-500 dark:text-zinc-400">Download high-quality assets, clips, and designer layouts for your page.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-semibold">Filter:</span>
              <div className="flex rounded-lg bg-zinc-100 dark:bg-zinc-900 border p-1">
                <button onClick={() => setVaultFilter("all")} className={`px-3 py-1 text-xs rounded-md ${vaultFilter === "all" ? "bg-white dark:bg-zinc-800 font-semibold shadow" : ""}`}>All</button>
                <button onClick={() => setVaultFilter("standard")} className={`px-3 py-1 text-xs rounded-md ${vaultFilter === "standard" ? "bg-white dark:bg-zinc-800 font-semibold shadow" : ""}`}>Standard</button>
                <button onClick={() => setVaultFilter("pro")} className={`px-3 py-1 text-xs rounded-md ${vaultFilter === "pro" ? "bg-white dark:bg-zinc-800 font-semibold shadow" : ""}`}>Pro Only</button>
              </div>
            </div>
          </div>

          {loadingAssets ? (
            <div className="text-center py-12 text-zinc-500">Loading asset vault files...</div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {/* Default Mock Assets (if DB has no records yet) */}
              {[
                { title: "Viral Canva Template Pack", desc: "Editable bento and text templates optimized for IG slides.", category: "design", tier: "standard", size: "12MB" },
                { title: "Faceless Creator Asset B-Roll", desc: "4K aesthetic overhead office, luxury, and landscape footage.", category: "broll", tier: "standard", size: "480MB" },
                { title: "Peak Performance Reel Backgrounds", desc: "Dark minimal loop files for motivational texts.", category: "broll", tier: "standard", size: "115MB" },
                { title: "Advanced Sales Funnel Templates", desc: "Pro Canva packages to drive leads from bio link to checkout.", category: "design", tier: "pro", size: "45MB" },
                { title: "100+ Pro Aesthetic Clip Pack", desc: "Pro-tier premium lifestyle cinematic video clips.", category: "broll", tier: "pro", size: "2.1GB" },
                { title: "CapCut Sound FX Vault", desc: "High impact cinematic transition swishes and drops.", category: "audio", tier: "pro", size: "85MB" },
              ]
                .filter(item => vaultFilter === "all" || item.tier === vaultFilter)
                .map((item, idx) => {
                  const isLocked = item.tier === "pro" && !isPro;
                  return (
                    <div
                      key={idx}
                      className={`relative border rounded-xl overflow-hidden bg-white dark:bg-zinc-900 p-6 flex flex-col justify-between transition-all ${
                        isLocked 
                          ? "border-zinc-800 opacity-60 filter blur-[0.3px]" 
                          : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-800 dark:hover:border-zinc-700"
                      }`}
                    >
                      <div>
                        <div className="flex justify-between items-start">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            item.tier === "pro" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400" : "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                          }`}>
                            {item.tier}
                          </span>
                          <span className="text-[10px] text-zinc-400 font-medium">{item.size}</span>
                        </div>
                        <h4 className="font-extrabold text-md mt-4">{item.title}</h4>
                        <p className="text-xs text-zinc-400 mt-2">{item.desc}</p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                        {isLocked ? (
                          <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-none flex items-center justify-center gap-1.5 text-xs">
                            <Lock className="h-3.5 w-3.5" /> Unlock Pro Upgrade
                          </Button>
                        ) : (
                          <Button variant="outline" className="w-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 flex items-center justify-center gap-1.5 text-xs">
                            <Download className="h-3.5 w-3.5" /> Download Asset
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      )}

      {/* -------------------- 4. HOOK VAULT -------------------- */}
      {activeTab === "hooks" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Viral Hook Vault</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Search high-retention opening hooks with pre-written scripts.</p>
          </div>

          {/* Search bar & filter */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4.5 w-4.5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search viral hooks (e.g. 'tax', 'courses', 'secret')..."
                value={hookSearch}
                onChange={(e) => setHookSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-xl text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div className="flex rounded-lg bg-zinc-100 dark:bg-zinc-900 border p-1 shrink-0">
              <button onClick={() => setHookCategory("all")} className={`px-3 py-1 text-xs rounded-md ${hookCategory === "all" ? "bg-white dark:bg-zinc-800 font-semibold" : ""}`}>All</button>
              <button onClick={() => setHookCategory("provocative")} className={`px-3 py-1 text-xs rounded-md ${hookCategory === "provocative" ? "bg-white dark:bg-zinc-800 font-semibold" : ""}`}>Provocative</button>
              <button onClick={() => setHookCategory("negative")} className={`px-3 py-1 text-xs rounded-md ${hookCategory === "negative" ? "bg-white dark:bg-zinc-800 font-semibold" : ""}`}>Negative</button>
              <button onClick={() => setHookCategory("question")} className={`px-3 py-1 text-xs rounded-md ${hookCategory === "question" ? "bg-white dark:bg-zinc-800 font-semibold" : ""}`}>Question</button>
            </div>
          </div>

          {/* Hooks Table */}
          <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 text-xs font-bold text-zinc-400">
                    <tr>
                      <th className="px-6 py-4">Hook Formula</th>
                      <th className="px-6 py-4">Category</th>
                      <th className="px-6 py-4 text-center">Avg Retention</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {hooksData
                      .filter(hook => hookCategory === "all" || hook.category === hookCategory)
                      .filter(hook => hookSearch === "" || hook.text.toLowerCase().includes(hookSearch.toLowerCase()))
                      .map((hook, idx) => {
                        const isLocked = hook.tier === "pro" && !isPro;
                        return (
                          <tr key={idx} className={isLocked ? "opacity-40" : ""}>
                            <td className="px-6 py-4 font-semibold text-zinc-800 dark:text-zinc-200 max-w-sm truncate">
                              {hook.text}
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800">
                                {hook.category}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-center font-bold text-emerald-500">
                              {hook.retention}
                            </td>
                            <td className="px-6 py-4 text-right">
                              {isLocked ? (
                                <span className="text-[10px] text-zinc-400 font-semibold flex items-center justify-end gap-1"><Lock className="h-3 w-3" /> Pro</span>
                              ) : (
                                <button 
                                  onClick={() => handleCopyHook(hook.text, idx)}
                                  className="text-xs text-emerald-500 font-semibold hover:underline flex items-center gap-1.5 ml-auto"
                                >
                                  {copiedIndex === idx ? (
                                    <span className="text-emerald-500 flex items-center gap-1"><Check className="h-3 w-3" /> Copied</span>
                                  ) : (
                                    <span>Copy Script</span>
                                  )}
                                </button>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* -------------------- 5. MONETISATION -------------------- */}
      {activeTab === "monetization" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Phase 4: Monetisation Blueprint</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Launch digital stores and deploy sales scripts to monetize your page.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Store Setup */}
            <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-md font-bold">Setting Up Your Digital Store</CardTitle>
                <CardDescription>Step-by-step checklist to connect Beacons or Payhip.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Create a free account on Beacons.ai or Payhip.com.</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Choose a payment route (Stripe for cards, PayPal for global).</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Upload your first PDF guide (e.g. Canva Templates pack).</span>
                  </li>
                  <li className="flex gap-2">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>Link the store URL in your Instagram Bio.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Sales Scripts */}
            <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-md font-bold">DM Sales Script (High Converting)</CardTitle>
                <CardDescription>Copy-paste this script when people comment "INFO" or "REEL" on your video.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-zinc-50 dark:bg-zinc-800/30 text-xs font-mono space-y-2">
                  <p className="text-emerald-500">{"// Opening DM line"}</p>
                  <p>{"Hey [Name]! Appreciate the support on my recent reel about [niche]. I saw you commented looking for more information."}</p>
                  <p className="text-emerald-500">{"// Check problem"}</p>
                  <p>{"Are you currently running a faceless page, or are you just getting started from scratch?"}</p>
                  <p className="text-emerald-500">{"// Redirect to value link"}</p>
                  <p>{"I put together a step-by-step PDF pack that shows the exact AI prompt layouts. You can grab it here for free: [Link]"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* -------------------- 6. RESOURCES -------------------- */}
      {activeTab === "resources" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">General Resources & Tools</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Our recommended stack of software to automate faceless content production.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              { name: "Canva Pro", category: "Design", desc: "Design high contrast bento grids and slides.", url: "https://canva.com" },
              { name: "CapCut Pro", category: "Editing", desc: "Add trending sound FX and custom captions.", url: "https://capcut.com" },
              { name: "ElevenLabs", category: "Voiceovers", desc: "Generate ultra realistic professional voice overs.", url: "https://elevenlabs.io" },
              { name: "Opus Clip", category: "AI Shorts", desc: "Turn long youtube files into 10 viral reels.", url: "https://opus.pro" },
            ].map((tool, idx) => (
              <div key={idx} className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 bg-white dark:bg-zinc-900 flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-all">
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-500">{tool.category}</span>
                  <h4 className="font-extrabold text-md mt-2">{tool.name}</h4>
                  <p className="text-xs text-zinc-400 mt-2">{tool.desc}</p>
                </div>
                <a href={tool.url} target="_blank" rel="noreferrer" className="mt-6 flex items-center gap-1 text-xs text-emerald-500 font-semibold hover:underline">
                  Open Tool <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* -------------------- 7. DOWNLOADS -------------------- */}
      {activeTab === "downloads" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Downloads Section</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Grab direct file packs to download local assets and PDFs.</p>
          </div>

          <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/20 text-xs font-bold text-zinc-400">
                    <tr>
                      <th className="px-6 py-4">Filename</th>
                      <th className="px-6 py-4">Format</th>
                      <th className="px-6 py-4">Size</th>
                      <th className="px-6 py-4 text-right">Download</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                    {[
                      { name: "Canva_Reel_Layouts_V1.pdf", format: "PDF Document", size: "4.2MB", url: "/downloads/Canva_Reel_Layouts_V1.pdf" },
                      { name: "Aesthetic_Broll_Vault_Part1.zip", format: "Compressed Archive", size: "480MB", url: "/downloads/Aesthetic_Broll_Vault_Part1.zip" },
                      { name: "Sound_Effects_SWISHES.mp3", format: "Audio MP3", size: "1.8MB", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", isAudio: true },
                      { name: "Cinematic_Whoosh_FX.wav", format: "Audio WAV", size: "0.9MB", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", isAudio: true },
                    ].map((file, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 font-semibold text-zinc-800 dark:text-zinc-200">
                          {file.name}
                        </td>
                        <td className="px-6 py-4 text-xs text-zinc-400">
                          {file.format}
                        </td>
                        <td className="px-6 py-4 text-xs text-zinc-400">
                          {file.size}
                        </td>
                        <td className="px-6 py-4 text-right flex items-center justify-end gap-4">
                          {file.isAudio && (
                            <button 
                              onClick={() => togglePlayAudio(file.url)}
                              className="text-xs text-zinc-500 hover:text-zinc-950 dark:hover:text-zinc-50 flex items-center gap-1 font-semibold"
                            >
                              {playingUrl === file.url ? (
                                <>
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                                  Pause Preview
                                </>
                              ) : (
                                <>
                                  <Play className="h-3 w-3" />
                                  Play Preview
                                </>
                              )}
                            </button>
                          )}
                          <a 
                            href={file.url} 
                            download 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-xs text-emerald-500 font-semibold hover:underline flex items-center gap-1.5"
                          >
                            <Download className="h-3.5 w-3.5" /> Download
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* -------------------- 8. COMMUNITY HUB -------------------- */}
      {activeTab === "community" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Phase 5: Community Hub</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Connect with collab partners, share your page, and request Loom video audits.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Community Portals */}
            <Card className="md:col-span-2 border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-md font-bold">Community Redirect Portals</CardTitle>
                <CardDescription>Join our private chats to meet other creators and network.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col justify-between h-[150px]">
                    <div>
                      <h5 className="font-extrabold text-sm">Official Telegram Lounge</h5>
                      <p className="text-[11px] text-zinc-400 mt-1">Networking, introductions, general chat.</p>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-none mt-4 text-xs">
                      Join Telegram Portal
                    </Button>
                  </div>
                  <div className="border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 flex flex-col justify-between h-[150px]">
                    <div>
                      <h5 className="font-extrabold text-sm">Discord Creator Nest</h5>
                      <p className="text-[11px] text-zinc-400 mt-1">Page review requests, wins sharing.</p>
                    </div>
                    <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white border-none mt-4 text-xs">
                      Join Discord Server
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Loom Audit Form */}
            <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-md font-bold">Request Page Review (Loom)</CardTitle>
                <CardDescription>Submit your Instagram link. Ashwin will review it asynchronously.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase text-zinc-400">Instagram Handle</label>
                  <input type="text" placeholder="@yourhandle" className="w-full px-3 py-1.5 bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-xs rounded-lg focus:outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-bold uppercase text-zinc-400">Questions or Bottlenecks</label>
                  <textarea placeholder="Tell me what you are struggling with..." className="w-full px-3 py-1.5 bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 text-xs rounded-lg focus:outline-none h-18 resize-none" />
                </div>
                <Button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700 text-xs">Submit Request</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* -------------------- 9. AFFILIATE HUB (DROPBOX STYLE) -------------------- */}
      {activeTab === "affiliates" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Dropbox Referral & Affiliate Hub</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Earn 50% lifetime recurring commissions and unlock extra vault content by referring friends.</p>
          </div>

          {/* Gamified Milestone Progress Bar (Dropbox Style) */}
          <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden">
            <CardHeader className="bg-zinc-50/50 dark:bg-zinc-800/10 border-b border-zinc-200 dark:border-zinc-800">
              <CardTitle className="text-md font-bold flex items-center gap-2">
                <Gift className="h-5 w-5 text-emerald-500" /> Share Vyralify, Unlock Core Vault Rewards
              </CardTitle>
              <CardDescription>Just like Dropbox, both you and the friend you refer get rewarded. Track your milestones below:</CardDescription>
            </CardHeader>
            <CardContent className="py-8 px-6 space-y-8">
              {/* Progress Slider Track */}
              <div className="relative pt-6 pb-2">
                <div className="absolute top-0 bottom-0 left-0 right-0 m-auto h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full" />
                <div className="absolute top-0 bottom-0 left-0 m-auto h-1.5 w-[50%] bg-emerald-600 rounded-full" /> {/* Represent 2 referrals out of 4 steps */}

                {/* Milestone nodes */}
                <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-between items-center pointer-events-none">
                  {[
                    { count: 0, label: "Started" },
                    { count: 1, label: "Canva Pack", unlocked: true },
                    { count: 3, label: "CapCut Library", unlocked: false },
                    { count: 5, label: "Pro Sales Scripts", unlocked: false },
                  ].map((node, idx) => {
                    const active = referralsCount >= node.count;
                    return (
                      <div key={idx} className="flex flex-col items-center select-none">
                        <div className={`h-6 w-6 rounded-full border-4 flex items-center justify-center font-bold text-[9px] ${
                          active 
                            ? "bg-emerald-600 border-white dark:border-zinc-900 text-white shadow-lg shadow-emerald-500/20" 
                            : "bg-zinc-200 border-white dark:bg-zinc-800 dark:border-zinc-900 text-zinc-500"
                        }`}>
                          {node.count}
                        </div>
                        <span className={`text-[10px] font-semibold mt-2 ${active ? "text-emerald-500" : "text-zinc-400"}`}>
                          {node.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Share copy box */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex-1 bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-2.5 font-mono text-xs text-zinc-600 dark:text-zinc-300 select-all">
                  {referralLink}
                </div>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(referralLink);
                    alert("Referral link copied to clipboard!");
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white border-none shrink-0 font-semibold"
                >
                  Copy Invitation Link
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Commissions & Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-3">
            <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
              <CardContent className="pt-6">
                <span className="text-[10px] font-bold uppercase text-zinc-400">Total Referrals</span>
                <h4 className="text-3xl font-extrabold mt-2 text-zinc-900 dark:text-zinc-50">{referralsCount} Members</h4>
                <p className="text-xs text-zinc-400 mt-1">1 active pro / 1 standard</p>
              </CardContent>
            </Card>

            <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
              <CardContent className="pt-6">
                <span className="text-[10px] font-bold uppercase text-zinc-400">Unpaid Commissions</span>
                <h4 className="text-3xl font-extrabold mt-2 text-emerald-500">$74.00</h4>
                <p className="text-xs text-zinc-400 mt-1">Payout cycle executes: 1st of month</p>
              </CardContent>
            </Card>

            <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
              <CardContent className="pt-6">
                <span className="text-[10px] font-bold uppercase text-zinc-400">Total Paid Out</span>
                <h4 className="text-3xl font-extrabold mt-2 text-green-500">$148.00</h4>
                <p className="text-xs text-zinc-400 mt-1">Paid directly via PayPal/UPI transfer</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* -------------------- 10. PROFILE & SETTINGS -------------------- */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-extrabold tracking-tight">Account & Billing Settings</h1>
            <p className="text-zinc-500 dark:text-zinc-400">Manage your credentials, subscription tiers, and payment settings.</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Account Details */}
            <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-md font-bold">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-zinc-400">Email Address</span>
                  <span className="font-semibold">{profile?.email}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-zinc-400">Display Name</span>
                  <span className="font-semibold">{profile?.displayName || "Member"}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-zinc-400">User Identification</span>
                  <span className="font-mono text-xs text-zinc-400 truncate max-w-[150px]">{profile?.uid || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Affiliate Referral Code</span>
                  <span className="font-mono font-bold text-emerald-500">{profile?.affiliateCode}</span>
                </div>
              </CardContent>
            </Card>

            {/* Membership & Subscription details */}
            <Card className="border border-zinc-200 dark:border-zinc-800 dark:bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-md font-bold">Membership Plan Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-xl">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-500 uppercase">Active Tier</span>
                    <h5 className="font-extrabold text-lg uppercase mt-0.5">{profile?.tier || "Standard"}</h5>
                  </div>
                  <span className="text-xs font-semibold text-green-500 bg-green-50 dark:bg-green-950/20 px-3 py-1 rounded-full border border-green-500/20">Active</span>
                </div>
                <Button variant="outline" className="w-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800 font-semibold text-xs py-2.5">
                  Manage Subscription (Customer Portal)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
