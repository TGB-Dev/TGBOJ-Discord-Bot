const fetch = require('node-fetch');
async function get() {
    return {
        
    } 
}

module.exports = {
    name: 'handle',
        execute(client, message, args) {
            if (!args[0]) return message.channel.send("Vui lòng nhập tên người dùng");
            const userhandle = args.shift();
            const {file} = fetch(`https://codeforces.com/api/user.info?handles=${userhandle}`).then(response=>response.json()).then(data=>console.log(data));
            //message.channel.send(file);
            //else message.channel.send("Không tồn tại người dùng có tên như vậy");
        }
}