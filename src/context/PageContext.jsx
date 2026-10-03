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

const PageContext = createContext(null);

const INITIAL_PAGES = [
  {
    id: 'page_growth_mindset',
    handle: 'growth.mindset',
    displayName: 'Growth Mindset Hub',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80',
    bio: 'Daily mental models, stoicism & wealth frameworks. Turning discipline into leverage.',
    category: 'Self-Improvement',
    subNiche: 'Motivation & Mindset',
    followersCount: '48.2K',
    followersNumeric: 48200,
    views7d: '184.5K',
    revenue30d: '₹24,950',
    revenue30dNumeric: 24950,
    engagementRate: '4.8%',
    isConnected: true,
    lastSynced: '12m ago',
    audit: {
      overallScore: 84,
      strengths: ['High retention on 7-second text reels', 'Strong bio hook with clear outcome', 'Consistently active story schedule'],
      gaps: ['No automated DM keyword funnel active', 'Bio link needs a structured product catalog', 'Hashtags are too broad (low niche specificity)'],
      nicheRank: 'Top 12% in Self-Improvement'
    }
  },
  {
    id: 'page_tech_hustle',
    handle: 'tech.hustle',
    displayName: 'AI & SaaS Secrets',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
    bio: 'Breakdowns of modern software, AI workflows & internet money.',
    category: 'Business & Money',
    subNiche: 'AI Business & SaaS',
    followersCount: '12.4K',
    followersNumeric: 12400,
    views7d: '62.1K',
    revenue30d: '₹9,800',
    revenue30dNumeric: 9800,
    engagementRate: '5.2%',
    isConnected: true,
    lastSynced: '1h ago',
    audit: {
      overallScore: 78,
      strengths: ['Great visual hook editing', 'Clear product callouts in captions'],
      gaps: ['Low comment conversion rate', 'Infrequent carousel usage'],
      nicheRank: 'Top 24% in AI Business'
    }
  }
];

export function PageProvider({ children }) {
  const { user, tier } = useAuth();
  
  const [pages, setPages] = useState(() => {
    const saved = localStorage.getItem('vyralify_pages');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_PAGES;
  });

  const [activePageId, setActivePageId] = useState(() => {
    const savedId = localStorage.getItem('vyralify_active_page_id');
    return savedId || 'page_growth_mindset';
  });

  const activePage = pages.find(p => p.id === activePageId) || pages[0] || null;

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
            remotePages.push({ id: docSnap.id, ...docSnap.data() });
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
    if (tier === 'free') return 1;
    if (tier === 'pro') return 3;
    return 9999; // Elite
  };

  const canAddMorePages = () => {
    return pages.length < getPageLimit();
  };

  const addPage = (newPageData, isInitialOnboarding = false) => {
    const limit = getPageLimit();
    if (!isInitialOnboarding && pages.length >= limit) {
      const upgradeMsg = tier === 'free'
        ? "You've hit your Free plan's 1-page limit. Upgrade to Pro to manage up to 3 pages."
        : "You've hit your Pro plan's 3-page limit. Upgrade to Elite to manage unlimited pages.";
      throw new Error(upgradeMsg);
    }

    const cleanHandle = (newPageData.handle || 'creator').replace('@', '').trim();
    const pageId = newPageData.id || ('page_' + Date.now());

    const newPage = {
      id: pageId,
      ownerUid: user?.uid || 'guest',
      handle: cleanHandle,
      displayName: newPageData.displayName || `@${cleanHandle}`,
      avatar: newPageData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80',
      bio: newPageData.bio || 'New Instagram creator account.',
      category: newPageData.category || 'General',
      subNiche: newPageData.subNiche || 'General',
      followersCount: newPageData.followersCount || '0',
      followersNumeric: newPageData.followersNumeric || 0,
      views7d: newPageData.views7d || '0',
      revenue30d: newPageData.revenue30d || '₹0',
      revenue30dNumeric: newPageData.revenue30dNumeric || 0,
      engagementRate: newPageData.engagementRate || '0.0%',
      isConnected: newPageData.isConnected ?? true,
      lastSynced: 'Just now',
      audit: newPageData.audit || {
        overallScore: 78,
        strengths: ['Account successfully connected'],
        gaps: ['Run first content analysis to generate insights'],
        nicheRank: 'Analyzing...'
      }
    };

    if (isInitialOnboarding) {
      setPages(prev => [newPage, ...prev.filter(p => p.handle !== newPage.handle)]);
    } else {
      setPages(prev => [...prev, newPage]);
    }
    setActivePageId(newPage.id);

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
      if (activePageId === pageId && filtered.length > 0) {
        setActivePageId(filtered[0].id);
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
