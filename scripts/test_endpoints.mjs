#!/usr/bin/env node

// Simple endpoint test runner for ChatRAG landing
// Usage:
//   BASE_URL=https://www.chatrag.ai node scripts/test_endpoints.mjs
// Optional env overrides:
//   PRO_ID, STARTER_ID
// Notes:
// - Uses fetch (Node 18+)

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const PRO_ID = process.env.PRO_ID || 'c9cb30b2-3c43-44fc-9070-19c9cc02a24d';
const STARTER_ID = process.env.STARTER_ID || '1fccb238-c09e-41fd-9875-d7eba1167467';

const green = (s) => `\x1b[32m${s}\x1b[0m`;
const red = (s) => `\x1b[31m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;

let passed = 0;
let failed = 0;

function pass(msg) {
  passed += 1;
  console.log(`${green('✓')} ${msg}`);
}
function fail(msg) {
  failed += 1;
  console.error(`${red('✗')} ${msg}`);
}

async function expectStatus(url, status = 200) {
  const res = await fetch(url, { redirect: 'manual' });
  if (res.status === status) {
    pass(`${url} -> ${status}`);
  } else {
    fail(`${url} -> expected ${status}, got ${res.status}`);
  }
}

async function testCheckoutJSON(productId) {
  const url = `${BASE_URL}/api/checkout?products=${encodeURIComponent(productId)}`;
  const res = await fetch(url, {
    headers: { Accept: 'application/json' },
    redirect: 'manual',
  });
  const text = await res.text();
  try {
    const data = JSON.parse(text);
    if (res.ok && data && typeof data.url === 'string' && data.url.startsWith('http')) {
      const mode = data.warning ? yellow('(fallback)') : green('(polar)');
      pass(`Checkout JSON for ${productId} returned url ${mode}`);
    } else {
      fail(`Checkout JSON for ${productId} did not return url. Status ${res.status}. Body: ${text}`);
    }
  } catch (e) {
    fail(`Checkout JSON for ${productId} returned non-JSON. Status ${res.status}. Body: ${text}`);
  }
}

async function testCheckoutRedirect(productId) {
  const url = `${BASE_URL}/api/checkout?products=${encodeURIComponent(productId)}`;
  const res = await fetch(url, {
    headers: { Accept: 'text/html' },
    redirect: 'manual',
  });
  const location = res.headers.get('location');
  if (res.status === 302 && location && /polar\.sh|buy\.polar\.sh/.test(location)) {
    pass(`Checkout redirect for ${productId} -> 302 to ${location}`);
  } else {
    fail(`Checkout redirect for ${productId} unexpected. Status ${res.status}, Location: ${location}`);
  }
}

async function run() {
  console.log(`Testing against ${BASE_URL}`);
  console.log('');

  // Core pages
  await expectStatus(`${BASE_URL}/`, 200);
  await expectStatus(`${BASE_URL}/docs`, 200);
  await expectStatus(`${BASE_URL}/success`, 200);

  // Health
  await expectStatus(`${BASE_URL}/api/payments/health`, 200);

  // Checkout (JSON + redirect) for both products
  await testCheckoutJSON(PRO_ID);
  await testCheckoutRedirect(PRO_ID);

  await testCheckoutJSON(STARTER_ID);
  await testCheckoutRedirect(STARTER_ID);

  // Negative: missing products
  const missing = await fetch(`${BASE_URL}/api/checkout`, { headers: { Accept: 'application/json' } });
  if (missing.status === 400) {
    pass('Checkout without products -> 400');
  } else {
    fail(`Checkout without products expected 400, got ${missing.status}`);
  }

  console.log('');
  console.log(`Passed: ${passed}, Failed: ${failed}`);
  if (failed > 0) process.exit(1);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});