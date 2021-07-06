const Discord = require("discord.js");	
require("dotenv").config();
const bot = new Discord.Client();
const pref = "tgb!";
bot.on('ready', function(){	  
    console.log("TGBOJ Discord Bot now is online");	
})	
bot.on("message", async message =>{
    if (message.author.bot) return;
    const text = message.content.toLowerCase();
    if (text === "ping"){
        message.channel.send("Xin chào, đây là TGBOt !");
    }
    if (text === "orz"){
        message.channel.send("orz");
    }
    console.log(text);
    //commands with prefix
    if (text.startsWith(pref)){
        const args = text.slice(pref.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if (command === "avatar" || command === "avt"){
            let member = message.mentions.users.first() || message.author
            let avatar = member.displayAvatarURL({dynamic: true, size: 1024})
            const embed = new Discord.MessageEmbed()
                .setTitle(`${member.username}'s avatar`)
                .setImage(avatar)
                .setColor("0bb9ee")
            message.channel.send(embed);
        }
        


        //help commands

    }
})
bot.login(process.env.DISCORDBOT_TOKEN);