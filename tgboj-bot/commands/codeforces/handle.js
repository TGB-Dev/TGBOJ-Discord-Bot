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
                        title: `${profile.firstName} ${profile.lastName}`,
                        url: `https://codeforces.com/profile/${userhandle}`,
                        /*"footer": {
                            "icon_url": profile.avatar,
                            "text": userhandle
                        },*/
                          "thumbnail": {
                            "url": profile.titlePhoto
                        },
                        sth: arr = Array.from(["rank", "maxRank", "rating", "maxRating", "country", "city", "organization"], x => {return {value:profile[x]}}),
                        fields: [
                            {name: 'Rank', value: arr[0].value},
                            {name: 'Rank cao nhất', value:arr[1].value},
                            {name: 'Rating hiện tại', value: arr[2].value},
                            {name: 'Rating cao nhất', value: arr[3].value},
                            {name: 'Thành phố - Quốc gia', value: arr[5].value+` - `+arr[4].value},
                            {name: 'Tổ chức', value: arr[6].value},
                        ],
                        color: '0bb9ee',
                        //author: { name: },
                        timestamp: new Date(),
                    }});
                }
                else message.channel.send("Không tồn tại người dùng có tên như vậy");
            }).then(date=>console.log(data));
    }
}