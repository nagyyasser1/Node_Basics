import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/non-blocking", (req, res) => {
  res.status(200).send("This page is not blocking.");
});

app.get("/blocking", async (req, res) => {
  let counter = 0;
  for (let i = 0; i < 20_000_000; i++) {
    counter++;
  }
  res.status(200).send(`The result is ${counter}.`);
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
