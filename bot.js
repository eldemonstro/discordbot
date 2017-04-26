const Discord = require("discord.js");

var botAdmin = {
    name: process.env.bot_admin_name,
    id: process.env.bot_admin_id
};

var token = process.env.token;

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

client.login(token)
    .then(function (ret) {
        console.log("Bot logged suceffuly");
        console.log(process.env.message);
    })
    .catch(function (err) {
        console.log(err);
    });

console.log(token);