import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { samplePortfolios } from './sampleData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, '..', 'data');
const PORTFOLIOS_FILE = path.join(DATA_DIR, 'portfolios.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure portfolios.json exists with sample data
if (!fs.existsSync(PORTFOLIOS_FILE)) {
  fs.writeFileSync(PORTFOLIOS_FILE, JSON.stringify(samplePortfolios, null, 2), 'utf8');
}

// Ensure messages.json exists
if (!fs.existsSync(MESSAGES_FILE)) {
  const initialMessages = [
    {
      id: "msg-sample-1",
      portfolioId: "dev-alex-rivera",
      senderName: "Jessica Wong",
      senderEmail: "jessica.wong@techinnovate.io",
      subject: "Staff Full-Stack Role at TechInnovate",
      message: "Hi Alex, I came across your portfolio and was blown away by your open-source work and distributed systems background. We're looking for a lead architect for our cloud streaming engine. Would love to set up a 20-min chat!",
      createdAt: new Date(Date.now() - 3600 * 1000 * 4).toISOString(),
      read: false,
    },
    {
      id: "msg-sample-2",
      portfolioId: "dev-alex-rivera",
      senderName: "Marcus Brody",
      senderEmail: "marcus@seedfund.vc",
      subject: "Advisory & Consulting inquiry",
      message: "Hey Alex! Loved your telemetry platform case study. We have two portfolio companies in need of performance and scaling audits. Are you taking on consulting projects this quarter?",
      createdAt: new Date(Date.now() - 3600 * 1000 * 24).toISOString(),
      read: true,
    },
  ];
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(initialMessages, null, 2), 'utf8');
}

function readPortfolios() {
  try {
    const raw = fs.readFileSync(PORTFOLIOS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading portfolios:", err);
    return [];
  }
}

function writePortfolios(data) {
  fs.writeFileSync(PORTFOLIOS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

function readMessages() {
  try {
    const raw = fs.readFileSync(MESSAGES_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading messages:", err);
    return [];
  }
}

function writeMessages(data) {
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(data, null, 2), 'utf8');
}

export const db = {
  getAllPortfolios() {
    return readPortfolios();
  },

  getPortfolioById(id) {
    const list = readPortfolios();
    return list.find((p) => p.id === id) || null;
  },

  getPortfolioBySlug(slug) {
    const list = readPortfolios();
    return list.find((p) => p.slug === slug) || null;
  },

  createPortfolio(data) {
    const list = readPortfolios();
    const newId = `folio-${Date.now()}`;
    const baseSlug = (data.hero?.name || 'portfolio')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // ensure unique slug
    let slug = baseSlug;
    let counter = 1;
    while (list.some((p) => p.slug === slug)) {
      slug = `${baseSlug}-${counter++}`;
    }

    const newPortfolio = {
      ...data,
      id: newId,
      slug: data.slug || slug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
    };

    list.unshift(newPortfolio);
    writePortfolios(list);
    return newPortfolio;
  },

  updatePortfolio(id, updates) {
    const list = readPortfolios();
    const index = list.findIndex((p) => p.id === id);
    if (index === -1) return null;

    // Check slug uniqueness if slug is being updated
    if (updates.slug && updates.slug !== list[index].slug) {
      const conflict = list.some((p) => p.slug === updates.slug && p.id !== id);
      if (conflict) {
        throw new Error("Slug is already taken by another portfolio.");
      }
    }

    list[index] = {
      ...list[index],
      ...updates,
      id, // protect ID
      updatedAt: new Date().toISOString(),
    };

    writePortfolios(list);
    return list[index];
  },

  deletePortfolio(id) {
    let list = readPortfolios();
    const initialLen = list.length;
    list = list.filter((p) => p.id !== id);
    if (list.length === initialLen) return false;
    writePortfolios(list);
    return true;
  },

  duplicatePortfolio(id) {
    const original = this.getPortfolioById(id);
    if (!original) return null;

    const copyData = JSON.parse(JSON.stringify(original));
    copyData.title = `${copyData.title} (Copy)`;
    if (copyData.hero) {
      copyData.hero.name = `${copyData.hero.name} (Copy)`;
    }
    copyData.slug = `${copyData.slug}-copy-${Date.now().toString().slice(-4)}`;

    return this.createPortfolio(copyData);
  },

  incrementViews(slugOrId) {
    const list = readPortfolios();
    const item = list.find((p) => p.id === slugOrId || p.slug === slugOrId);
    if (item) {
      item.views = (item.views || 0) + 1;
      writePortfolios(list);
      return item.views;
    }
    return 0;
  },

  getMessages(portfolioId) {
    const all = readMessages();
    return all.filter((m) => m.portfolioId === portfolioId).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  addMessage(portfolioId, { senderName, senderEmail, subject, message }) {
    const all = readMessages();
    const newMsg = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      portfolioId,
      senderName,
      senderEmail,
      subject: subject || "Portfolio Visitor Message",
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };
    all.unshift(newMsg);
    writeMessages(all);
    return newMsg;
  },

  markMessageRead(messageId) {
    const all = readMessages();
    const msg = all.find((m) => m.id === messageId);
    if (msg) {
      msg.read = true;
      writeMessages(all);
      return true;
    }
    return false;
  },

  deleteMessage(messageId) {
    let all = readMessages();
    const initialLen = all.length;
    all = all.filter((m) => m.id !== messageId);
    if (all.length === initialLen) return false;
    writeMessages(all);
    return true;
  },
};
