const discord = require("discord.js");	
module.exports = {
    name: 'avatar',
    aliases: ['avt'],
    category: 'Thông tin',
    utilisation: '{prefix}avatar <người dùng>',
    
    execute(client,message){
        let member = message.mentions.users.first() || message.author
        let avatar = member.displayAvatarURL({dynamic: true, size: 1024})
        const embed = new discord.MessageEmbed()
            .setTitle(`${member.username}'s avatar`)
            .setImage(avatar)
            .setColor("0bb9ee")
        message.channel.send(embed);
    }
}