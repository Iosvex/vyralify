const { auth, db } = require('../config/firebase');

/**
 * Optional authentication: Attaches user and profile if Bearer token present.
 */
async function optionalAuth(req, res, next) {
  try {
    const authHeader = req.get('Authorization') || '';
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7).trim();
      const decoded = await auth.verifyIdToken(token);
      req.user = decoded;
      const userDoc = await db.doc(`users/${decoded.uid}`).get();
      req.profile = userDoc.exists ? userDoc.data() : { uid: decoded.uid, email: decoded.email, role: 'member', tier: 'free' };
    }
  } catch (err) {
    // If token invalid, proceed unauthenticated
    req.user = null;
    req.profile = null;
  }
  next();
}

/**
 * Mandatory authentication: Rejects request with 401 if token missing or invalid.
 */
async function requireAuth(req, res, next) {
  try {
    const authHeader = req.get('Authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required. Missing Bearer token.' });
    }
    const token = authHeader.slice(7).trim();
    const decoded = await auth.verifyIdToken(token);
    req.user = decoded;

    const userDoc = await db.doc(`users/${decoded.uid}`).get();
    if (!userDoc.exists) {
      // User has Auth record but no Firestore doc yet
      req.profile = { uid: decoded.uid, email: decoded.email, role: 'member', tier: 'free' };
    } else {
      req.profile = userDoc.data();
    }
    next();
  } catch (err) {
    console.error('Auth verification error:', err.message);
    return res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
}

/**
 * Admin authorization: Requires user to be authenticated and have role == 'admin'
 */
function requireAdmin(req, res, next) {
  if (!req.user || !req.profile) {
    return res.status(401).json({ error: 'Authentication required.' });
  }
  const email = (req.profile.email || req.user.email || '').toLowerCase();
  const isAdminEmail = email === 'support@vyralify.in' || email === 'vyralify.io@gmail.com';
  if (req.profile.role === 'admin' || isAdminEmail) {
    return next();
  }
  return res.status(403).json({ error: 'Forbidden. Admin privileges required.' });
}

module.exports = {
  optionalAuth,
  requireAuth,
  requireAdmin
};
