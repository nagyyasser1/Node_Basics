const { parentPort, workerData } = require("worker_threads");

// Function to calculate Fibonacci number
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const { num } = workerData;
const result = fibonacci(num);

parentPort.postMessage(result);
