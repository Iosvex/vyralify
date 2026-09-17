const express = require('express');
const router = express.Router();
const { requireAuth, optionalAuth } = require('../middleware/auth');
const { aiLimiter, authCheckoutLimiter } = require('../middleware/rateLimiter');
const cacheMiddleware = require('../middleware/cacheMiddleware');

// Import controllers
const home = require('../controllers/homeController');
const ai = require('../controllers/aiController');
const business = require('../controllers/businessController');
const account = require('../controllers/accountController');
const discover = require('../controllers/discoverController');
const campaign = require('../controllers/campaignController');
const university = require('../controllers/universityController');
const wallet = require('../controllers/walletController');
const community = require('../controllers/communityController');

// ==================== 1. HOME ====================
router.get('/home/overview', requireAuth, home.getOverview);

// ==================== 2. VYRALIFY AI (Rate Limited) ====================
router.post('/ai/copilot', requireAuth, aiLimiter, ai.handleCoPilot);
router.get('/ai/next-actions', requireAuth, ai.getNextActions);
router.post('/ai/generate', requireAuth, aiLimiter, ai.handleGenerateTool);

// ==================== 01 LAUNCH BUILDERS ====================
router.post('/launch/business-names', optionalAuth, discover.generateBusinessNames);
router.get('/launch/usernames', optionalAuth, discover.findInstagramUsernames);

// ==================== 3. LAUNCH YOUR BUSINESS (COMMERCE) ====================
// Products
router.get('/business/products', requireAuth, business.listProducts);
router.post('/business/products', requireAuth, business.createProduct);
router.put('/business/products/:id', requireAuth, business.updateProduct);
router.delete('/business/products/:id', requireAuth, business.deleteProduct);

// Services
router.get('/business/services', requireAuth, business.listServices);
router.post('/business/services', requireAuth, business.createService);

// Store Builder & Checkout (Checkout Rate Limited)
router.get('/business/store', requireAuth, business.getStore);
router.put('/business/store', requireAuth, business.updateStore);
router.get('/business/store/public/:slug', optionalAuth, cacheMiddleware(60), business.getPublicStore);
router.post('/business/checkout/create-link', optionalAuth, authCheckoutLimiter, business.createCheckoutLink);

// Orders & Customers CRM
router.get('/business/orders', requireAuth, business.listOrders);
router.get('/business/customers', requireAuth, business.listCustomers);
router.post('/business/orders/refund', requireAuth, business.handleRefundRequest);

// Link-in-Bio
router.get('/business/link-page', requireAuth, business.getLinkPage);
router.put('/business/link-page', requireAuth, business.saveLinkPage);

// Business Templates (Cached)
router.get('/business/templates', optionalAuth, cacheMiddleware(300), business.listBusinessTemplates);

// Commerce Affiliate Engine
router.get('/commerce/affiliates/dashboard', requireAuth, business.getAffiliateDashboard);
router.post('/commerce/affiliates/track/:code', optionalAuth, business.trackAffiliateClick);

// ==================== 4. MANAGE YOUR ACCOUNT ====================
// Pages
router.get('/account/pages', requireAuth, account.listPages);
router.post('/account/pages', requireAuth, account.addPage);
router.post('/account/audit-profile', requireAuth, account.auditProfile);
router.get('/account/check-username', optionalAuth, account.checkUsername);

// Calendar & Scheduling
router.get('/account/scheduler', requireAuth, account.listScheduledPosts);
router.post('/account/scheduler', requireAuth, account.schedulePost);
router.get('/account/best-times', requireAuth, cacheMiddleware(600), account.getBestTimeRecommendations);

// DMs & Comments
router.get('/account/dm-templates', requireAuth, account.listDmTemplates);
router.post('/account/dm-templates', requireAuth, account.saveDmTemplate);

// Growth & Competitors
router.get('/account/growth', requireAuth, account.getGrowthTracker);
router.get('/account/competitors', requireAuth, account.listCompetitors);
router.post('/account/competitors', requireAuth, account.addCompetitor);

// ==================== 5. DISCOVER & CREATE (Cached Repeat Requests) ====================
router.get('/discover/niches', optionalAuth, cacheMiddleware(300), discover.listNiches);
router.get('/discover/viral-pages', optionalAuth, cacheMiddleware(300), discover.listViralPages);
router.get('/discover/trending-audio', optionalAuth, cacheMiddleware(300), discover.listTrendingAudio);
router.post('/discover/analyze-content', optionalAuth, discover.analyzeContent);
router.post('/discover/repurpose', optionalAuth, discover.repurposeContent);
router.get('/discover/assets', optionalAuth, cacheMiddleware(300), discover.listAssets);

// ==================== 6. VYRALIFY CAMPAIGNS & MARKETPLACE ====================
router.get('/campaigns', optionalAuth, cacheMiddleware(60), campaign.listCampaigns);
router.get('/campaigns/:id', optionalAuth, campaign.getCampaignDetails);
router.post('/campaigns/:id/join', requireAuth, campaign.joinCampaign);
router.post('/campaigns/submissions/:id/submit-clip', requireAuth, campaign.submitClipProof);
router.get('/campaigns/user/submissions', requireAuth, campaign.listMySubmissions);
router.get('/campaigns/user/earnings', requireAuth, campaign.getEarningsLedger);
router.post('/campaigns/user/withdraw', requireAuth, authCheckoutLimiter, campaign.requestWithdrawal);
router.get('/campaigns/:id/roi', optionalAuth, campaign.getCampaignRoi);

// Marketplace Discovery & Matching
router.get('/marketplace/personalized-feed', requireAuth, campaign.getPersonalizedOpportunities);
router.get('/marketplace/creators', optionalAuth, cacheMiddleware(60), campaign.listMarketplaceCreators);

// ==================== 08 WALLET SYSTEM ====================
router.get('/wallet/summary', requireAuth, wallet.getWalletSummary);
router.get('/wallet/transactions', requireAuth, wallet.getTransactionHistory);
router.post('/wallet/withdraw', requireAuth, authCheckoutLimiter, wallet.createWithdrawal);

// ==================== LAUNCH COMMUNITY ====================
router.get('/community/posts', optionalAuth, community.listPosts);
router.post('/community/posts', requireAuth, community.createPost);
router.post('/community/posts/:id/like', requireAuth, community.toggleLike);
router.post('/community/posts/:id/comments', requireAuth, community.addComment);

// ==================== 7. VYRALIFY UNIVERSITY (Cached Repeat Requests) ====================
router.get('/university/curriculum', optionalAuth, cacheMiddleware(600), university.listCurriculum);
router.post('/university/complete-lesson', requireAuth, university.markLessonComplete);
router.get('/university/roadmap', requireAuth, university.getRoadmap);

module.exports = router;
