import React, { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';

const PlanGatingContext = createContext(null);

export const FEATURE_GATES = {
  INSTAGRAM_AUTOMATION: {
    key: 'instagram_automation',
    minTier: 'pro',
    title: 'Instagram Automation is a Pro Feature',
    description: 'Turn comments, story replies, and DMs into high-converting sales leads and customers automatically 24/7.',
    icon: 'Bot'
  },
  MULTI_PAGE: {
    key: 'multi_page',
    minTier: 'pro',
    title: 'Multi-Page Management',
    description: 'Manage up to 3 Instagram pages on Pro, or unlimited pages on Elite with individual analytics and content queues.',
    icon: 'Layers'
  },
  THIRTY_DAY_PLANNER: {
    key: '30_day_planner',
    minTier: 'pro',
    title: 'Full 30-Day Content Planner',
    description: 'Free tier includes a 7-day planner. Upgrade to Pro to auto-populate and schedule a full 30-day viral content calendar.',
    icon: 'Calendar'
  },
  UNLIMITED_PRODUCTS: {
    key: 'unlimited_products',
    minTier: 'pro',
    title: 'Unlimited Link-in-Bio Products',
    description: 'Free tier allows 1 active product or link. Upgrade to Pro to build a full creator storefront with unlimited offers.',
    icon: 'ShoppingBag'
  },
  COMPETITOR_SLOTS: {
    key: 'competitor_slots',
    minTier: 'pro',
    title: 'Advanced Competitor Tracking',
    description: 'Track up to 10 competitors on Pro (or unlimited on Elite) to reverse-engineer winning formats and viral hooks.',
    icon: 'Target'
  },
  WHITE_LABEL_AI: {
    key: 'white_label_ai',
    minTier: 'elite',
    title: 'White-Label AI Assistant Resale',
    description: 'Exclusive to Elite: Rebrand Vyralify AI as your own proprietary creator tool and sell access directly on your storefront.',
    icon: 'Sparkles'
  }
};

export function PlanGatingProvider({ children }) {
  const { tier } = useAuth();
  const [modalState, setModalState] = useState({
    isOpen: false,
    featureKey: null,
    title: '',
    description: '',
    targetTier: 'pro'
  });

  const canAccess = (featureGate) => {
    if (!featureGate) return true;
    const minTier = typeof featureGate === 'string' 
      ? (FEATURE_GATES[featureGate]?.minTier || 'pro')
      : featureGate.minTier;

    if (minTier === 'elite') {
      return tier === 'elite';
    }
    if (minTier === 'pro') {
      return tier === 'pro' || tier === 'elite';
    }
    return true;
  };

  const openUpgradeModal = (featureKeyOrConfig, customDescription = '') => {
    let gate = null;
    if (typeof featureKeyOrConfig === 'string') {
      gate = Object.values(FEATURE_GATES).find(g => g.key === featureKeyOrConfig) || {
        key: featureKeyOrConfig,
        minTier: 'pro',
        title: 'Upgrade Your Plan to Unlock',
        description: customDescription || 'Unlock higher limits, advanced AI models, and automated creator workflows.'
      };
    } else {
      gate = featureKeyOrConfig;
    }

    setModalState({
      isOpen: true,
      featureKey: gate.key,
      title: gate.title,
      description: customDescription || gate.description,
      targetTier: gate.minTier || 'pro'
    });
  };

  const closeUpgradeModal = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <PlanGatingContext.Provider value={{
      canAccess,
      openUpgradeModal,
      closeUpgradeModal,
      modalState
    }}>
      {children}
    </PlanGatingContext.Provider>
  );
}

export function usePlanGating() {
  const context = useContext(PlanGatingContext);
  if (!context) throw new Error("usePlanGating must be used within a PlanGatingProvider");
  return context;
}
