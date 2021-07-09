const fetch = require('node-fetch');
module.exports = {
    name: 'handle',
    execute(client, message, args){
        if (!args[0]) return message.channel.send("Vui lòng nhập tên người dùng");
        const userhandle = args.shift();
        const {file} = fetch(`https://codeforces.com/api/user.info?handles=${userhandle}`)
            .then(response=>response.json())
            .then(data=>{
                if (data.status === "OK") {
                    profile = data.result[0];
                    message.channel.send("Thông tin người dùng", {embed: {
                        title: `${profile.firstName} ${profile.lastName}`,
                        url: `https://codeforces.com/profile/${userhandle}`,
                        "footer": {
                            "icon_url": profile.avatar,
                            "text": userhandle
                        },
                          "thumbnail": {
                            "url": profile.titlePhoto
                        },
                        fields: Array.from(["rank", "maxRank", "rating", "maxRating", "country", "city", "organization"], x => {
                            return {"name": x, "value": profile[x]}
                        }),
                        color: '0bb9ee',
                        author: { name: userhandle },
                        timestamp: new Date(),
                    }});
                }
                else message.channel.send("Không tồn tại người dùng có tên như vậy");
            });
    }
}