const fetch = require('node-fetch');
module.exports = {
    name: 'handle',
    aliases: [],
    category: 'Codeforces',
    utilisation: '{prefix}handle [tên người dùng]',
    execute(client, message, args){
        if (!args[0]) return message.channel.send("Vui lòng nhập tên người dùng");
        const userhandle = args.shift();
        const {file} = fetch(`https://codeforces.com/api/user.info?handles=${userhandle}`)
            .then(response=>response.json())
            .then(data=>{
                if (data.status === "OK") {
                    profile = data.result[0];
                    message.channel.send('```ini\n'+"[Thông tin người dùng Codeforces]"+'```', {embed: {
                        title: `${profile.handle}`,
                        url: `https://codeforces.com/profile/${userhandle}`,
                        /*"footer": {
                            "icon_url": profile.avatar,
                            "text": userhandle
                        },*/
                          "thumbnail": {
                            "url": profile.titlePhoto
                        },
                        sth: arr = Array.from(["rank", "maxRank", "rating", "maxRating", "organization"], x => {return {value:profile[x]}}),
                        fields: [
                            {name: 'Rank hiện tại', value: arr[0].value},
                            {name: 'Rank cao nhất', value:arr[1].value},
                            {name: 'Rating hiện tại', value: arr[2].value},
                            {name: 'Rating cao nhất', value: arr[3].value},
                            //{name: 'Tổ chức', value: arr[4].value},
                        ],
                        color: '0bb9ee',
                        //author: { name: },
                        timestamp: new Date(),
                    }});
                }
                else message.channel.send("Không tồn tại người dùng có tên như vậy");
            })
    }
}