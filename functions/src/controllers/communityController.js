const { db, serverTimestamp, increment } = require('../config/firebase');

const VALID_CHANNELS = ['introductions', 'general', 'networking', 'wins', 'reviews'];

/**
 * GET /api/community/posts
 * Fetch community posts by channel
 */
async function listPosts(req, res) {
  try {
    const { channel = 'general', limit = 30 } = req.query;

    let query = db.collection('communityPosts');
    if (channel && VALID_CHANNELS.includes(channel)) {
      query = query.where('channel', '==', channel);
    }

    const snap = await query.orderBy('createdAt', 'desc').limit(Number(limit)).get();
    const posts = [];
    snap.forEach(d => posts.push({ id: d.id, ...d.data() }));

    return res.json({ success: true, channel, data: posts });
  } catch (err) {
    console.error('listCommunityPosts error:', err);
    return res.status(500).json({ error: 'Failed to list community posts.' });
  }
}

/**
 * POST /api/community/posts
 * Create a new community post or page review request
 */
async function createPost(req, res) {
  try {
    const uid = req.user.uid;
    const { channel = 'general', body, title, instagramHandle, tags = [] } = req.body;

    if (!VALID_CHANNELS.includes(channel)) {
      return res.status(400).json({ error: `Invalid channel. Must be one of: ${VALID_CHANNELS.join(', ')}` });
    }

    if (!body || body.trim().length < 5) {
      return res.status(400).json({ error: 'Post body must be at least 5 characters.' });
    }

    // Fetch user profile name
    const userDoc = await db.doc(`users/${uid}`).get();
    const displayName = userDoc.exists ? (userDoc.data().displayName || 'Vyralify Creator') : 'Vyralify Creator';

    const postData = {
      uid,
      displayName,
      channel,
      title: title ? title.trim() : null,
      body: body.trim(),
      instagramHandle: instagramHandle ? instagramHandle.replace(/^@/, '').trim().toLowerCase() : null,
      tags: Array.isArray(tags) ? tags : [],
      likesCount: 0,
      commentsCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await db.collection('communityPosts').add(postData);

    return res.status(201).json({
      success: true,
      message: channel === 'reviews' ? 'Page review request posted to the community!' : 'Post published!',
      data: { id: docRef.id, ...postData }
    });
  } catch (err) {
    console.error('createPost error:', err);
    return res.status(500).json({ error: 'Failed to create community post.' });
  }
}

/**
 * POST /api/community/posts/:id/like
 * Like or unlike a community post
 */
async function toggleLike(req, res) {
  try {
    const { id } = req.params;
    const postRef = db.doc(`communityPosts/${id}`);
    const post = await postRef.get();

    if (!post.exists) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    await postRef.update({
      likesCount: increment(1)
    });

    return res.json({ success: true, message: 'Post liked.' });
  } catch (err) {
    console.error('toggleLike error:', err);
    return res.status(500).json({ error: 'Failed to like post.' });
  }
}

/**
 * POST /api/community/posts/:id/comments
 * Add a reply or feedback to a review request
 */
async function addComment(req, res) {
  try {
    const uid = req.user.uid;
    const { id } = req.params;
    const { body } = req.body;

    if (!body || body.trim().length < 2) {
      return res.status(400).json({ error: 'Comment body cannot be empty.' });
    }

    const postRef = db.doc(`communityPosts/${id}`);
    const post = await postRef.get();
    if (!post.exists) {
      return res.status(404).json({ error: 'Post not found.' });
    }

    const userDoc = await db.doc(`users/${uid}`).get();
    const displayName = userDoc.exists ? (userDoc.data().displayName || 'Vyralify Creator') : 'Vyralify Creator';

    const commentData = {
      postId: id,
      uid,
      displayName,
      body: body.trim(),
      createdAt: serverTimestamp()
    };

    await db.collection(`communityPosts/${id}/comments`).add(commentData);
    await postRef.update({ commentsCount: increment(1) });

    return res.status(201).json({ success: true, message: 'Comment added.', data: commentData });
  } catch (err) {
    console.error('addComment error:', err);
    return res.status(500).json({ error: 'Failed to add comment.' });
  }
}

module.exports = {
  listPosts,
  createPost,
  toggleLike,
  addComment
};
