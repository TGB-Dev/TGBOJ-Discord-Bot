const Discord = require("discord.js");	
require("dotenv").config();
const bot = new Discord.Client();
const pref = "tgb!";
bot.on('ready', function(){	  
    console.log("TGBOJ Discord Bot is now online");	
})	
bot.on("message", async message =>{
    if (message.author.bot) return;
    const text = message.content.toLowerCase();
    if (text === "ping"){
        message.channel.send(`Xin chào, đây là TGBOt!
> prefix là *`+pref+'*');
    }
    if (text === "orz"){
        message.channel.send("orz");
    }
    console.log(text);
    //commands with prefix
    if (text.startsWith(pref)){
        const args = text.slice(pref.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        switch (command){
            case "avatar":
            case "avt":
                let member = message.mentions.users.first() || message.author
                let avatar = member.displayAvatarURL({dynamic: true, size: 1024})
                const embed = new Discord.MessageEmbed()
                    .setTitle(`${member.username}'s avatar`)
                    .setImage(avatar)
                    .setColor("0bb9ee")
                message.channel.send(embed);
                break;
        }
        

        //help commands
        if (command === "help"){
            message.channel.send(String.fromCharCode(96,96,96)+'ini'+`
[Lệnh không cần prefix] 
- ping: để ping bot

[Lệnh cần prefix(`+pref+`)]
- help: danh sách lệnh
- avatar/avt: xem ảnh đại diện của người được tag hoặc bản thân`+String.fromCharCode(96,96,96))
        }
    }
})
bot.login(process.env.DISCORDBOT_TOKEN);