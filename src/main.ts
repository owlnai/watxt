import { createInterface } from "readline";
import { EventEmitter } from "events";

/**
 * Represents a WhatsApp message.
 */
interface Message {
  date: string;
  time: string;
  author: string;
  content: string;
}

class WaTXT extends EventEmitter {
  constructor(private data: NodeJS.ReadableStream, private lines?: number) {
    super();
  }

  /**
   * Parses a message and returns a Message interface containing the information.
   * @param message A single message
   */
  async parseMessage(message: string): Promise<Message> {
    const [date, time, author, content]: RegExpMatchArray =
      message.match(
        /(.+)\s-\s([\S ]*):\s(.*\n(?:[^-]*)*|.*)$/
      ) || [];

    return {
      date,
      time,
      author,
      content,
    };
  }

  /** 
   * Emits an event containing each parsed message fed by the line reader
   */
  async readMessages() {
    const lineReader = createInterface({
      input: this.data,
      crlfDelay: Infinity,
    });
    let counter: number = 0;
    for await (const line of lineReader) {
      if (this.lines && counter >= this.lines) {
        lineReader.close();
        break;
      }
      this.emit("message", await this.parseMessage(line));
      counter++;
    }
  }

  // not used yet
  private get attachmentRegExp(): RegExp {
    return /IMG-\d{8}-WA\d{4}\.(?:png|jpg|gif)/;
  }
}

export default WaTXT;
