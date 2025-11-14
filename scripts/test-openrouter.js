#!/usr/bin/env node

const fetch = require('node-fetch');

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

async function testOpenRouter() {
  console.log('Testing OpenRouter API key...\n');

  if (!OPENROUTER_API_KEY) {
    console.error('❌ OPENROUTER_API_KEY environment variable is not set');
    process.exit(1);
  }

  console.log('✓ API key found (length:', OPENROUTER_API_KEY.length, ')');
  console.log('✓ API key prefix:', OPENROUTER_API_KEY.substring(0, 15) + '...\n');

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://www.chatrag.ai',
        'X-Title': 'ChatRAG Blog Generator Test'
      },
      body: JSON.stringify({
        model: 'x-ai/grok-4',
        messages: [
          {
            role: 'user',
            content: 'Say "Hello, I am working!" and nothing else.'
          }
        ],
        temperature: 0.7
      })
    });

    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('\n❌ OpenRouter API Error:');
      console.error('Status:', response.status);
      console.error('Error:', errorText);
      process.exit(1);
    }

    const data = await response.json();
    console.log('\n✅ API call successful!');
    console.log('Response:', data.choices[0].message.content);
    console.log('\nThe API key is working correctly.');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
    process.exit(1);
  }
}

testOpenRouter();
