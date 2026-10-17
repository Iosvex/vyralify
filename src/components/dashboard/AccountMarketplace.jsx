import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeftRight, 
  ShoppingBag, 
  Store, 
  ShieldCheck, 
  CheckCircle2, 
  DollarSign, 
  Search, 
  Filter, 
  Plus, 
  MessageSquare, 
  Send, 
  X, 
  ExternalLink, 
  Lock, 
  Tag, 
  TrendingUp, 
  Users, 
  Check, 
  AlertCircle, 
  Sparkles, 
  Clock, 
  ChevronRight, 
  UserCheck, 
  ArrowUpRight, 
  Eye,
  Trash2,
  Edit3,
  BadgeCheck,
  Building2,
  Mail,
  Zap,
  Globe,
  Share2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNotifications } from '../../context/NotificationContext';

function InstagramIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

// 8 Verified Launch Categories
const MARKETPLACE_NICHES = [
  'All Niches',
  'Business & Money',
  'Luxury & Lifestyle',
  'Self-Improvement',
  'Tech & AI',
  'Health & Fitness',
  'Fashion & Beauty',
  'Memes & Entertainment',
  'Travel & Nature'
];

// Seed Verified Accounts for Initial Marketplace Vibrancy
const SEED_LISTINGS = [
  {
    id: 'mkt_1',
    handle: 'wealth.horizons',
    displayName: 'Wealth Horizons',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    niche: 'Business & Money',
    followers: 135000,
    followersFormatted: '135K',
    engagementRate: '5.8%',
    monthlyRevenue: '₹48,000/mo',
    askingPrice: 120000,
    askingPriceFormatted: '₹1,20,000',
    ogEmailIncluded: true,
    accountAge: '2.5 Years',
    storyViews: '9.4K / 24h',
    demographics: 'USA 44%, UK 19%, India 14%',
    description: 'High-performing business quotes and financial education page. 100% organic growth via reels. Monetized with affiliate SaaS links and paid story promos. Zero copyright or community strikes.',
    sellerId: 'seller_seed_1',
    sellerUsername: 'empire_broker',
    sellerRating: 4.9,
    sellerSales: 16,
    verified: true,
    status: 'active',
    createdAt: '2026-10-10'
  },
  {
    id: 'mkt_2',
    handle: 'stoic.mentality',
    displayName: 'Stoic Mentality',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    niche: 'Self-Improvement',
    followers: 88500,
    followersFormatted: '88.5K',
    engagementRate: '7.2%',
    monthlyRevenue: '₹32,000/mo',
    askingPrice: 78000,
    askingPriceFormatted: '₹78,000',
    ogEmailIncluded: true,
    accountAge: '1.8 Years',
    storyViews: '7.8K / 24h',
    demographics: 'USA 38%, Canada 18%, UK 16%',
    description: 'Highly engaged stoic philosophy community. Viral format with 14 reels over 1M views. Clean history with original registration email provided upon escrow transfer.',
    sellerId: 'seller_seed_2',
    sellerUsername: 'stoic_studios',
    sellerRating: 5.0,
    sellerSales: 9,
    verified: true,
    status: 'active',
    createdAt: '2026-10-12'
  },
  {
    id: 'mkt_3',
    handle: 'ai.revolution.daily',
    displayName: 'AI Revolution Daily',
    avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
    niche: 'Tech & AI',
    followers: 54200,
    followersFormatted: '54.2K',
    engagementRate: '6.4%',
    monthlyRevenue: '₹25,000/mo',
    askingPrice: 52000,
    askingPriceFormatted: '₹52,000',
    ogEmailIncluded: true,
    accountAge: '1.2 Years',
    storyViews: '5.1K / 24h',
    demographics: 'USA 46%, Germany 15%, India 12%',
    description: 'Rapidly growing generative AI and tech tools showcase. Strong engagement from software founders and digital creators. Ready for sponsor shoutouts.',
    sellerId: 'seller_seed_3',
    sellerUsername: 'tech_venture',
    sellerRating: 4.8,
    sellerSales: 12,
    verified: true,
    status: 'active',
    createdAt: '2026-10-14'
  },
  {
    id: 'mkt_4',
    handle: 'luxury.chronicles',
    displayName: 'Luxury Chronicles',
    avatar: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=150&auto=format&fit=crop&q=80',
    niche: 'Luxury & Lifestyle',
    followers: 210000,
    followersFormatted: '210K',
    engagementRate: '4.9%',
    monthlyRevenue: '₹82,000/mo',
    askingPrice: 195000,
    askingPriceFormatted: '₹1,95,000',
    ogEmailIncluded: true,
    accountAge: '3.1 Years',
    storyViews: '16.5K / 24h',
    demographics: 'USA 48%, UAE 22%, UK 14%',
    description: 'Premium hypercar, luxury watch, and real estate theme page. Verified high-income audience. Includes full archive of 4K clips and brand deals list.',
    sellerId: 'seller_seed_4',
    sellerUsername: 'elite_pages',
    sellerRating: 5.0,
    sellerSales: 24,
    verified: true,
    status: 'active',
    createdAt: '2026-10-08'
  },
  {
    id: 'mkt_5',
    handle: 'iron.physique.hq',
    displayName: 'Iron Physique HQ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    niche: 'Health & Fitness',
    followers: 42000,
    followersFormatted: '42K',
    engagementRate: '8.1%',
    monthlyRevenue: '₹18,000/mo',
    askingPrice: 38000,
    askingPriceFormatted: '₹38,000',
    ogEmailIncluded: true,
    accountAge: '1.0 Year',
    storyViews: '4.8K / 24h',
    demographics: 'USA 35%, UK 20%, Australia 15%',
    description: 'Explosive workout routines, diet tips, and bodybuilding motivation. Outstanding comment section engagement. Ideal for workout gear and supplement affiliate marketing.',
    sellerId: 'seller_seed_5',
    sellerUsername: 'fitness_media',
    sellerRating: 4.9,
    sellerSales: 7,
    verified: true,
    status: 'active',
    createdAt: '2026-10-15'
  },
  {
    id: 'mkt_6',
    handle: 'aesthetic.escapes',
    displayName: 'Aesthetic Escapes',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    niche: 'Travel & Nature',
    followers: 76000,
    followersFormatted: '76K',
    engagementRate: '5.2%',
    monthlyRevenue: '₹22,000/mo',
    askingPrice: 65000,
    askingPriceFormatted: '₹65,000',
    ogEmailIncluded: true,
    accountAge: '2.0 Years',
    storyViews: '6.2K / 24h',
    demographics: 'Europe 42%, USA 36%, Asia 12%',
    description: 'Cinematic travel destinations, boutique hotels, and drone scenery. Active relationship with 4 boutique hotel chains for sponsored stays.',
    sellerId: 'seller_seed_6',
    sellerUsername: 'nomad_network',
    sellerRating: 4.8,
    sellerSales: 11,
    verified: true,
    status: 'active',
    createdAt: '2026-10-11'
  }
];

