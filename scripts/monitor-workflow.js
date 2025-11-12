#!/usr/bin/env node

const fetch = require('node-fetch');

const RUN_ID = process.argv[2] || '19308764569';
const API_URL = `https://api.github.com/repos/carlosmarcial/chatrag-landing/actions/runs/${RUN_ID}`;

async function monitorWorkflow() {
  console.log(`Monitoring workflow run: ${RUN_ID}\n`);

  for (let i = 1; i <= 60; i++) {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      const status = data.status;
      const conclusion = data.conclusion || 'running';

      process.stdout.write(`\r[${i}/60] Status: ${status.padEnd(12)} | Conclusion: ${conclusion.padEnd(10)}`);

      if (status === 'completed') {
        console.log('\n');
        if (conclusion === 'success') {
          console.log('✅ Workflow completed successfully!');
          process.exit(0);
        } else {
          console.log(`❌ Workflow failed with conclusion: ${conclusion}`);
          process.exit(1);
        }
      }

      await new Promise(resolve => setTimeout(resolve, 3000));
    } catch (error) {
      console.error('\nError:', error.message);
      process.exit(1);
    }
  }

  console.log('\n⏱️  Timeout: Workflow still running after 3 minutes');
}

monitorWorkflow();
