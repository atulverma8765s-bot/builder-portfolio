const API_BASE = '/api';

export const api = {
  async getPortfolios() {
    const res = await fetch(`${API_BASE}/portfolios`);
    if (!res.ok) throw new Error('Failed to fetch portfolios');
    return res.json();
  },

  async getPortfolio(id) {
    const res = await fetch(`${API_BASE}/portfolios/${id}`);
    if (!res.ok) throw new Error('Failed to fetch portfolio');
    return res.json();
  },

  async getTemplates() {
    const res = await fetch(`${API_BASE}/templates`);
    if (!res.ok) throw new Error('Failed to fetch templates');
    return res.json();
  },

  async createPortfolio(data) {
    const res = await fetch(`${API_BASE}/portfolios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to create portfolio');
    }
    return res.json();
  },

  async updatePortfolio(id, data) {
    const res = await fetch(`${API_BASE}/portfolios/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to update portfolio');
    }
    return res.json();
  },

  async deletePortfolio(id) {
    const res = await fetch(`${API_BASE}/portfolios/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete portfolio');
    return res.json();
  },

  async duplicatePortfolio(id) {
    const res = await fetch(`${API_BASE}/portfolios/${id}/duplicate`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to duplicate portfolio');
    return res.json();
  },

  async getPublicPortfolio(slug) {
    const res = await fetch(`${API_BASE}/public/${slug}`);
    if (!res.ok) throw new Error('Portfolio not found');
    return res.json();
  },

  async submitContact(slug, contactData) {
    const res = await fetch(`${API_BASE}/public/${slug}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to submit inquiry');
    }
    return res.json();
  },

  async getMessages(portfolioId) {
    const res = await fetch(`${API_BASE}/portfolios/${portfolioId}/messages`);
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  },

  async markMessageRead(messageId) {
    const res = await fetch(`${API_BASE}/messages/${messageId}/read`, {
      method: 'PUT',
    });
    return res.json();
  },

  async deleteMessage(messageId) {
    const res = await fetch(`${API_BASE}/messages/${messageId}`, {
      method: 'DELETE',
    });
    return res.json();
  },

  async enhanceWithAi(type, prompt, context = {}) {
    const res = await fetch(`${API_BASE}/ai/enhance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, prompt, context }),
    });
    if (!res.ok) throw new Error('Failed to generate AI enhancement');
    return res.json();
  },

  getExportHtmlUrl(id) {
    return `${API_BASE}/export/html/${id}`;
  },
};
