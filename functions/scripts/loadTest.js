/**
 * functions/scripts/loadTest.js
 * Item 19: Test Simultaneous Users (Concurrency & Load Test)
 * Simulates 20 concurrent simulated users hitting the backend Express API simultaneously.
 */

const http = require('http');
const { api } = require('../index');

const PORT = 8089;
const CONCURRENT_USERS = 20;
const REQUESTS_PER_USER = 5;
const TOTAL_REQUESTS = CONCURRENT_USERS * REQUESTS_PER_USER;

function startLocalServer() {
  return new Promise((resolve) => {
    const server = http.createServer(api);
    server.listen(PORT, () => {
      resolve(server);
    });
  });
}

function makeRequest(path) {
  return new Promise((resolve) => {
    const start = Date.now();
    const req = http.get(`http://localhost:${PORT}${path}`, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        const latency = Date.now() - start;
        resolve({ statusCode: res.statusCode, latency, success: res.statusCode === 200 });
      });
    });

    req.on('error', (err) => {
      const latency = Date.now() - start;
      resolve({ statusCode: 500, latency, success: false, error: err.message });
    });
  });
}

async function runLoadTest() {
  console.log(`\n======================================================`);
  console.log(`🚀 Starting Concurrency Load Test (Item 19)`);
  console.log(`Simulating ${CONCURRENT_USERS} simultaneous users (${TOTAL_REQUESTS} total requests)`);
  console.log(`======================================================\n`);

  const server = await startLocalServer();
  const overallStart = Date.now();
  const results = [];

  // Endpoints to test under load
  const testEndpoints = [
    '/health',
    '/api/discover/niches',
    '/api/discover/trending-audio',
    '/api/business/templates',
    '/api/university/curriculum'
  ];

  // Spawn 20 concurrent user worker batches
  const userWorkers = Array.from({ length: CONCURRENT_USERS }).map(async (_, userIndex) => {
    const userResults = [];
    for (let i = 0; i < REQUESTS_PER_USER; i++) {
      const endpoint = testEndpoints[(userIndex + i) % testEndpoints.length];
      const res = await makeRequest(endpoint);
      userResults.push(res);
    }
    return userResults;
  });

  const allWorkerResults = await Promise.all(userWorkers);
  const flattened = allWorkerResults.flat();
  const totalDurationMs = Date.now() - overallStart;

  server.close();

  // Statistics Calculation
  const successCount = flattened.filter(r => r.success).length;
  const failureCount = flattened.length - successCount;
  const latencies = flattened.map(r => r.latency);
  const minLatency = Math.min(...latencies);
  const maxLatency = Math.max(...latencies);
  const avgLatency = Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length);
  const rps = ((flattened.length / totalDurationMs) * 1000).toFixed(1);

  console.log(`📊 LOAD TEST RESULTS:`);
  console.log(`------------------------------------------------------`);
  console.log(`Total Requests:         ${flattened.length}`);
  console.log(`Successful (200 OK):    ${successCount} (${Math.round((successCount / flattened.length) * 100)}%)`);
  console.log(`Failed:                 ${failureCount}`);
  console.log(`Average Latency:        ${avgLatency} ms`);
  console.log(`Min Latency:            ${minLatency} ms`);
  console.log(`Max Latency:            ${maxLatency} ms`);
  console.log(`Total Duration:         ${totalDurationMs} ms`);
  console.log(`Throughput:             ${rps} requests/sec`);
  console.log(`------------------------------------------------------`);

  if (successCount === flattened.length) {
    console.log(`✅ CONCURRENCY TEST PASSED! All simultaneous users handled smoothly.`);
    process.exit(0);
  } else {
    console.error(`⚠️ Some requests failed under load.`);
    process.exit(1);
  }
}

if (require.main === module) {
  runLoadTest().catch(err => {
    console.error('Load test fatal error:', err);
    process.exit(1);
  });
}

module.exports = runLoadTest;
