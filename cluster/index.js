import express from "express";

const PORT = process.env.PORT || 3000;
const app = express();

app.get("/heavy", (req, res) => {
  let total = 0;
  for (let i = 0; i < 50_000_000; i++) {
    total++;
  }
  res.status(200).send(`The result of cpu intensive task is: ${total}`);
});

app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
  console.log(`worker pid=${process.pid}`);
});
