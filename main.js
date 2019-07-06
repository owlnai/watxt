const { createInterface } = require('readline');
const { createReadStream } = require('fs');
const EventEmitter = require('events');

class LineReader extends EventEmitter {
    constructor(fileName, limit, lang) {
        super();
        this.fileName = fileName;
        this.limit = limit;
        this.rl = createInterface({
            input: createReadStream(this.fileName)
        });
        this.counter = 0;
        this.readLines();
    }

    parse(str) {
        return str.match(/((?:\d{1,2}\/){2}\d{2,4},?\s(\d{1,2}:\d{1,2}(?:\sAM|\sPM)?))\s-\s([\w\s]*):\s(.*)/).slice(1);
        /* TO-DO 
        /IMG-\d{8}-WA\d{4}\.(?:png|jpg|gif)/.test(msg)
        */
    }

    readLines() {
        this.rl.on('line', (l) => {
            if (this.counter == this.limit) {
                return this.rl.close();
            } this.counter++;
            return this.emit('message', this.parse(l));
        });
    }

}

module.exports = LineReader;