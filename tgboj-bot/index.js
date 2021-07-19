const fs = require('fs');
const discord = require('discord.js');
require('dotenv').config();
const client = new discord.Client({disableMentions: 'everyone'});
// const pref = 'tgb!';

client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.commands = new discord.Collection();

fs.readdirSync('./commands').forEach((dirs) => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter((files) => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(`Loading command ${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    }
});
const events = fs.readdirSync('./events').filter((file) => file.endsWith('.js'));
for (const file of events) {
    console.log(`Loading discord.js event ${file}`);
    const event = require(`./events/${file}`);
    client.on(file.split('.')[0], event.bind(null, client));
}

client.on('message', async (message) =>{
    if (message.author.bot) return;
    const text = message.content.toLowerCase();
    if (text === 'orz') {
        message.channel.send('orz');
    }
});
// Database (MongoDB)
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(()=>{
    console.log(`Database đã sống, kết nối với TGBOt`);
});

client.login(process.env.DISCORDBOT_TOKEN);
