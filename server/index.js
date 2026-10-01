import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { db } from './database.js';
import { generateStandaloneHtml } from './exportTemplate.js';
import { samplePortfolios } from './sampleData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_PATH = path.join(__dirname, '..', 'dist');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.path}`);
  next();
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// GET all portfolios
app.get('/api/portfolios', (req, res) => {
  try {
    const list = db.getAllPortfolios();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET templates list
app.get('/api/templates', (req, res) => {
  res.json(samplePortfolios);
});

// GET single portfolio by ID
app.get('/api/portfolios/:id', (req, res) => {
  try {
    const item = db.getPortfolioById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Portfolio not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE new portfolio
app.post('/api/portfolios', (req, res) => {
  try {
    const created = db.createPortfolio(req.body);
    res.status(201).json(created);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// UPDATE portfolio
app.put('/api/portfolios/:id', (req, res) => {
  try {
    const updated = db.updatePortfolio(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Portfolio not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DUPLICATE portfolio
app.post('/api/portfolios/:id/duplicate', (req, res) => {
  try {
    const copy = db.duplicatePortfolio(req.params.id);
    if (!copy) return res.status(404).json({ error: 'Portfolio not found' });
    res.status(201).json(copy);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE portfolio
app.delete('/api/portfolios/:id', (req, res) => {
  try {
    const ok = db.deletePortfolio(req.params.id);
    if (!ok) return res.status(404).json({ error: 'Portfolio not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUBLIC: GET portfolio by slug (for public visitor preview)
app.get('/api/public/:slug', (req, res) => {
  try {
    const item = db.getPortfolioBySlug(req.params.slug);
    if (!item) return res.status(404).json({ error: 'Portfolio not found' });
    // Increment view counter
    const newViews = db.incrementViews(item.id);
    item.views = newViews;
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUBLIC: Visitor submits contact form
app.post('/api/public/:slug/contact', (req, res) => {
  try {
    const item = db.getPortfolioBySlug(req.params.slug);
    if (!item) return res.status(404).json({ error: 'Portfolio not found' });

    const { senderName, senderEmail, subject, message } = req.body;
    if (!senderName || !senderEmail || !message) {
      return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    const saved = db.addMessage(item.id, { senderName, senderEmail, subject, message });
    res.status(201).json({ success: true, message: 'Message sent successfully!', data: saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MESSAGES: GET inquiries for a portfolio
app.get('/api/portfolios/:id/messages', (req, res) => {
  try {
    const messages = db.getMessages(req.params.id);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MESSAGES: Mark read
app.put('/api/messages/:id/read', (req, res) => {
  try {
    const ok = db.markMessageRead(req.params.id);
    res.json({ success: ok });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MESSAGES: Delete
app.delete('/api/messages/:id', (req, res) => {
  try {
    const ok = db.deleteMessage(req.params.id);
    res.json({ success: ok });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// EXPORT: Standalone HTML generator
app.get('/api/export/html/:id', (req, res) => {
  try {
    const item = db.getPortfolioById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Portfolio not found' });

    const htmlContent = generateStandaloneHtml(item);
    const filename = `${item.slug || 'portfolio'}.html`;

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(htmlContent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// AI COPYWRITING HELPER: Polishes bios, writes impact bullets, suggests project copy
app.post('/api/ai/enhance', (req, res) => {
  try {
    const { type, prompt, context } = req.body;
    let result = '';

    if (type === 'bio') {
      result = `Passionate ${context?.role || 'technologist'} dedicated to building reliable, high-impact digital solutions. Specializing in modern scalable web stacks and intuitive human experiences, I bridge technical complexity with high velocity execution.`;
    } else if (type === 'bullet') {
      const verbPool = ['Architected', 'Spearheaded', 'Engineered', 'Optimized', 'Accelerated', 'Streamlined'];
      const verb = verbPool[Math.floor(Math.random() * verbPool.length)];
      result = `${verb} core functionality that improved overall application throughput by 42% and reduced user drop-off across key flows.`;
    } else if (type === 'project_tagline') {
      result = `A high-performance, developer-first solution built with modern web standards and responsive design.`;
    } else {
      result = `Enhanced: ${prompt}`;
    }

    res.json({ enhancedText: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static client build if present
if (fs.existsSync(DIST_PATH)) {
  app.use(express.static(DIST_PATH));
  app.get('*', (req, res) => {
    res.sendFile(path.join(DIST_PATH, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`[FolioCraft API Server] Running on http://localhost:${PORT}`);
});
