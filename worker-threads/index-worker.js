import express from "express";
import { Worker } from "worker_threads";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is not blocking.");
});

app.get("/blocking", async (req, res) => {
  const worker = new Worker("./worker.js");

  worker.on("message", (data) => {
    res.status(200).send(`The result is ${data}.`);
  });

  worker.on("error", (error) => {
    res.status(400).send(`An error occured ${error}`);
  });
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
