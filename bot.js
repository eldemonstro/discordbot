const Discord = require("discord.js");

var botAdmin = {
    name: process.env.BOT_ADMIN_NAME,
    id: process.env.BOT_ADMIN_ID
};

var token = process.env.TOKEN;

const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`);
});

client.on('message', msg => {

    var user = {
        name: msg.author.username,
        id: msg.author.id
    }

    var msgContent = msg.content;

    if (msgContent.toLocaleLowerCase() === 'ping') {
        console.log(msg);
        msg.reply('Pong!');
    } else if (msgContent.toLocaleLowerCase() === 'die') {
        validateUser(user, function () {
            msg.reply('Ded');
            console.log('Bot is dying');
            killClient();
        });
    } else if (msgContent.toLocaleLowerCase() === 'flip a coin') {
        flipACoin(function(coinSide){
            if(coinSide) {
                msg.reply('You got tails');
            } else {
                msg.reply('You got head');
            }
        });
    }
});

function flipACoin(callback){
    var r = Math.floor((Math.random() * 100) + 1);
    callback(r % 2 == 0);
}

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
        console.log(process.env.MENSAGEM);
    })
    .catch(function (err) {
        console.log(err);
    });