export default function AccountMarketplace({ onNavigate }) {
  const { user } = useAuth();
  const { addNotification } = useNotifications();

  // Root Mode Switcher: 'buyer' vs 'seller'
  const [activeZone, setActiveZone] = useState('buyer'); // 'buyer' | 'seller'

  // User's Profiles under this 1 Google Account
  const userId = user?.uid || 'usr_demo_founder';
  const userEmail = user?.email || 'ahmad@vyralify.in';
  const userDisplayName = user?.displayName || 'Ahmad Khan';

  const [sellerProfile, setSellerProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(`vyralify_seller_${userId}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      isRegistered: true, // Default enabled for instant frictionless testability
      username: `${userDisplayName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_seller`,
      displayName: userDisplayName,
      email: userEmail,
      payoutMethod: 'UPI / Bank Transfer',
      bio: 'Verified creator selling organic theme pages. Fast escrow transfer.',
      trustScore: 98,
      totalSales: 3,
      createdAt: new Date().toISOString()
    };
  });

  const [buyerProfile, setBuyerProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(`vyralify_buyer_${userId}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      isRegistered: true, // Default enabled for instant frictionless testability
      username: `${userDisplayName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_buyer`,
      displayName: userDisplayName,
      email: userEmail,
      budgetRange: '₹25,000 - ₹2,50,000',
      verifiedBuyer: true,
      savedIds: [],
      createdAt: new Date().toISOString()
    };
  });

  // Save profiles on change
  useEffect(() => {
    if (sellerProfile) {
      localStorage.setItem(`vyralify_seller_${userId}`, JSON.stringify(sellerProfile));
    }
  }, [sellerProfile, userId]);

  useEffect(() => {
    if (buyerProfile) {
      localStorage.setItem(`vyralify_buyer_${userId}`, JSON.stringify(buyerProfile));
    }
  }, [buyerProfile, userId]);

  // Marketplace Listings State
  const [listings, setListings] = useState(() => {
    try {
      const saved = localStorage.getItem('vyralify_marketplace_listings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return SEED_LISTINGS;
  });

  // Save listings on change
  useEffect(() => {
    localStorage.setItem('vyralify_marketplace_listings', JSON.stringify(listings));
  }, [listings]);

  // Buyer & Seller Inquiries / Messages
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('vyralify_marketplace_messages');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'msg_init_1',
        listingId: 'mkt_1',
        listingHandle: 'wealth.horizons',
        listingPrice: '₹1,20,000',
        senderId: 'buyer_demo',
        senderUsername: buyerProfile?.username || 'growth_investor',
        receiverId: 'seller_seed_1',
        receiverUsername: 'empire_broker',
        text: 'Hi! Is the original registration email included with this account?',
        offerAmount: null,
        timestamp: '10 mins ago',
        isFromMe: false
      },
      {
        id: 'msg_init_2',
        listingId: 'mkt_1',
        listingHandle: 'wealth.horizons',
        listingPrice: '₹1,20,000',
        senderId: 'seller_seed_1',
        senderUsername: 'empire_broker',
        receiverId: 'buyer_demo',
        receiverUsername: buyerProfile?.username || 'growth_investor',
        text: 'Yes, 100%! The first creation email is included. Safe Vyralify escrow transfer.',
        offerAmount: null,
        timestamp: '8 mins ago',
        isFromMe: true
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('vyralify_marketplace_messages', JSON.stringify(messages));
  }, [messages]);

  // Filter & Search State in Buyer Mode
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNiche, setSelectedNiche] = useState('All Niches');
  const [sortBy, setSortBy] = useState('followers_desc'); // 'followers_desc' | 'price_asc' | 'price_desc' | 'engagement_desc'
  const [ogEmailOnly, setOgEmailOnly] = useState(false);

  // Modals State
  const [isListAccountModalOpen, setIsListAccountModalOpen] = useState(false);
  const [selectedListingDetail, setSelectedListingDetail] = useState(null);
  const [activeChatListing, setActiveChatListing] = useState(null);
  const [chatInputText, setChatInputText] = useState('');
  const [counterOfferInput, setCounterOfferInput] = useState('');
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [profileEditType, setProfileEditType] = useState('seller'); // 'seller' | 'buyer'

  // New Listing Form State (Seller Zone)
  const [newHandle, setNewHandle] = useState('');
  const [newNiche, setNewNiche] = useState('Business & Money');
  const [newFollowers, setNewFollowers] = useState('');
  const [newEngagement, setNewEngagement] = useState('5.5%');
  const [newMonthlyRevenue, setNewMonthlyRevenue] = useState('₹20,000/mo');
  const [newAskingPrice, setNewAskingPrice] = useState('');
  const [newOgEmail, setNewOgEmail] = useState(true);
  const [newAge, setNewAge] = useState('1.5 Years');
  const [newStoryViews, setNewStoryViews] = useState('5K / 24h');
  const [newDemographics, setNewDemographics] = useState('USA 40%, UK 20%, India 15%');
  const [newDescription, setNewDescription] = useState('');
  const [listingError, setListingError] = useState('');

  // Filtered Listings for Buyer View
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      if (item.status === 'sold') return false;
      const matchesSearch = item.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.niche.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesNiche = selectedNiche === 'All Niches' || item.niche === selectedNiche;
      const matchesOgEmail = !ogEmailOnly || item.ogEmailIncluded;

      return matchesSearch && matchesNiche && matchesOgEmail;
    }).sort((a, b) => {
      if (sortBy === 'followers_desc') return b.followers - a.followers;
      if (sortBy === 'price_asc') return a.askingPrice - b.askingPrice;
      if (sortBy === 'price_desc') return b.askingPrice - a.askingPrice;
      if (sortBy === 'engagement_desc') return parseFloat(b.engagementRate) - parseFloat(a.engagementRate);
      return 0;
    });
  }, [listings, searchQuery, selectedNiche, sortBy, ogEmailOnly]);

  // Seller's own listings
  const mySellerListings = useMemo(() => {
    return listings.filter(item => item.sellerId === userId || item.sellerUsername === sellerProfile.username);
  }, [listings, userId, sellerProfile.username]);

  // Active chat thread for the opened listing
  const activeChatMessages = useMemo(() => {
    if (!activeChatListing) return [];
    return messages.filter(m => m.listingId === activeChatListing.id);
  }, [messages, activeChatListing]);

  // Handle Creating a New Listing
  const handleCreateListing = (e) => {
    e.preventDefault();
    setListingError('');

    if (!newHandle.trim()) {
      setListingError('Please enter the Instagram handle.');
      return;
    }
    const cleanHandle = newHandle.replace('@', '').trim().toLowerCase();
    const numericFollowers = parseInt(newFollowers.replace(/[^0-9]/g, '')) || 10000;
    const numericPrice = parseInt(newAskingPrice.replace(/[^0-9]/g, '')) || 25000;

    const formattedFollowers = numericFollowers >= 1000000 
      ? `${(numericFollowers / 1000000).toFixed(1)}M` 
      : numericFollowers >= 1000 
      ? `${(numericFollowers / 1000).toFixed(0)}K` 
      : `${numericFollowers}`;

    const formattedPrice = `₹${numericPrice.toLocaleString('en-IN')}`;

    const newListingItem = {
      id: `mkt_${Date.now()}`,
      handle: cleanHandle,
      displayName: cleanHandle.charAt(0).toUpperCase() + cleanHandle.slice(1).replace('.', ' '),
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80',
      niche: newNiche,
      followers: numericFollowers,
      followersFormatted: formattedFollowers,
      engagementRate: newEngagement.includes('%') ? newEngagement : `${newEngagement}%`,
      monthlyRevenue: newMonthlyRevenue || '₹0/mo',
      askingPrice: numericPrice,
      askingPriceFormatted: formattedPrice,
      ogEmailIncluded: newOgEmail,
      accountAge: newAge || '1.0 Year',
      storyViews: newStoryViews || '3K / 24h',
      demographics: newDemographics || 'USA 40%, UK 20%, India 15%',
      description: newDescription || `Organic Instagram theme page in ${newNiche}. Verified analytics and clean history.`,
      sellerId: userId,
      sellerUsername: sellerProfile.username,
      sellerRating: 5.0,
      sellerSales: sellerProfile.totalSales || 0,
      verified: true,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setListings(prev => [newListingItem, ...prev]);
    setIsListAccountModalOpen(false);

    // Reset form
    setNewHandle('');
    setNewFollowers('');
    setNewAskingPrice('');
    setNewDescription('');

    if (addNotification) {
      addNotification({
        title: 'Account Listed for Sale!',
        message: `@${cleanHandle} is now live in the Vyralify Marketplace for ${formattedPrice}.`,
        type: 'success'
      });
    }
  };

  // Handle Sending a Message / Offer to Seller
  const handleSendMessage = () => {
    if (!chatInputText.trim() && !counterOfferInput.trim()) return;

    const textToSend = chatInputText.trim() || `I would like to submit an offer of ₹${parseInt(counterOfferInput).toLocaleString('en-IN')}.`;
    
    const newMsg = {
      id: `msg_${Date.now()}`,
      listingId: activeChatListing.id,
      listingHandle: activeChatListing.handle,
      listingPrice: activeChatListing.askingPriceFormatted,
      senderId: userId,
      senderUsername: buyerProfile.username,
      receiverId: activeChatListing.sellerId,
      receiverUsername: activeChatListing.sellerUsername,
      text: textToSend,
      offerAmount: counterOfferInput ? `₹${parseInt(counterOfferInput).toLocaleString('en-IN')}` : null,
      timestamp: 'Just now',
      isFromMe: true
    };

    setMessages(prev => [...prev, newMsg]);
    setChatInputText('');
    setCounterOfferInput('');

    // Trigger realistic automated seller acknowledgement for demonstration if contacting external seed seller
    if (activeChatListing.sellerId !== userId) {
      setTimeout(() => {
        const autoReply = {
          id: `msg_reply_${Date.now()}`,
          listingId: activeChatListing.id,
          listingHandle: activeChatListing.handle,
          listingPrice: activeChatListing.askingPriceFormatted,
          senderId: activeChatListing.sellerId,
          senderUsername: activeChatListing.sellerUsername,
          receiverId: userId,
          receiverUsername: buyerProfile.username,
          text: `Thanks for your inquiry regarding @${activeChatListing.handle}! Yes, original email is guaranteed with the deal. Feel free to request video verification or initiate escrow when ready.`,
          offerAmount: null,
          timestamp: 'Just now',
          isFromMe: false
        };
        setMessages(p => [...p, autoReply]);
      }, 1200);
    }
  };

  // Quick Preset Message
  const handleQuickQuestion = (questionText) => {
    setChatInputText(questionText);
  };

  // Mark Listing as Sold
  const handleMarkAsSold = (id) => {
    setListings(prev => prev.map(item => item.id === id ? { ...item, status: 'sold' } : item));
  };

  // Delete Listing
  const handleDeleteListing = (id) => {
    setListings(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] dark:bg-[#08090C] text-neutral-900 dark:text-neutral-200 overflow-y-auto selection:bg-[#23E598]/30">
      
      {/* 1. TOP HEADER & ZONE SWITCHER */}
      <div className="p-5 sm:p-7 border-b border-neutral-200/80 dark:border-white/[0.06] bg-white/80 dark:bg-[#0C0D12]/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Headline & Breadcrumb */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-md bg-[#23E598]/15 text-emerald-800 dark:text-[#23E598] font-mono text-[10px] font-bold uppercase tracking-wider border border-[#23E598]/30">
                Official Creator Market
              </span>
              <span className="text-xs text-neutral-400 font-mono flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#23E598]" />
                Safe Escrow Guaranteed
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
              <span>Instagram Account Marketplace</span>
              <span className="w-2 h-2 rounded-full bg-[#23E598] animate-pulse" />
            </h1>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
              Buy and sell verified Instagram theme pages and established creator assets with verified analytics.
            </p>
          </div>

          {/* TWO SWITCHING OPTIONS: SELLER vs BUYER ZONE */}
          <div className="flex items-center gap-3">
            <div className="inline-flex p-1 rounded-2xl bg-neutral-100 dark:bg-white/[0.04] border border-neutral-200/80 dark:border-white/[0.08] shadow-inner">
              
              {/* Buyer Zone Tab */}
              <button
                onClick={() => setActiveZone('buyer')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                  activeZone === 'buyer'
                    ? 'bg-[#23E598] text-[#0A0A0A] shadow-md shadow-[#23E598]/20'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Buyer Zone</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold ${
                  activeZone === 'buyer' ? 'bg-[#0A0A0A]/15 text-[#0A0A0A]' : 'bg-neutral-200 dark:bg-white/10 text-neutral-400'
                }`}>
                  {filteredListings.length}
                </span>
              </button>

              {/* Seller Zone Tab */}
              <button
                onClick={() => setActiveZone('seller')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                  activeZone === 'seller'
                    ? 'bg-[#23E598] text-[#0A0A0A] shadow-md shadow-[#23E598]/20'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Seller Zone</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-semibold ${
                  activeZone === 'seller' ? 'bg-[#0A0A0A]/15 text-[#0A0A0A]' : 'bg-neutral-200 dark:bg-white/10 text-neutral-400'
                }`}>
                  {mySellerListings.length}
                </span>
              </button>

            </div>

            {/* Profile Pill Indicating 1-Account Linking */}
            <div 
              onClick={() => {
                setProfileEditType(activeZone);
                setIsEditProfileModalOpen(true);
              }}
              className="hidden lg:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200/80 dark:border-white/[0.06] text-xs cursor-pointer hover:border-[#23E598]/40 transition-colors"
              title="Click to view your linked 1-Google Identity Profile"
            >
              <div className="w-6 h-6 rounded-full bg-[#23E598]/20 border border-[#23E598]/30 flex items-center justify-center text-[#23E598] text-[11px] font-bold">
                {userDisplayName.charAt(0)}
              </div>
              <div className="text-left">
                <div className="text-[11px] font-semibold text-neutral-900 dark:text-white truncate max-w-[120px]">
                  {activeZone === 'seller' ? `@${sellerProfile.username}` : `@${buyerProfile.username}`}
                </div>
                <div className="text-[9px] font-mono text-[#23E598]">
                  {activeZone === 'seller' ? 'Seller Account' : 'Buyer Account'}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 2. BODY CONTENT: SELLER OR BUYER ZONE */}
      <div className="max-w-7xl mx-auto w-full p-5 sm:p-7 flex-1">

        {/* =================================================================== */}
        {/* ======================== SELLER ZONE ============================== */}
        {/* =================================================================== */}
        {activeZone === 'seller' && (
          <div className="space-y-6">
            
            {/* Seller Account Overview Banner (1 Google Account -> 1 Seller Profile) */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#23E598] text-[#0A0A0A] flex items-center justify-center shadow-lg shadow-[#23E598]/20 shrink-0">
                  <Store className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                      Seller Dashboard: @{sellerProfile.username}
                    </h2>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-[#23E598]/10 text-emerald-700 dark:text-[#23E598] text-[10px] font-mono font-bold uppercase border border-emerald-300 dark:border-[#23E598]/20">
                      Verified Seller
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Linked to Google Account: <strong className="text-neutral-800 dark:text-neutral-200">{userEmail}</strong> &bull; Payout: {sellerProfile.payoutMethod}
                  </p>
                  <p className="text-[11px] text-neutral-400 dark:text-neutral-500 mt-1 italic">
                    "{sellerProfile.bio}"
                  </p>
                </div>
              </div>

              {/* Primary Action Button: List New Account */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsListAccountModalOpen(true)}
                  className="px-5 py-3 rounded-xl bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] font-bold text-xs transition-all shadow-md hover:shadow-lg hover:shadow-[#23E598]/20 flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>List Instagram Account for Sale</span>
                </button>
              </div>
            </div>

            {/* Seller Key Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="p-4 rounded-xl bg-white dark:bg-[#0D0F14] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <div className="flex items-center justify-between text-neutral-500 text-xs font-mono mb-1">
                  <span>My Active Listings</span>
                  <InstagramIcon className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">
                  {mySellerListings.filter(l => l.status === 'active').length}
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 font-mono">
                  Live on public buyer marketplace
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#0D0F14] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <div className="flex items-center justify-between text-neutral-500 text-xs font-mono mb-1">
                  <span>Total Inventory Value</span>
                  <DollarSign className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-[#23E598]">
                  ₹{mySellerListings.reduce((acc, curr) => acc + curr.askingPrice, 0).toLocaleString('en-IN')}
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 font-mono">
                  Cumulative asking prices
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#0D0F14] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <div className="flex items-center justify-between text-neutral-500 text-xs font-mono mb-1">
                  <span>Buyer Inquiries</span>
                  <MessageSquare className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white">
                  {messages.length}
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 font-mono">
                  Messages &amp; counter-offers received
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#0D0F14] border border-neutral-200/80 dark:border-white/[0.06] shadow-xs">
                <div className="flex items-center justify-between text-neutral-500 text-xs font-mono mb-1">
                  <span>Seller Trust Rating</span>
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-bold font-mono text-neutral-900 dark:text-white flex items-center gap-1">
                  <span>98%</span>
                  <span className="text-xs text-emerald-600 font-normal">({sellerProfile.totalSales} deals)</span>
                </div>
                <div className="text-[10px] text-neutral-400 mt-1 font-mono">
                  OG Email Verified &bull; 0 disputes
                </div>
              </div>
            </div>

            {/* My Active Listings Section */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0D0F14] border border-neutral-200/80 dark:border-white/[0.06]">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-sm text-neutral-900 dark:text-white flex items-center gap-2">
                    <span>My Listed Accounts</span>
                    <span className="px-2 py-0.2 rounded-full bg-neutral-100 dark:bg-white/[0.06] text-neutral-500 text-[10px] font-mono">
                      {mySellerListings.length} total
                    </span>
                  </h3>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    Accounts you are currently selling. Edit prices, view buyer questions, or mark as sold.
                  </p>
                </div>

                <button
                  onClick={() => setIsListAccountModalOpen(true)}
                  className="px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-white/[0.05] hover:bg-neutral-200 dark:hover:bg-white/[0.1] text-neutral-800 dark:text-neutral-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-neutral-200 dark:border-white/[0.08]"
                >
                  <Plus className="w-3.5 h-3.5 text-[#23E598]" />
                  <span>Add Another Listing</span>
                </button>
              </div>

              {mySellerListings.length === 0 ? (
                <div className="p-12 text-center border-2 border-dashed border-neutral-200 dark:border-white/[0.08] rounded-xl space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 dark:bg-white/[0.04] text-neutral-400 flex items-center justify-center mx-auto">
                    <Store className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                    No Accounts Listed for Sale Yet
                  </h4>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    Have an Instagram page with followers? List it on Vyralify to receive offers from verified buyers worldwide.
                  </p>
                  <button
                    onClick={() => setIsListAccountModalOpen(true)}
                    className="px-4 py-2 rounded-xl bg-[#23E598] text-[#0A0A0A] font-bold text-xs hover:bg-[#1DCC84] transition-colors cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>List Your First Account</span>
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-neutral-200/80 dark:border-white/[0.06] text-neutral-400 font-mono text-[11px]">
                        <th className="pb-3 font-medium">ACCOUNT</th>
                        <th className="pb-3 font-medium">NICHE</th>
                        <th className="pb-3 font-medium">FOLLOWERS</th>
                        <th className="pb-3 font-medium">ENGAGEMENT</th>
                        <th className="pb-3 font-medium">MONTHLY REVENUE</th>
                        <th className="pb-3 font-medium">ASKING PRICE</th>
                        <th className="pb-3 font-medium">STATUS</th>
                        <th className="pb-3 font-medium text-right">ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200/60 dark:divide-white/[0.04]">
                      {mySellerListings.map((item) => (
                        <tr key={item.id} className="hover:bg-neutral-50/50 dark:hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5">
                            <div className="flex items-center gap-2.5">
                              <img src={item.avatar} alt={item.handle} className="w-8 h-8 rounded-full object-cover ring-1 ring-emerald-500/30" />
                              <div>
                                <div className="font-bold text-neutral-900 dark:text-white">@{item.handle}</div>
                                <div className="text-[10px] text-neutral-400 font-mono">{item.accountAge} old &bull; {item.ogEmailIncluded ? 'OG Email' : 'No OGE'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5">
                            <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/[0.05] text-neutral-700 dark:text-neutral-300 font-mono text-[10px]">
                              {item.niche}
                            </span>
                          </td>
                          <td className="py-3.5 font-mono font-semibold text-neutral-900 dark:text-white">
                            {item.followersFormatted}
                          </td>
                          <td className="py-3.5 font-mono text-emerald-600 dark:text-[#23E598]">
                            {item.engagementRate}
                          </td>
                          <td className="py-3.5 font-mono text-neutral-600 dark:text-neutral-300">
                            {item.monthlyRevenue}
                          </td>
                          <td className="py-3.5 font-mono font-bold text-neutral-900 dark:text-white text-sm">
                            {item.askingPriceFormatted}
                          </td>
                          <td className="py-3.5">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold ${
                              item.status === 'sold'
                                ? 'bg-neutral-200 dark:bg-white/10 text-neutral-500'
                                : 'bg-[#23E598]/15 text-emerald-800 dark:text-[#23E598] border border-[#23E598]/30'
                            }`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="py-3.5 text-right space-x-1.5">
                            <button
                              onClick={() => {
                                setSelectedListingDetail(item);
                              }}
                              className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-neutral-400 hover:text-white cursor-pointer"
                              title="View Public Card"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setActiveChatListing(item);
                              }}
                              className="p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-white/[0.06] text-neutral-400 hover:text-[#23E598] cursor-pointer"
                              title="Open Buyer Inquiries"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                            {item.status !== 'sold' && (
                              <button
                                onClick={() => handleMarkAsSold(item.id)}
                                className="px-2 py-1 rounded bg-neutral-100 dark:bg-white/[0.05] hover:bg-emerald-500/20 text-[10px] font-mono text-emerald-600 dark:text-[#23E598] cursor-pointer"
                                title="Mark Account as Sold"
                              >
                                Mark Sold
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteListing(item.id)}
                              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 text-neutral-400 hover:text-red-400 cursor-pointer"
                              title="Delete Listing"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Seller Security & Escrow Explainer */}
            <div className="p-4 rounded-xl bg-neutral-100/60 dark:bg-white/[0.02] border border-neutral-200 dark:border-white/[0.06] text-xs text-neutral-500 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#23E598] shrink-0 mt-0.5" />
              <div>
                <strong className="text-neutral-800 dark:text-neutral-200">How Vyralify Escrow Protects Sellers:</strong>
                <p className="mt-0.5 leading-relaxed">
                  When a buyer accepts your asking price, their payment is safely locked in Vyralify Escrow. You only transfer credentials after the deposit is verified. Funds are instantly released to your bank/UPI as soon as transfer is confirmed.
                </p>
              </div>
            </div>

          </div>
        )}


        {/* =================================================================== */}
        {/* ========================= BUYER ZONE ============================== */}
        {/* =================================================================== */}
        {activeZone === 'buyer' && (
          <div className="space-y-6">

            {/* Buyer Welcome Ribbon & Quick Stats */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-white">
                    Buyer Marketplace: Find Verified Instagram Accounts
                  </h2>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-[#23E598]/10 text-emerald-700 dark:text-[#23E598] text-[10px] font-mono font-bold uppercase border border-emerald-300 dark:border-[#23E598]/20">
                    Active Buyer: @{buyerProfile.username}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Skip the 0 to 10k grind. Acquire pre-monetized accounts with established engagement, clean history, and original email transfer.
                </p>
              </div>

              {/* Inquiries Shortcut */}
              <button
                onClick={() => {
                  if (activeChatListing || messages.length > 0) {
                    const firstListing = listings.find(l => l.id === messages[0]?.listingId) || listings[0];
                    setActiveChatListing(firstListing);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-white dark:bg-white/[0.05] hover:bg-neutral-100 dark:hover:bg-white/[0.09] text-neutral-800 dark:text-neutral-200 border border-neutral-200/80 dark:border-white/[0.08] text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shrink-0 shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#23E598]" />
                <span>My Active Inquiries ({messages.length})</span>
              </button>
            </div>

            {/* Search & Filters Control Bar */}
            <div className="p-4 rounded-2xl bg-white dark:bg-[#0D0F14] border border-neutral-200/80 dark:border-white/[0.06] space-y-3.5 shadow-xs">
              
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Search Input */}
                <div className="relative flex-1 w-full">
                  <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search accounts by handle, niche, or keywords (e.g. 'luxury', '100k', 'finance')..."
                    className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-[#23E598] transition-colors"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-2.5 text-neutral-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-hidden focus:border-[#23E598] cursor-pointer"
                  >
                    <option value="followers_desc">Highest Followers</option>
                    <option value="price_asc">Lowest Price</option>
                    <option value="price_desc">Highest Price</option>
                    <option value="engagement_desc">Highest Engagement</option>
                  </select>

                  {/* OG Email Filter Toggle */}
                  <button
                    onClick={() => setOgEmailOnly(!ogEmailOnly)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border shrink-0 ${
                      ogEmailOnly 
                        ? 'bg-[#23E598]/15 border-[#23E598] text-[#23E598]' 
                        : 'bg-neutral-50 dark:bg-white/[0.03] border-neutral-200 dark:border-white/[0.08] text-neutral-600 dark:text-neutral-400 hover:text-white'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>OG Email Only</span>
                  </button>
                </div>
              </div>

              {/* Niche Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                {MARKETPLACE_NICHES.map((niche) => {
                  const isSelected = selectedNiche === niche;
                  return (
                    <button
                      key={niche}
                      onClick={() => setSelectedNiche(niche)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                        isSelected
                          ? 'bg-[#23E598] text-[#0A0A0A] font-bold shadow-xs'
                          : 'bg-neutral-100 dark:bg-white/[0.03] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-white/[0.06]'
                      }`}
                    >
                      {niche}
                    </button>
                  );
                })}
              </div>

            </div>

            {/* Results Count Summary */}
            <div className="flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>Showing {filteredListings.length} verified account{filteredListings.length === 1 ? '' : 's'} available</span>
              <span>All transfers covered by Vyralify Safe Escrow Guarantee</span>
            </div>

            {/* Accounts Grid */}
            {filteredListings.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-white dark:bg-[#0D0F14] border border-neutral-200 dark:border-white/[0.06] space-y-3">
                <Search className="w-8 h-8 text-neutral-400 mx-auto" />
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  No accounts found matching your filters
                </h4>
                <p className="text-xs text-neutral-500">
                  Try clearing your search query or selecting a different niche category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedNiche('All Niches');
                    setOgEmailOnly(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#23E598] text-[#0A0A0A] font-bold text-xs cursor-pointer"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredListings.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-2xl bg-white dark:bg-[#0D0F14] border border-neutral-200/80 dark:border-white/[0.08] hover:border-[#23E598]/50 p-5 shadow-xs hover:shadow-lg hover:shadow-[#23E598]/5 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      {/* Card Top: Handle & Verification Badges */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.avatar} 
                            alt={item.handle} 
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500/20 group-hover:ring-[#23E598] transition-all"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 font-bold text-sm text-neutral-900 dark:text-white">
                              <span>@{item.handle}</span>
                              <BadgeCheck className="w-4 h-4 text-[#23E598]" />
                            </div>
                            <span className="px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-white/[0.05] text-neutral-600 dark:text-neutral-400 font-mono text-[10px] mt-0.5 inline-block">
                              {item.niche}
                            </span>
                          </div>
                        </div>

                        {/* OG Email Chip */}
                        {item.ogEmailIncluded && (
                          <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-[#23E598] text-[10px] font-mono font-bold flex items-center gap-1 border border-emerald-200 dark:border-emerald-500/20 shrink-0">
                            <ShieldCheck className="w-3 h-3" />
                            <span>OG Email</span>
                          </span>
                        )}
                      </div>

                      {/* Description Snippet */}
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* 3 Metric Pills */}
                      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04] mb-4 text-center">
                        <div>
                          <div className="text-[10px] font-mono text-neutral-400">Followers</div>
                          <div className="text-xs font-bold font-mono text-neutral-900 dark:text-white">{item.followersFormatted}</div>
                        </div>
                        <div className="border-x border-neutral-200/60 dark:border-white/[0.04]">
                          <div className="text-[10px] font-mono text-neutral-400">Eng. Rate</div>
                          <div className="text-xs font-bold font-mono text-[#23E598]">{item.engagementRate}</div>
                        </div>
                        <div>
                          <div className="text-[10px] font-mono text-neutral-400">Monthly Rev</div>
                          <div className="text-xs font-bold font-mono text-neutral-900 dark:text-white">{item.monthlyRevenue}</div>
                        </div>
                      </div>

                      {/* Seller Reputation Row */}
                      <div className="flex items-center justify-between text-[11px] font-mono text-neutral-400 mb-4 pb-3 border-b border-neutral-200/60 dark:border-white/[0.04]">
                        <span className="flex items-center gap-1">
                          Seller: <strong className="text-neutral-700 dark:text-neutral-200">@{item.sellerUsername}</strong>
                        </span>
                        <span className="text-[#23E598]">
                          ★ {item.sellerRating} ({item.sellerSales} deals)
                        </span>
                      </div>
                    </div>

                    {/* Bottom: Price & CTAs */}
                    <div>
                      <div className="flex items-baseline justify-between mb-3">
                        <span className="text-xs font-mono text-neutral-400">Asking Price:</span>
                        <span className="text-lg font-bold font-mono text-neutral-900 dark:text-white text-[#23E598]">
                          {item.askingPriceFormatted}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {/* View Stats Details */}
                        <button
                          onClick={() => setSelectedListingDetail(item)}
                          className="py-2 px-3 rounded-xl bg-neutral-100 dark:bg-white/[0.05] hover:bg-neutral-200 dark:hover:bg-white/[0.09] text-neutral-800 dark:text-neutral-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-neutral-200 dark:border-white/[0.08]"
                        >
                          <Eye className="w-3.5 h-3.5 text-neutral-400" />
                          <span>View Stats</span>
                        </button>

                        {/* Message Seller */}
                        <button
                          onClick={() => setActiveChatListing(item)}
                          className="py-2 px-3 rounded-xl bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Message Seller</span>
                        </button>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </div>
            )}

          </div>
        )}

      </div>


      {/* =================================================================== */}
      {/* ============ MODAL 1: LIST ACCOUNT FOR SALE (SELLER) ============== */}
      {/* =================================================================== */}
      <AnimatePresence>
        {isListAccountModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsListAccountModalOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0D0F14] border border-neutral-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-2xl text-neutral-900 dark:text-white z-10 my-auto max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsListAccountModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2.5 mb-1">
                <div className="w-8 h-8 rounded-xl bg-[#23E598]/15 border border-[#23E598]/30 flex items-center justify-center text-[#23E598]">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                    List Instagram Account for Sale
                  </h3>
                  <p className="text-xs text-neutral-400">
                    Publish your page to verified buyers across the Vyralify marketplace.
                  </p>
                </div>
              </div>

              {listingError && (
                <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs flex items-center gap-2 my-3">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{listingError}</span>
                </div>
              )}

              <form onSubmit={handleCreateListing} className="space-y-3.5 mt-4">
                
                {/* Instagram Handle & Niche */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-1 font-medium">Instagram Handle</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-neutral-400 font-mono text-xs">@</span>
                      <input
                        type="text"
                        required
                        value={newHandle}
                        onChange={(e) => setNewHandle(e.target.value)}
                        placeholder="yourpage.hq"
                        className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl pl-7 pr-3 py-2 text-xs font-mono focus:outline-hidden focus:border-[#23E598] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-1 font-medium">Category / Niche</label>
                    <select
                      value={newNiche}
                      onChange={(e) => setNewNiche(e.target.value)}
                      className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs focus:outline-hidden focus:border-[#23E598] cursor-pointer"
                    >
                      {MARKETPLACE_NICHES.filter(n => n !== 'All Niches').map(n => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Followers & Asking Price */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-1 font-medium">Follower Count</label>
                    <input
                      type="text"
                      required
                      value={newFollowers}
                      onChange={(e) => setNewFollowers(e.target.value)}
                      placeholder="e.g. 85000"
                      className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono focus:outline-hidden focus:border-[#23E598] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-1 font-medium">Asking Price (₹ INR)</label>
                    <input
                      type="text"
                      required
                      value={newAskingPrice}
                      onChange={(e) => setNewAskingPrice(e.target.value)}
                      placeholder="e.g. 75000"
                      className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono text-[#23E598] font-bold focus:outline-hidden focus:border-[#23E598] transition-colors"
                    />
                  </div>
                </div>

                {/* Engagement & Monthly Revenue */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-1 font-medium">Engagement Rate (%)</label>
                    <input
                      type="text"
                      value={newEngagement}
                      onChange={(e) => setNewEngagement(e.target.value)}
                      placeholder="e.g. 6.2%"
                      className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono focus:outline-hidden focus:border-[#23E598] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-1 font-medium">Monthly Revenue</label>
                    <input
                      type="text"
                      value={newMonthlyRevenue}
                      onChange={(e) => setNewMonthlyRevenue(e.target.value)}
                      placeholder="e.g. ₹30,000/mo"
                      className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono focus:outline-hidden focus:border-[#23E598] transition-colors"
                    />
                  </div>
                </div>

                {/* OG Email & Story Views */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-1 font-medium">Original Email (OGE)</label>
                    <div className="flex items-center gap-3 pt-1">
                      <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                        <input
                          type="radio"
                          name="ogEmail"
                          checked={newOgEmail === true}
                          onChange={() => setNewOgEmail(true)}
                          className="text-[#23E598] focus:ring-0"
                        />
                        <span className="text-[#23E598] font-semibold">Yes (Included)</span>
                      </label>
                      <label className="flex items-center gap-1.5 text-xs cursor-pointer">
                        <input
                          type="radio"
                          name="ogEmail"
                          checked={newOgEmail === false}
                          onChange={() => setNewOgEmail(false)}
                          className="text-neutral-500 focus:ring-0"
                        />
                        <span className="text-neutral-400">No (Changed)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-1 font-medium">Story Views (Avg 24h)</label>
                    <input
                      type="text"
                      value={newStoryViews}
                      onChange={(e) => setNewStoryViews(e.target.value)}
                      placeholder="e.g. 8.5K / 24h"
                      className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono focus:outline-hidden focus:border-[#23E598] transition-colors"
                    />
                  </div>
                </div>

                {/* Audience Demographics */}
                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-1 font-medium">Top Audience Countries</label>
                  <input
                    type="text"
                    value={newDemographics}
                    onChange={(e) => setNewDemographics(e.target.value)}
                    placeholder="e.g. USA 45%, UK 20%, India 15%"
                    className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3 py-2 text-xs font-mono focus:outline-hidden focus:border-[#23E598] transition-colors"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-1 font-medium">Description &amp; Highlights</label>
                  <textarea
                    rows={3}
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Describe how the account was grown, monetization methods, content template drive included, and why you are selling..."
                    className="w-full bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl p-3 text-xs focus:outline-hidden focus:border-[#23E598] transition-colors"
                  />
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md mt-4"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Listing to Marketplace</span>
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* =================================================================== */}
      {/* ============ MODAL 2: ACCOUNT DETAIL SHEET (BUYER) =============== */}
      {/* =================================================================== */}
      <AnimatePresence>
        {selectedListingDetail && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedListingDetail(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              className="relative w-full max-w-xl bg-white dark:bg-[#0D0F14] border border-neutral-200 dark:border-white/[0.08] rounded-2xl p-6 sm:p-7 shadow-2xl text-neutral-900 dark:text-white z-10 my-auto max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedListingDetail(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Profile Header */}
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-neutral-200/80 dark:border-white/[0.06]">
                <img 
                  src={selectedListingDetail.avatar} 
                  alt={selectedListingDetail.handle} 
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-[#23E598]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
                      @{selectedListingDetail.handle}
                    </h3>
                    <BadgeCheck className="w-5 h-5 text-[#23E598]" />
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-xs">
                    <span className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-white/[0.05] text-neutral-700 dark:text-neutral-300 font-mono">
                      {selectedListingDetail.niche}
                    </span>
                    <span className="text-neutral-400">&bull;</span>
                    <span className="font-mono text-neutral-400">Age: {selectedListingDetail.accountAge}</span>
                  </div>
                </div>
              </div>

              {/* Verified Metrics Breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04] text-center">
                  <div className="text-[10px] font-mono text-neutral-400">Followers</div>
                  <div className="text-base font-bold font-mono text-neutral-900 dark:text-white">{selectedListingDetail.followersFormatted}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04] text-center">
                  <div className="text-[10px] font-mono text-neutral-400">Engagement</div>
                  <div className="text-base font-bold font-mono text-[#23E598]">{selectedListingDetail.engagementRate}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04] text-center">
                  <div className="text-[10px] font-mono text-neutral-400">Story Views</div>
                  <div className="text-base font-bold font-mono text-neutral-900 dark:text-white">{selectedListingDetail.storyViews}</div>
                </div>
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04] text-center">
                  <div className="text-[10px] font-mono text-neutral-400">Est. Profit</div>
                  <div className="text-base font-bold font-mono text-[#23E598]">{selectedListingDetail.monthlyRevenue}</div>
                </div>
              </div>

              {/* Audience & Security Audit Details */}
              <div className="space-y-3 mb-6 text-xs">
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04]">
                  <div className="text-neutral-400 font-mono text-[10px] uppercase font-semibold mb-1">
                    Audience Demographics
                  </div>
                  <div className="text-neutral-800 dark:text-neutral-200 font-mono">
                    {selectedListingDetail.demographics}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04]">
                  <div className="text-neutral-400 font-mono text-[10px] uppercase font-semibold mb-1">
                    Account Overview &amp; Assets Included
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                    {selectedListingDetail.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-neutral-200/60 dark:border-white/[0.04]">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[#23E598] font-mono text-[10px] flex items-center gap-1">
                      <Check className="w-3 h-3" /> {selectedListingDetail.ogEmailIncluded ? 'Original Creation Email Included' : 'Clean Transfer'}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[#23E598] font-mono text-[10px] flex items-center gap-1">
                      <Check className="w-3 h-3" /> 0 Community Strikes
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-[#23E598] font-mono text-[10px] flex items-center gap-1">
                      <Check className="w-3 h-3" /> Canva Graphic Pack
                    </span>
                  </div>
                </div>

                {/* Seller Trust Bar */}
                <div className="p-3 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-[#23E598]" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      Seller: <strong>@{selectedListingDetail.sellerUsername}</strong> (Rating: ★ {selectedListingDetail.sellerRating})
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">Response &lt; 1 hr</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200/80 dark:border-white/[0.06]">
                <div>
                  <div className="text-[10px] font-mono text-neutral-400">Asking Price</div>
                  <div className="text-2xl font-bold font-mono text-[#23E598]">
                    {selectedListingDetail.askingPriceFormatted}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const target = selectedListingDetail;
                      setSelectedListingDetail(null);
                      setActiveChatListing(target);
                    }}
                    className="py-2.5 px-5 rounded-xl bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Message Seller / Make Offer</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* =================================================================== */}
      {/* ============ MODAL 3: BUYER-SELLER MESSAGING / CHAT =============== */}
      {/* =================================================================== */}
      <AnimatePresence>
        {activeChatListing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveChatListing(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, y: 8 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0D0F14] border border-neutral-200 dark:border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-2xl text-neutral-900 dark:text-white z-10 my-auto flex flex-col h-[600px] max-h-[90vh]"
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200/80 dark:border-white/[0.06] shrink-0">
                <div className="flex items-center gap-3">
                  <img 
                    src={activeChatListing.avatar} 
                    alt={activeChatListing.handle} 
                    className="w-10 h-10 rounded-full object-cover ring-1 ring-[#23E598]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-sm">
                      <span>@{activeChatListing.handle}</span>
                      <span className="text-[10px] font-mono text-[#23E598] font-normal">
                        ({activeChatListing.askingPriceFormatted})
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 font-mono">
                      Seller: @{activeChatListing.sellerUsername} &bull; Safe Escrow Protected
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setActiveChatListing(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-100 dark:hover:bg-white/[0.06] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                
                {/* Intro Notice */}
                <div className="p-2.5 rounded-xl bg-neutral-50 dark:bg-white/[0.02] border border-neutral-200/60 dark:border-white/[0.04] text-center text-[11px] text-neutral-400 font-mono">
                  🔒 Messages are encrypted &amp; verified. Never send payments outside the Vyralify Escrow system.
                </div>

                {activeChatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${msg.isFromMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5 text-[10px] font-mono text-neutral-400">
                      <span>@{msg.senderUsername}</span>
                      <span>&bull;</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs ${
                        msg.isFromMe
                          ? 'bg-[#23E598] text-[#0A0A0A] font-medium rounded-tr-xs shadow-xs'
                          : 'bg-neutral-100 dark:bg-white/[0.06] text-neutral-800 dark:text-neutral-200 rounded-tl-xs border border-neutral-200 dark:border-white/[0.06]'
                      }`}
                    >
                      {msg.offerAmount && (
                        <div className="mb-1.5 pb-1 border-b border-black/10 dark:border-white/10 font-mono font-bold text-xs">
                          💰 Formal Counter-Offer: {msg.offerAmount}
                        </div>
                      )}
                      <p className="leading-relaxed">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Prompt Presets */}
              <div className="pt-2 pb-2 flex items-center gap-1.5 overflow-x-auto text-[11px] shrink-0 border-t border-neutral-200/60 dark:border-white/[0.04]">
                <button
                  type="button"
                  onClick={() => handleQuickQuestion('Is the original email (OGE) included with the transfer?')}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] text-neutral-600 dark:text-neutral-300 whitespace-nowrap cursor-pointer transition-colors"
                >
                  OG Email included?
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickQuestion('Can you share 30-day analytics screenshot?')}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] text-neutral-600 dark:text-neutral-300 whitespace-nowrap cursor-pointer transition-colors"
                >
                  30-day analytics proof?
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickQuestion('Would you consider an instant escrow deal today?')}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-white/[0.04] hover:bg-neutral-200 dark:hover:bg-white/[0.08] text-neutral-600 dark:text-neutral-300 whitespace-nowrap cursor-pointer transition-colors"
                >
                  Ready for instant escrow?
                </button>
              </div>

              {/* Make Offer Strip (Optional) */}
              <div className="flex items-center gap-2 mb-2 pt-1 shrink-0">
                <span className="text-[11px] font-mono text-neutral-400 whitespace-nowrap">Make Counter-Offer (₹):</span>
                <input
                  type="number"
                  value={counterOfferInput}
                  onChange={(e) => setCounterOfferInput(e.target.value)}
                  placeholder={`Asking: ${activeChatListing.askingPriceFormatted}`}
                  className="w-32 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-lg px-2.5 py-1 text-xs font-mono text-[#23E598] focus:outline-hidden focus:border-[#23E598]"
                />
              </div>

              {/* Input Bar */}
              <div className="flex items-center gap-2 pt-2 border-t border-neutral-200/80 dark:border-white/[0.06] shrink-0">
                <input
                  type="text"
                  value={chatInputText}
                  onChange={(e) => setChatInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder="Type your message to the seller..."
                  className="flex-1 bg-neutral-50 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-hidden focus:border-[#23E598] transition-colors"
                />
                <button
                  type="button"
                  onClick={handleSendMessage}
                  disabled={!chatInputText.trim() && !counterOfferInput.trim()}
                  className="p-2.5 rounded-xl bg-[#23E598] hover:bg-[#1DCC84] text-[#0A0A0A] transition-colors disabled:opacity-40 cursor-pointer shadow-xs"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
