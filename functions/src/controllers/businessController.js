const { db, serverTimestamp } = require('../config/firebase');

// ==================== PRODUCTS ====================

async function listProducts(req, res) {
  try {
    const uid = req.user.uid;
    const limit = Math.min(Number(req.query.limit) || 20, 100);
    const page = Math.max(Number(req.query.page) || 1, 1);
    const offset = (page - 1) * limit;

    const snap = await db.collection('products')
      .where('sellerUid', '==', uid)
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .offset(offset)
      .get();

    const products = [];
    snap.forEach(doc => products.push({ id: doc.id, ...doc.data() }));

    if (products.length === 0) {
      return res.json({
        success: true,
        data: [],
        pagination: { page, limit, count: 0 },
        emptyState: {
          icon: '📦',
          title: 'No products in your store yet',
          message: 'Create your first digital product, prompt pack, or SaaS tool link to start monetizing your audience.',
          ctaAction: '/business/products/new'
        }
      });
    }

    return res.json({
      success: true,
      data: products,
      pagination: { page, limit, count: products.length }
    });
  } catch (err) {
    console.error('listProducts error:', err);
    return res.status(500).json({ error: 'Failed to list products.' });
  }
}

async function createProduct(req, res) {
  try {
    const uid = req.user.uid;
    const {
      title,
      type = 'digital_product', // digital_product | saas_tool | paid_community
      description = '',
      price = 0,
      currency = 'INR',
      accessUrl = '',
      coverImage = '',
      isPublished = true,
      features = []
    } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({ error: 'Title and price are required.' });
    }

    const docRef = await db.collection('products').add({
      sellerUid: uid,
      title: title.trim(),
      type,
      description: description.trim(),
      price: Number(price),
      currency: currency.toUpperCase(),
      accessUrl: accessUrl.trim(),
      coverImage,
      isPublished: Boolean(isPublished),
      features: Array.isArray(features) ? features : [],
      salesCount: 0,
      totalRevenue: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return res.status(201).json({ success: true, data: { id: docRef.id } });
  } catch (err) {
    console.error('createProduct error:', err);
    return res.status(500).json({ error: 'Failed to create product.' });
  }
}

async function updateProduct(req, res) {
  try {
    const uid = req.user.uid;
    const { id } = req.params;
    const docRef = db.doc(`products/${id}`);
    const doc = await docRef.get();

    if (!doc.exists || doc.data().sellerUid !== uid) {
      return res.status(404).json({ error: 'Product not found or unauthorized.' });
    }

    const updates = { ...req.body, updatedAt: serverTimestamp() };
    delete updates.id;
    delete updates.sellerUid;
    delete updates.salesCount;
    delete updates.totalRevenue;

    await docRef.update(updates);
    return res.json({ success: true, message: 'Product updated successfully.' });
  } catch (err) {
    console.error('updateProduct error:', err);
    return res.status(500).json({ error: 'Failed to update product.' });
  }
}

async function deleteProduct(req, res) {
  try {
    const uid = req.user.uid;
    const { id } = req.params;
    const docRef = db.doc(`products/${id}`);
    const doc = await docRef.get();

    if (!doc.exists || doc.data().sellerUid !== uid) {
      return res.status(404).json({ error: 'Product not found or unauthorized.' });
    }

    await docRef.delete();
    return res.json({ success: true, message: 'Product deleted successfully.' });
  } catch (err) {
    console.error('deleteProduct error:', err);
    return res.status(500).json({ error: 'Failed to delete product.' });
  }
}

// ==================== SERVICES ====================

async function listServices(req, res) {
  try {
    const uid = req.user.uid;
    const snap = await db.collection('services')
      .where('sellerUid', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();

    const services = [];
    snap.forEach(doc => services.push({ id: doc.id, ...doc.data() }));
    return res.json({ success: true, data: services });
  } catch (err) {
    console.error('listServices error:', err);
    return res.status(500).json({ error: 'Failed to list services.' });
  }
}

async function createService(req, res) {
  try {
    const uid = req.user.uid;
    const {
      title,
      pricingModel = 'fixed', // fixed | retainer | hourly
      price = 0,
      currency = 'INR',
      description = '',
      deliverables = [],
      turnaroundDays = 3
    } = req.body;

    if (!title) {
      return res.status(400).json({ error: 'Service title is required.' });
    }

    const docRef = await db.collection('services').add({
      sellerUid: uid,
      title: title.trim(),
      pricingModel,
      price: Number(price),
      currency: currency.toUpperCase(),
      description: description.trim(),
      deliverables: Array.isArray(deliverables) ? deliverables : [],
      turnaroundDays: Number(turnaroundDays),
      activeClients: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    return res.status(201).json({ success: true, data: { id: docRef.id } });
  } catch (err) {
    console.error('createService error:', err);
    return res.status(500).json({ error: 'Failed to create service.' });
  }
}

// ==================== CREATOR STORE & CHECKOUT ====================

async function getStore(req, res) {
  try {
    const uid = req.user.uid;
    const doc = await db.doc(`stores/${uid}`).get();
    if (!doc.exists) {
      return res.json({
        success: true,
        data: {
          storeName: 'My Creator Store',
          slug: uid.slice(0, 8).toLowerCase(),
          bio: 'Digital products, templates, and creator tools.',
          brandColor: '#FF5722',
          isPublished: false
        }
      });
    }
    return res.json({ success: true, data: doc.data() });
  } catch (err) {
    console.error('getStore error:', err);
    return res.status(500).json({ error: 'Failed to fetch store settings.' });
  }
}

async function updateStore(req, res) {
  try {
    const uid = req.user.uid;
    const { storeName, slug, bio, brandColor, isPublished, socialLinks } = req.body;

    const data = {
      sellerUid: uid,
      storeName: storeName || 'My Creator Store',
      slug: (slug || uid.slice(0, 8)).toLowerCase().replace(/[^a-z0-9-_]/g, ''),
      bio: bio || '',
      brandColor: brandColor || '#FF5722',
      isPublished: Boolean(isPublished),
      socialLinks: socialLinks || {},
      updatedAt: serverTimestamp()
    };

    await db.doc(`stores/${uid}`).set(data, { merge: true });
    return res.json({ success: true, message: 'Store profile updated successfully.', data });
  } catch (err) {
    console.error('updateStore error:', err);
    return res.status(500).json({ error: 'Failed to update store.' });
  }
}

async function getPublicStore(req, res) {
  try {
    const { slug } = req.params;
    const snap = await db.collection('stores').where('slug', '==', slug.toLowerCase()).limit(1).get();

    if (snap.empty) {
      return res.status(404).json({ error: 'Store not found.' });
    }

    const store = snap.docs[0].data();
    const sellerUid = store.sellerUid;

    // Fetch published products
    const productsSnap = await db.collection('products')
      .where('sellerUid', '==', sellerUid)
      .where('isPublished', '==', true)
      .get();

    const products = [];
    productsSnap.forEach(d => {
      const p = d.data();
      delete p.accessUrl; // Keep digital fulfillment private until purchase
      products.push({ id: d.id, ...p });
    });

    return res.json({
      success: true,
      data: {
        store,
        products
      }
    });
  } catch (err) {
    console.error('getPublicStore error:', err);
    return res.status(500).json({ error: 'Failed to load public store.' });
  }
}

async function createCheckoutLink(req, res) {
  try {
    const { productId, buyerEmail, buyerName } = req.body;
    if (!productId) {
      return res.status(400).json({ error: 'ProductId is required.' });
    }

    const productDoc = await db.doc(`products/${productId}`).get();
    if (!productDoc.exists) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    const product = productDoc.data();
    
    // In production, integrate Cashfree / Stripe checkout session
    // Return direct hosted checkout URL
    const checkoutUrl = `https://payments.cashfree.com/forms/vyralifyio?product=${productId}&amount=${product.price}`;

    return res.json({
      success: true,
      data: {
        checkoutUrl,
        productId,
        title: product.title,
        price: product.price,
        currency: product.currency
      }
    });
  } catch (err) {
    console.error('createCheckoutLink error:', err);
    return res.status(500).json({ error: 'Failed to create checkout link.' });
  }
}

// ==================== ORDERS & CUSTOMERS ====================

async function listOrders(req, res) {
  try {
    const uid = req.user.uid;
    const snap = await db.collection('orders')
      .where('sellerUid', '==', uid)
      .orderBy('createdAt', 'desc')
      .limit(50)
      .get();

    const orders = [];
    snap.forEach(doc => orders.push({ id: doc.id, ...doc.data() }));
    return res.json({ success: true, data: orders });
  } catch (err) {
    console.error('listOrders error:', err);
    return res.status(500).json({ error: 'Failed to list orders.' });
  }
}

async function listCustomers(req, res) {
  try {
    const uid = req.user.uid;
    const snap = await db.collection('customers')
      .where('sellerUid', '==', uid)
      .orderBy('totalSpend', 'desc')
      .limit(50)
      .get();

    const customers = [];
    snap.forEach(doc => customers.push({ id: doc.id, ...doc.data() }));
    return res.json({ success: true, data: customers });
  } catch (err) {
    console.error('listCustomers error:', err);
    return res.status(500).json({ error: 'Failed to list customers.' });
  }
}

async function handleRefundRequest(req, res) {
  try {
    const uid = req.user.uid;
    const { orderId, reason } = req.body;

    const orderDoc = await db.doc(`orders/${orderId}`).get();
    if (!orderDoc.exists || orderDoc.data().sellerUid !== uid) {
      return res.status(404).json({ error: 'Order not found or unauthorized.' });
    }

    const docRef = await db.collection('refundRequests').add({
      orderId,
      sellerUid: uid,
      buyerEmail: orderDoc.data().buyerEmail,
      amount: orderDoc.data().amount,
      currency: orderDoc.data().currency,
      reason: reason || 'Customer request',
      status: 'pending',
      createdAt: serverTimestamp()
    });

    return res.json({ success: true, message: 'Refund request submitted.', id: docRef.id });
  } catch (err) {
    console.error('handleRefundRequest error:', err);
    return res.status(500).json({ error: 'Failed to submit refund request.' });
  }
}

// ==================== LINK-IN-BIO BUILDER ====================

async function getLinkPage(req, res) {
  try {
    const uid = req.user.uid;
    const doc = await db.doc(`linkPages/${uid}`).get();
    if (!doc.exists) {
      return res.json({
        success: true,
        data: {
          slug: uid.slice(0, 8),
          title: 'My Links',
          bio: 'Follow my content & check out my products 👇',
          theme: 'dark-glass',
          links: [],
          totalClicks: 0
        }
      });
    }
    return res.json({ success: true, data: doc.data() });
  } catch (err) {
    console.error('getLinkPage error:', err);
    return res.status(500).json({ error: 'Failed to get link page.' });
  }
}

async function saveLinkPage(req, res) {
  try {
    const uid = req.user.uid;
    const { slug, title, bio, theme, links } = req.body;

    const pageData = {
      ownerUid: uid,
      slug: (slug || uid.slice(0, 8)).toLowerCase().replace(/[^a-z0-9-_]/g, ''),
      title: title || 'My Links',
      bio: bio || '',
      theme: theme || 'dark-glass',
      links: Array.isArray(links) ? links : [],
      updatedAt: serverTimestamp()
    };

    await db.doc(`linkPages/${uid}`).set(pageData, { merge: true });
    return res.json({ success: true, message: 'Link page saved successfully.', data: pageData });
  } catch (err) {
    console.error('saveLinkPage error:', err);
    return res.status(500).json({ error: 'Failed to save link page.' });
  }
}

const DEFAULT_TEMPLATES = [
  { id: 'tpl-1', category: 'Sales Templates', title: 'The 3-Message Inbound DM Closing Script', description: 'Converts commenters into buyers without being pushy.' },
  { id: 'tpl-2', category: 'Proposal Templates', title: 'Brand Sponsorship Pitch Email & Media Kit Deck', description: 'Secures $250 - $1,500 brand sponsorships for theme pages.' }
];

async function listBusinessTemplates(req, res) {
  try {
    const snap = await db.collection('businessTemplates').orderBy('category').get();
    const templates = [];
    snap.forEach(doc => templates.push({ id: doc.id, ...doc.data() }));
    return res.json({ success: true, data: templates.length ? templates : DEFAULT_TEMPLATES });
  } catch (err) {
    console.error('listBusinessTemplates fallback applied:', err.message);
    return res.json({ success: true, data: DEFAULT_TEMPLATES, fallback: true });
  }
}

// ==================== AFFILIATE ENGINE (COMMERCE) ====================

async function getAffiliateDashboard(req, res) {
  try {
    const uid = req.user.uid;
    const userDoc = await db.doc(`users/${uid}`).get();
    const userData = userDoc.exists ? userDoc.data() : {};
    const affiliateCode = userData.affiliateCode || uid.slice(0, 8).toUpperCase();

    const affDoc = await db.doc(`affiliates/${affiliateCode}`).get();
    const affData = affDoc.exists ? affDoc.data() : {
      clicks: 0,
      signups: 0,
      conversions: 0,
      commissionRate: '40% Recurring',
      payoutPerMember: '₹200 / month'
    };

    const monthlyRecurringRevenue = (affData.conversions || 0) * 200;

    return res.json({
      success: true,
      data: {
        affiliateCode,
        referralLink: `https://vyralify.io/?ref=${affiliateCode}`,
        stats: {
          clicks: affData.clicks || 0,
          signups: affData.signups || 0,
          activeConversions: affData.conversions || 0,
          monthlyRecurringIncome: monthlyRecurringRevenue,
          currency: 'INR',
          commissionRate: '40% Recurring'
        },
        programDetails: {
          payoutSchedule: 'Monthly on 1st',
          minimumThreshold: '₹500',
          tier: '40% recurring lifetime commission on all referred active memberships'
        }
      }
    });
  } catch (err) {
    console.error('getAffiliateDashboard error:', err);
    return res.status(500).json({ error: 'Failed to load affiliate dashboard.' });
  }
}

async function trackAffiliateClick(req, res) {
  try {
    const { code } = req.params;
    if (!code) return res.status(400).json({ error: 'Affiliate code required.' });

    const cleanCode = code.toUpperCase().trim();
    const affRef = db.doc(`affiliates/${cleanCode}`);
    const affDoc = await affRef.get();

    if (affDoc.exists) {
      await affRef.update({
        clicks: admin.firestore.FieldValue.increment(1),
        lastClickAt: serverTimestamp()
      });
    }

    return res.json({ success: true, tracked: true });
  } catch (err) {
    console.error('trackAffiliateClick error:', err);
    return res.status(500).json({ error: 'Failed to record click.' });
  }
}

module.exports = {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  listServices,
  createService,
  getStore,
  updateStore,
  getPublicStore,
  createCheckoutLink,
  listOrders,
  listCustomers,
  handleRefundRequest,
  getLinkPage,
  saveLinkPage,
  listBusinessTemplates,
  getAffiliateDashboard,
  trackAffiliateClick
};
