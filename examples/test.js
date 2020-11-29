import WaTXT from "../dist/main.js";
import { join, resolve } from "path";
import { createReadStream } from "fs";

const myMessages = new WaTXT(createReadStream(join(resolve(), "examples", "chat.txt")), 5); // get first 5 messages from chat.txt

myMessages.readMessages();

myMessages.on("message", ([date, time, author, msg]) => {
  console.log(`At ${time}, ${author} said: ${msg}`);
});

