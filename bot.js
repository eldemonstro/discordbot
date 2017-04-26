var config;
const Discord = require("discord.js");

if (process.env.NODE_ENV != "production") {
    var config = require('./config.js');
}

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {
    if (msg.content === 'ping') {
        msg.reply('Pong!');
    } else if (msg.content === 'die') {
        msg.reply('Ded');
        console.log('Bot is dying');
        killClient();
    }
});

function killClient() {
    client.destroy();
}

var promise = client.login(config.token || process.env.token);

console.log(promise);