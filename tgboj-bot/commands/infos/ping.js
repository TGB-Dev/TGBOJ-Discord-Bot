module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Thông tin',
    utilisation: '{prefix}ping',

    execute(client, message) {
        message.channel.send(`${client.emotes.success} - Ping : **${client.ws.ping}ms**. Beep boop, đây là TGBOt!`);
    },
};
