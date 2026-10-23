import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  doc, 
  setDoc, 
  deleteDoc, 
  updateDoc 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from './AuthContext';

import { 
  generateCreatorGraphData, 
  enrichPageWithGraphData 
} from '../lib/instagramDataEngine';

const PageContext = createContext(null);

export function getSafeAvatarUrl(avatar, handle = 'Creator') {
  const cleanName = (handle || 'Creator').replace(/^@/, '').trim() || 'Creator';
  const defaultFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(cleanName)}&background=23E598&color=0A0A0A&bold=true&size=200`;
  
  if (!avatar || typeof avatar !== 'string') return defaultFallback;
  if (avatar.includes('photo-153452874') || avatar.includes('NaN')) return defaultFallback;
  return avatar;
}

// Empty initial pages: Real connected accounts only
const INITIAL_PAGES = [];

export function PageProvider({ children }) {
  const { user, tier } = useAuth();
  
  const [pages, setPages] = useState(() => {
    const saved = localStorage.getItem('vyralify_pages');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Exclude legacy mock accounts so user sees only their real connected accounts
        const realOnly = parsed.filter(p => 
          p &&
          p.id !== 'page_growth_mindset' && 
          p.id !== 'page_tech_hustle' && 
          p.handle !== 'growth.mindset' && 
          p.handle !== 'tech.hustle'
        );
        return realOnly.map(p => enrichPageWithGraphData({
          ...p,
          avatar: getSafeAvatarUrl(p.avatar, p.handle)
        }));
      } catch (e) {}
    }
    return INITIAL_PAGES;
  });

  const [activePageId, setActivePageId] = useState(() => {
    const savedId = localStorage.getItem('vyralify_active_page_id');
    if (savedId === 'page_growth_mindset' || savedId === 'page_tech_hustle') {
      localStorage.removeItem('vyralify_active_page_id');
      return null;
    }
    return savedId || null;
  });

  const activePage = pages.find(p => p.id === activePageId) || pages[0] || null;

  // Auto-sync activePageId if pages change or if activePageId points to a deleted page
  useEffect(() => {
    if (pages.length > 0) {
      if (!activePageId || !pages.some(p => p.id === activePageId)) {
        setActivePageId(pages[0].id);
      }
    } else if (activePageId !== null) {
      setActivePageId(null);
    }
  }, [pages, activePageId]);

  // Real-time Firestore sync when authenticated
  useEffect(() => {
    if (!user?.uid) return;

    try {
      const q = query(
        collection(db, 'instagramPages'),
        where('ownerUid', '==', user.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (!snapshot.empty) {
          const remotePages = [];
          snapshot.forEach((docSnap) => {
            const data = docSnap.data();
            const safeAvatar = getSafeAvatarUrl(data.avatar, data.handle);
            // If the avatar in firestore was broken, auto-update it in Firestore
            if (data.avatar && (data.avatar.includes('photo-153452874') || data.avatar.includes('NaN'))) {
              updateDoc(doc(db, 'instagramPages', docSnap.id), { avatar: safeAvatar }).catch(() => {});
            }
            remotePages.push({ id: docSnap.id, ...data, avatar: safeAvatar });
          });
          setPages(remotePages);
          if (!remotePages.some(p => p.id === activePageId) && remotePages.length > 0) {
            setActivePageId(remotePages[0].id);
          }
        }
      }, (err) => {
        console.warn('Firestore instagramPages listener fallback:', err.message);
      });

      return () => unsubscribe();
    } catch (err) {
      console.warn('Could not initialize Firestore listener:', err.message);
    }
  }, [user?.uid]);

  useEffect(() => {
    localStorage.setItem('vyralify_pages', JSON.stringify(pages));
  }, [pages]);

  useEffect(() => {
    if (activePageId) {
      localStorage.setItem('vyralify_active_page_id', activePageId);
    }
  }, [activePageId]);

  const switchPage = (pageId) => {
    if (pages.some(p => p.id === pageId)) {
      setActivePageId(pageId);
    }
  };

  const getPageLimit = () => {
    if (tier === 'free') return 5;
    if (tier === 'pro') return 15;
    return 9999; // Elite
  };

  const canAddMorePages = () => {
    return pages.length < getPageLimit();
  };

  const addPage = (newPageData, isInitialOnboarding = false) => {
    const limit = getPageLimit();
    if (!isInitialOnboarding && pages.length >= limit) {
      const upgradeMsg = tier === 'free'
        ? "You've hit your Free plan's 5-page limit. Upgrade to Pro to manage up to 15 accounts."
        : "You've hit your Pro plan's 15-page limit. Upgrade to Elite to manage unlimited accounts.";
      throw new Error(upgradeMsg);
    }

    const cleanHandle = (newPageData.handle || 'creator').replace('@', '').trim();
    const pageId = newPageData.id || ('page_' + Date.now());

    // Generate complete Meta Graph analytics suite if not already provided
    const graphData = (!newPageData.stockPoints || !newPageData.topReels || !newPageData.audience)
      ? generateCreatorGraphData(
          cleanHandle,
          newPageData.category || 'Business & Money',
          newPageData.followersCount || '0',
          newPageData
        )
      : {};

    const newPage = enrichPageWithGraphData({
      id: pageId,
      ownerUid: user?.uid || 'guest',
      handle: cleanHandle,
      displayName: newPageData.displayName || `@${cleanHandle}`,
      avatar: getSafeAvatarUrl(newPageData.avatar || graphData.avatar, cleanHandle),
      bio: newPageData.bio || graphData.bio || 'Instagram creator account.',
      category: newPageData.category || graphData.category || 'General',
      subNiche: newPageData.subNiche || graphData.subNiche || 'General',
      followersCount: newPageData.followersCount ?? graphData.followersCount ?? '0',
      followersNumeric: newPageData.followersNumeric ?? graphData.followersNumeric ?? 0,
      views7d: newPageData.views7d ?? graphData.views7d ?? '0',
      revenue30d: newPageData.revenue30d ?? graphData.revenue30d ?? '₹0',
      revenue30dNumeric: newPageData.revenue30dNumeric ?? graphData.revenue30dNumeric ?? 0,
      engagementRate: newPageData.engagementRate ?? graphData.engagementRate ?? '0.0%',
      isConnected: newPageData.isConnected ?? true,
      metaConnected: true,
      metaVerified: true,
      lastSynced: 'Just now',
      stockPoints: newPageData.stockPoints || graphData.stockPoints,
      topReels: newPageData.topReels || graphData.topReels || [],
      audience: newPageData.audience || graphData.audience,
      audit: newPageData.audit || graphData.audit || {
        overallScore: 82,
        strengths: ['Account successfully connected with Meta Graph dataset'],
        gaps: ['Set up automated comment DM triggers for link in bio'],
        nicheRank: `Top 15% in ${newPageData.category || 'General'}`
      }
    });

    if (isInitialOnboarding) {
      setPages([newPage]);
    } else {
      setPages(prev => [...prev.filter(p => p.id !== newPage.id), newPage]);
    }
    setActivePageId(newPage.id);
    localStorage.setItem('vyralify_active_page_id', newPage.id);

    // Sync to Firestore if authenticated
    if (user?.uid) {
      setDoc(doc(db, 'instagramPages', pageId), newPage, { merge: true })
        .catch(err => console.warn('Could not sync page to Firestore:', err.message));
    }

    return newPage;
  };

  const removePage = (pageId) => {
    setPages(prev => {
      const filtered = prev.filter(p => p.id !== pageId);
      if (activePageId === pageId) {
        const nextId = filtered.length > 0 ? filtered[0].id : null;
        setActivePageId(nextId);
        if (nextId) {
          localStorage.setItem('vyralify_active_page_id', nextId);
        } else {
          localStorage.removeItem('vyralify_active_page_id');
        }
      }
      return filtered;
    });

    if (user?.uid) {
      deleteDoc(doc(db, 'instagramPages', pageId))
        .catch(err => console.warn('Could not delete page from Firestore:', err.message));
    }
  };

  const updatePage = (pageId, updates) => {
    setPages(prev => prev.map(p => {
      if (p.id === pageId) {
        const merged = { ...p, ...updates };
        if (user?.uid) {
          updateDoc(doc(db, 'instagramPages', pageId), updates)
            .catch(err => console.warn('Could not update page in Firestore:', err.message));
        }
        return merged;
      }
      return p;
    }));
  };

  return (
    <PageContext.Provider value={{
      pages,
      activePage,
      activePageId,
      switchPage,
      addPage,
      removePage,
      updatePage,
      canAddMorePages,
      getPageLimit
    }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const context = useContext(PageContext);
  if (!context) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
}
