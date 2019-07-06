# watxt
A simple parser for Whatsapp logs built on Node.js
### Installation ###
```shell
npm i watxt
```
### Example ###
```javascript
const WaTXT = require('watxt');
const { join } = require('path');
const myMessages = new WaTXT(join(__dirname, 'chat.txt'), 5) // get first 5 messages from chat.txt

myMessages.on('message', ([date, time, author, msg]) => {
    console.log(`At ${time}, ${author} said: ${msg}`)
});
```
