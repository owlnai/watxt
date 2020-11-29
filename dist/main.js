var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { createInterface } from "readline";
import { EventEmitter } from "events";
class WaTXT extends EventEmitter {
    constructor(data, lines) {
        super();
        this.data = data;
        this.lines = lines;
    }
    /**
     * Parses a message and returns a Message interface containing the information.
     * @param message A single message
     */
    parseMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const [date, time, author, content] = message.match(/(.+)\s-\s([\S ]*):\s(.*\n(?:[^-]*)*|.*)$/) || [];
            return {
                date,
                time,
                author,
                content,
            };
        });
    }
    /**
     * Emits an event containing each parsed message fed by the line reader
     */
    readMessages() {
        var e_1, _a;
        return __awaiter(this, void 0, void 0, function* () {
            const lineReader = createInterface({
                input: this.data,
                crlfDelay: Infinity,
            });
            let counter = 0;
            try {
                for (var lineReader_1 = __asyncValues(lineReader), lineReader_1_1; lineReader_1_1 = yield lineReader_1.next(), !lineReader_1_1.done;) {
                    const line = lineReader_1_1.value;
                    if (this.lines && counter >= this.lines) {
                        lineReader.close();
                        break;
                    }
                    this.emit("message", yield this.parseMessage(line));
                    counter++;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (lineReader_1_1 && !lineReader_1_1.done && (_a = lineReader_1.return)) yield _a.call(lineReader_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        });
    }
    // not used yet
    get attachmentRegExp() {
        return /IMG-\d{8}-WA\d{4}\.(?:png|jpg|gif)/;
    }
}
export default WaTXT;
