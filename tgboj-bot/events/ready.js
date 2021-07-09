module.exports = async (client) => {
    console.log(`${client.user.username} đã sống.`);
    client.user.setActivity(client.config.discord.activity,{type:'WATCHING'});
};