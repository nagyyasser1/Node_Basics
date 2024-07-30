import express from "express";
import { Worker } from "worker_threads";

const app = express();
const port = 3000;

// Function to run the worker thread
function runWorker(data) {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker-fb.js", { workerData: data });

    worker.on("message", resolve);
    worker.on("error", reject);
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}

// Endpoint to calculate Fibonacci number
app.get("/fibonacci/:num", async (req, res) => {
  const num = parseInt(req.params.num, 10);

  if (isNaN(num)) {
    return res.status(400).json({ error: "Invalid number" });
  }

  try {
    const result = await runWorker({ num });
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
