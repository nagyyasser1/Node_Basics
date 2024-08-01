import fs from "fs";

/**
 * Readable Streams
 */
const readable = fs.createReadStream("./my-file.txt", { highWaterMark: 20 });

let chunckCount = 0;

readable.on("data", (chunk) => {
  if (chunckCount === 2) {
    readable.pause();
    setTimeout(() => {
      readable.resume();
    }, 3000);
  }

  console.log("New chunck:", chunk.toString());

  chunckCount++;
});

/**
 * Writable Streams
 */

const writable = fs.createWriteStream("./my-new-file.txt");

writable.write("Hello World!.");

writable.end("done!.");

/**
 * Duplex Streams
 */
