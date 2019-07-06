const WaTXT = require('../main');
const { join } = require('path');
const myMessages = new WaTXT(join(__dirname, 'chat.txt'), 5) // get first 5 messages from chat.txt

myMessages.on('message', ([date, time, author, msg]) => {
    console.log(`At ${time}, ${author} said: ${msg}`)
});

/**
    At 12:22 PM, John said: Hi Stacy
    At 12:22 PM, John said: :)
    At 2:59 AM, John said: How are you?
    At 2:59 AM, John said: Are u home?
    At 8:09 AM, Stacy said: Hi John
**/