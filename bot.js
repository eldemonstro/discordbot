var config;
const Discord = require("discord.js");

if (process.env.NODE_ENV != "production") {
    var config = require('./config.js');
}

var botAdmin = {
    name: config.bot_admin_name || process.env.bot_admin_name,
    id: config.bot_admin_id || process.env.bot_admin_id
};

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {

    var user = {
        name: msg.author.username,
        id: msg.author.id
    }

    if (msg.content === 'ping') {
        console.log(msg);
        msg.reply('Pong!');
    } else if (msg.content === 'die') {
        validateUser(user, function () {
            msg.reply('Ded');
            console.log('Bot is dying');
            killClient();
        });
    }
});

function validateUser(user, callback) {
    if (user.name == botAdmin.name && user.id == botAdmin.id) {
        callback();
    } else {
        return;
    }
}

function killClient() {
    client.destroy();
}

client.login(config.token || process.env.token)
    .then(function (ret) {
        console.log("Bot logged suceffuly");
    })
    .catch(function (err) {
        console.log(err);
    });