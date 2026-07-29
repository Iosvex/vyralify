/* ============================================================
   VYRALIFY ADMIN CONSOLE & INSTAGRAM DIRECT CHAT ENGINE
   ============================================================ */

(function () {
  const CHAT_STORAGE_KEY = 'vyralify_chat_threads_v1';

  // Initial seed threads if localStorage is empty
  const SEED_THREADS = {
    'user_101': {
      userId: 'user_101',
      userName: 'Rohan Sharma',
      userEmail: 'rohan@vyralify.in',
      userTier: 'Pro Creator',
      avatar: 'RS',
      unread: 1,
      lastMessage: 'Hey Admin! How do I get brand deal templates from Module 4?',
      lastTime: '10:14 AM',
      messages: [
        { id: 'm1', sender: 'admin', text: 'Welcome to Vyralify Pro! Let us know if you need help scaling your Instagram reels.', time: 'Yesterday 4:30 PM' },
        { id: 'm2', sender: 'user', text: 'Hey Admin! How do I get brand deal templates from Module 4?', time: '10:14 AM' }
      ]
    },
    'user_102': {
      userId: 'user_102',
      userName: 'Priya Patel',
      userEmail: 'priya.creators@gmail.com',
      userTier: 'Pro Creator',
      avatar: 'PP',
      unread: 0,
      lastMessage: 'Awesome, my reel crossed 500K views using the AI viral hooks!',
      lastTime: 'Yesterday',
      messages: [
        { id: 'm10', sender: 'user', text: 'Hey support! The AI Reel Hook Generator is insane!', time: 'Yesterday 2:15 PM' },
        { id: 'm11', sender: 'admin', text: 'That is awesome Priya! Keep consistency high.', time: 'Yesterday 2:30 PM' },
        { id: 'm12', sender: 'user', text: 'Awesome, my reel crossed 500K views using the AI viral hooks!', time: 'Yesterday 3:10 PM' }
      ]
    },
    'user_103': {
      userId: 'user_103',
      userName: 'Alex Chen',
      userEmail: 'alex.chen@nichegrowth.io',
      userTier: 'Free Trial',
      avatar: 'AC',
      unread: 0,
      lastMessage: 'Thanks for the quick response! Upgrading to Pro now.',
      lastTime: '2 days ago',
      messages: [
        { id: 'm20', sender: 'user', text: 'Hi, does the Pro tier include unlimited AI credit refills?', time: '2 days ago 11:00 AM' },
        { id: 'm21', sender: 'admin', text: 'Hi Alex! Yes, Pro members get priority AI generation credits daily.', time: '2 days ago 11:05 AM' },
        { id: 'm22', sender: 'user', text: 'Thanks for the quick response! Upgrading to Pro now.', time: '2 days ago 11:10 AM' }
      ]
    }
  };

  // Seed Members List
  const MEMBERS_DATA = [
    { id: 'user_101', name: 'Rohan Sharma', email: 'rohan@vyralify.in', tier: 'pro', views: '145.2K' },
    { id: 'user_102', name: 'Priya Patel', email: 'priya.creators@gmail.com', tier: 'pro', views: '520.8K' },
    { id: 'user_103', name: 'Alex Chen', email: 'alex.chen@nichegrowth.io', tier: 'free', views: '48.9K' },
    { id: 'user_104', name: 'Kavya Verma', email: 'kavya@viralmedia.co', tier: 'pro', views: '310.5K' },
    { id: 'user_105', name: 'Siddharth Rao', email: 'sid.reels@gmail.com', tier: 'free', views: '12.4K' }
  ];

  class AdminManager {
    constructor() {
      this.threads = this.loadThreads();
      this.activeUserId = 'user_101';
      this.init();
    }

    loadThreads() {
      try {
        const stored = localStorage.getItem(CHAT_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch (e) {
        console.error('Error loading chat threads:', e);
      }
      // Save initial seed threads
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(SEED_THREADS));
      return { ...SEED_THREADS };
    }

    saveThreads() {
      try {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(this.threads));
      } catch (e) {
        console.error('Error saving chat threads:', e);
      }
    }

    init() {
      this.renderThreadList();
      this.renderActiveChat();
      this.renderMembersTable();
      this.updateStats();

      // Listen to storage events for real-time customer messages across tabs
      window.addEventListener('storage', (e) => {
        if (e.key === CHAT_STORAGE_KEY) {
          this.threads = this.loadThreads();
          this.renderThreadList();
          this.renderActiveChat();
          this.updateStats();
        }
      });
    }

    updateStats() {
      const totalMsgs = Object.values(this.threads).reduce((acc, t) => acc + (t.messages ? t.messages.length : 0), 0);
      const msgStatEl = document.getElementById('stat-total-messages');
      if (msgStatEl) msgStatEl.textContent = totalMsgs;
    }

    renderThreadList(filterQuery = '') {
      const container = document.getElementById('chat-threads-container');
      if (!container) return;

      const q = filterQuery.toLowerCase().trim();
      let html = '';

      Object.values(this.threads).forEach(thread => {
        if (q && !thread.userName.toLowerCase().includes(q) && !thread.lastMessage.toLowerCase().includes(q)) {
          return;
        }

        const isActive = thread.userId === this.activeUserId;
        html += `
          <div class="chat-thread-item ${isActive ? 'active' : ''}" onclick="window.VyralifyAdmin.selectThread('${thread.userId}')">
            <div class="chat-avatar">${thread.avatar || 'CR'}
              <span class="online-dot"></span>
            </div>
            <div class="chat-thread-info">
              <div class="chat-thread-name">
                <span>${thread.userName}</span>
                <span class="chat-thread-time">${thread.lastTime || ''}</span>
              </div>
              <div class="chat-thread-preview">${thread.lastMessage || 'No messages yet'}</div>
            </div>
            ${thread.unread > 0 ? `<span class="unread-badge">${thread.unread}</span>` : ''}
          </div>
        `;
      });

      container.innerHTML = html || '<div style="padding:20px;text-align:center;color:var(--admin-text-sub);font-size:0.8rem">No customer chats found</div>';
    }

    selectThread(userId) {
      if (this.threads[userId]) {
        this.activeUserId = userId;
        this.threads[userId].unread = 0;
        this.saveThreads();
        this.renderThreadList();
        this.renderActiveChat();
      }
    }

    renderActiveChat() {
      const thread = this.threads[this.activeUserId];
      const nameEl = document.getElementById('active-chat-name');
      const avatarEl = document.getElementById('active-chat-avatar');
      const statusEl = document.getElementById('active-chat-status');
      const logEl = document.getElementById('chat-messages-log');

      if (!thread || !logEl) return;

      if (nameEl) nameEl.textContent = thread.userName;
      if (avatarEl) avatarEl.textContent = thread.avatar || 'CR';
      if (statusEl) statusEl.textContent = `● ${thread.userTier || 'Creator Member'} • Private Support`;

      let msgsHtml = '';
      if (thread.messages && thread.messages.length > 0) {
        thread.messages.forEach(msg => {
          const isSent = msg.sender === 'admin';
          msgsHtml += `
            <div class="msg-row ${isSent ? 'sent' : 'received'}">
              <div class="msg-bubble">
                ${msg.text}
                <div class="msg-time">${msg.time}</div>
              </div>
            </div>
          `;
        });
      } else {
        msgsHtml = '<div style="margin:auto;color:var(--admin-text-sub);font-size:0.85rem;">No conversation history yet. Start by sending a message below.</div>';
      }

      logEl.innerHTML = msgsHtml;
      logEl.scrollTop = logEl.scrollHeight;
    }

    sendMessage(customText = null) {
      const input = document.getElementById('admin-chat-input');
      const text = customText || (input ? input.value.trim() : '');
      if (!text || !this.activeUserId) return;

      const thread = this.threads[this.activeUserId];
      if (!thread) return;

      const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const newMsg = {
        id: 'm_' + Date.now(),
        sender: 'admin',
        text: text,
        time: timeNow
      };

      thread.messages.push(newMsg);
      thread.lastMessage = 'You: ' + text;
      thread.lastTime = timeNow;

      this.saveThreads();
      if (input) input.value = '';
      this.renderThreadList();
      this.renderActiveChat();
      this.updateStats();
    }

    useQuickReply(text) {
      this.sendMessage(text);
    }

    clearActiveChat() {
      if (this.activeUserId && this.threads[this.activeUserId]) {
        this.threads[this.activeUserId].messages = [];
        this.threads[this.activeUserId].lastMessage = 'Chat cleared by admin';
        this.saveThreads();
        this.renderThreadList();
        this.renderActiveChat();
      }
    }

    filterChats(query) {
      this.renderThreadList(query);
    }

    renderMembersTable(query = '') {
      const tbody = document.getElementById('admin-members-tbody');
      if (!tbody) return;

      const q = query.toLowerCase().trim();
      let html = '';

      MEMBERS_DATA.forEach(mem => {
        if (q && !mem.name.toLowerCase().includes(q) && !mem.email.toLowerCase().includes(q)) return;

        html += `
          <tr>
            <td><strong>${mem.name}</strong></td>
            <td>${mem.email}</td>
            <td><span class="role-badge ${mem.tier}">${mem.tier.toUpperCase()}</span></td>
            <td>${mem.views}</td>
            <td>
              <button class="admin-btn" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.VyralifyAdmin.openDirectChat('${mem.id}', '${mem.name}', '${mem.email}')">
                <i class="ph-bold ph-chat-circle-dots"></i> Direct Message
              </button>
            </td>
          </tr>
        `;
      });

      tbody.innerHTML = html;
    }

    filterMembers(query) {
      this.renderMembersTable(query);
    }

    openDirectChat(userId, userName, userEmail) {
      if (!this.threads[userId]) {
        const initials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
        this.threads[userId] = {
          userId,
          userName,
          userEmail,
          userTier: 'Pro Creator',
          avatar: initials,
          unread: 0,
          lastMessage: 'Direct chat initiated',
          lastTime: 'Just now',
          messages: [
            { id: 'm_init', sender: 'admin', text: `Hi ${userName}! How can the Vyralify admin team assist you today?`, time: 'Just now' }
          ]
        };
        this.saveThreads();
      }
      this.selectThread(userId);
      const chatCard = document.querySelector('.chat-container-card');
      if (chatCard) chatCard.scrollIntoView({ behavior: 'smooth' });
    }

    refreshData() {
      this.threads = this.loadThreads();
      this.renderThreadList();
      this.renderActiveChat();
      this.updateStats();
    }
  }

  // Global Admin Controller Object
  window.VyralifyAdmin = new AdminManager();
})();
