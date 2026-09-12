import assert from 'assert';

const BASE_URL = 'http://localhost:5000';

async function runTests() {
  console.log('\n========================================');
  console.log('🧪 Starting FolioCraft End-to-End Test Suite');
  console.log('========================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`❌ FAIL: ${name}`);
      console.error(`   ${err.message}`);
      failed++;
    }
  }

  // 1. Health Check
  await test('API Health Check', async () => {
    const res = await fetch(`${BASE_URL}/api/health`);
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.status, 'ok');
  });

  // 2. Fetch Portfolios
  let initialPortfolios = [];
  await test('Fetch All Portfolios', async () => {
    const res = await fetch(`${BASE_URL}/api/portfolios`);
    assert.strictEqual(res.status, 200);
    initialPortfolios = await res.json();
    assert(Array.isArray(initialPortfolios));
    assert(initialPortfolios.length >= 3, 'Expected at least 3 seeded templates');
  });

  // 3. Fetch Templates
  await test('Fetch Available Templates', async () => {
    const res = await fetch(`${BASE_URL}/api/templates`);
    assert.strictEqual(res.status, 200);
    const templates = await res.json();
    assert(templates.length >= 3);
  });

  // 4. Create New Portfolio
  let createdPortfolio = null;
  await test('Create New Portfolio via API', async () => {
    const newFolio = {
      title: 'Automated Test Engineer Portfolio',
      slug: `test-portfolio-${Date.now()}`,
      design: {
        theme: 'terminal',
        fontFamily: 'Fira Code',
        accentColor: '#10b981',
      },
      hero: {
        name: 'Jordan QA',
        title: 'Lead QA Automation Architect',
        tagline: 'Delivering bug-free software at scale.',
        badge: '🟢 Open to work',
      },
      about: { enabled: true, summary: 'Experienced QA architect.' },
      projects: { enabled: true, items: [] },
      contact: { enabled: true, email: 'jordan.qa@example.com' },
    };

    const res = await fetch(`${BASE_URL}/api/portfolios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFolio),
    });
    assert.strictEqual(res.status, 201);
    createdPortfolio = await res.json();
    assert(createdPortfolio.id);
    assert.strictEqual(createdPortfolio.title, newFolio.title);
  });

  // 5. Update Portfolio
  await test('Update Portfolio Content & Design', async () => {
    assert(createdPortfolio?.id, 'Requires created portfolio');
    const updatePayload = {
      ...createdPortfolio,
      title: 'Updated QA Architect Portfolio',
      hero: {
        ...createdPortfolio.hero,
        tagline: 'Updated tagline with sub-second automated test suites.',
      },
    };

    const res = await fetch(`${BASE_URL}/api/portfolios/${createdPortfolio.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatePayload),
    });
    assert.strictEqual(res.status, 200);
    const updated = await res.json();
    assert.strictEqual(updated.title, 'Updated QA Architect Portfolio');
    assert.strictEqual(updated.hero.tagline, 'Updated tagline with sub-second automated test suites.');
  });

  // 6. Public View & View Counter Increment
  await test('Public Route Retrieval & View Counter', async () => {
    assert(createdPortfolio?.slug, 'Requires slug');
    const res = await fetch(`${BASE_URL}/api/public/${createdPortfolio.slug}`);
    assert.strictEqual(res.status, 200);
    const publicData = await res.json();
    assert.strictEqual(publicData.id, createdPortfolio.id);
    assert.strictEqual(publicData.views, 1);
  });

  // 7. Visitor Contact Form Submission
  let testMessageId = null;
  await test('Public Contact Form Submission Pipeline', async () => {
    assert(createdPortfolio?.slug, 'Requires slug');
    const contactPayload = {
      senderName: 'David Recruiter',
      senderEmail: 'david@recruiting-firm.com',
      subject: 'Senior QA Architect Role',
      message: 'Hello Jordan, we have an exciting leadership opportunity for you!',
    };

    const res = await fetch(`${BASE_URL}/api/public/${createdPortfolio.slug}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactPayload),
    });
    assert.strictEqual(res.status, 201);
    const result = await res.json();
    assert.strictEqual(result.success, true);
    assert(result.data?.id);
    testMessageId = result.data.id;
  });

  // 8. Messages Inbox Retrieval & Read Status
  await test('Messages Inbox Verification & Mark Read', async () => {
    assert(createdPortfolio?.id, 'Requires portfolio ID');
    const res = await fetch(`${BASE_URL}/api/portfolios/${createdPortfolio.id}/messages`);
    assert.strictEqual(res.status, 200);
    const messages = await res.json();
    assert(messages.length >= 1);
    const targetMsg = messages.find((m) => m.id === testMessageId);
    assert(targetMsg, 'Created test message must exist in inbox');
    assert.strictEqual(targetMsg.read, false);

    // Mark as read
    const readRes = await fetch(`${BASE_URL}/api/messages/${testMessageId}/read`, {
      method: 'PUT',
    });
    assert.strictEqual(readRes.status, 200);
    const readData = await readRes.json();
    assert.strictEqual(readData.success, true);
  });

  // 9. AI Copywriting Enhancer
  await test('AI Copywriting Assistant Generation', async () => {
    const res = await fetch(`${BASE_URL}/api/ai/enhance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'bullet',
        prompt: 'improved test pipeline',
        context: { role: 'QA Lead' },
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert(data.enhancedText && data.enhancedText.length > 20);
  });

  // 10. Standalone Single-File HTML Exporter
  await test('Standalone HTML File Export Engine', async () => {
    assert(createdPortfolio?.id);
    const res = await fetch(`${BASE_URL}/api/export/html/${createdPortfolio.id}`);
    assert.strictEqual(res.status, 200);
    const htmlText = await res.text();
    assert(htmlText.includes('<!DOCTYPE html>'));
    assert(htmlText.includes('Jordan QA'));
    assert(htmlText.includes('Updated tagline with sub-second automated test suites.'));
    assert(htmlText.includes('terminal'));
  });

  // 11. Delete Created Portfolio Cleanup
  await test('Delete Portfolio & Cleanup', async () => {
    assert(createdPortfolio?.id);
    const res = await fetch(`${BASE_URL}/api/portfolios/${createdPortfolio.id}`, {
      method: 'DELETE',
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);

    // Verify 404 on deleted portfolio
    const verifyRes = await fetch(`${BASE_URL}/api/portfolios/${createdPortfolio.id}`);
    assert.strictEqual(verifyRes.status, 404);
  });

  // 12. Frontend SPA Serving Verification
  await test('Frontend Studio SPA Index Serving (HTTP 200)', async () => {
    const res = await fetch(`${BASE_URL}/`);
    assert.strictEqual(res.status, 200);
    const html = await res.text();
    assert(html.includes('<div id="root"></div>'));
    assert(html.includes('FolioCraft'));
  });

  // Summary
  console.log('\n========================================');
  console.log(`📊 Test Results: ${passed} Passed, ${failed} Failed`);
  console.log('========================================\n');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
