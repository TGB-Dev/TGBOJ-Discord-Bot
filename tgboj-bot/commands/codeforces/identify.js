const User = require('./models/cfuser.js');
const fetch = require('node-fetch');

/**
 * Random string
 * @return {string} A random string.
 */
function randomstring(){
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for ( var i = 0; i < 10; i++ ) 
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
   return result;
}

/**
 * Capitalize string
 * @param {string} s The input string.
 * @return {string} Capitalized string
 */
 function capitalize(s) {
    return s.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

module.exports = {
    name: 'identify',
    aliases: ['id'],
    category: 'Codeforces',
    utilisation: '{prefix}identify <handle Codeforces của bạn>',
    execute(client, message, args){
        if (!args[0]) return message.channel.send('Vui lòng nhập tên handle Codeforces');

        const id = message.author.id;
        const handle = args.shift();
        User.findOne({discordID: id}).then(data => {
            if (!data){
                User.findOne({codeforcesHandle: handle}).then(data => {
                    if (data){
                        message.channel.send(`${client.emotes.error} - Handle Codeforces này đã được liên kết với một tài khoản Discord khác`);
                    } else {
                        fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
                            .then((response)=>response.json())
                            .then((data)=>{
                                if (data.status === 'OK') {
                                    var countdown = 60;
                                    const key = randomstring();
                                    message.channel.send(`<@!${message.author.id}>`, {embed: {
                                        title: 'BẠN CÓ 60 GIÂY',
                                        description: `Vui lòng đổi firstname của bạn thành ${key} tại https://codeforces.com/settings/social`,
                                        footer: {text: client.config.discord.sauce},
                                        timestamp: new Date(),
                                    }});
                                    let verifying = setInterval(function () {
                                        countdown -= 5;
                                        fetch(`https://codeforces.com/api/user.info?handles=${handle}`)
                                            .then((response)=>response.json())
                                            .then((data)=>{
                                                const profile = data.result[0];
                                                if (profile.firstName == key) {
                                                    clearInterval(verifying);
                                                    const newuser = new User({discordID: id, codeforcesHandle: handle});
                                                    newuser.save(function (err, newuser) {
                                                        if (err) return console.error(err);
                                                        message.channel.send(`<@!${message.author.id}>,kết nối thành công`, {embed: {
                                                            title: profile.handle,
                                                            url: `https://codeforces.com/profile/${profile.handle}`,
                                                            thumbnail: {
                                                                'url': profile.titlePhoto,
                                                            },
                                                            description: (()=>{
                                                                let des = '';
                                                                if (profile.firstName && profile.lastName) des += profile.firstName + ' ' + profile.lastName;
                                                                else des += profile.handle;
                                                                if (profile.city) des += ', ' + profile.city;
                                                                if (profile.country) des += ', ' + profile.country;
                                                                if (profile.organization) des += '\nFrom ' + profile.organization;
                                                                return des;
                                                            })(),
                                                            footer: {text: client.config.discord.sauce},
                                                            fields: (()=>{
                                                                const res = [{name: '​', value: '​'}]; // Zero width character not
                                                                if (profile.rank) res.push({name: 'Rank hiện tại', value: capitalize(profile.rank), inline: true});
                                                                if (profile.maxRank) res.push({name: 'Rank cao nhất', value: capitalize(profile.maxRank), inline: true});
                                                                res.push({name: '​', value: '​'}); // Zero width character not
                                                                if (profile.rating) res.push({name: 'Rating hiện tại', value: profile.rating, inline: true});
                                                                if (profile.maxRating) res.push({name: 'Rating cao nhất', value: profile.maxRating, inline: true});
                                                                res.push({name: '​', value: '​'}); // Zero width character not
                                                                if (profile.organization) res.push({name: 'Tổ chức', value: profile.organization, inline: false});
                                                                return res;
                                                            })(),
                                                            color: ({
                                                                'newbie': '808080',
                                                                'pupil': '88cc22',
                                                                'apprentice': '008000',
                                                                'specialist': '03a89e',
                                                                'expert': '0000ff',
                                                                'candidate master': 'aa00aa',
                                                                'master': 'ff8c00',
                                                                'international master': 'ff8c00',
                                                                'grandmaster': 'ff0000',
                                                                'international grandmaster': 'ff0000',
                                                                'legendary grandmaster': 'ff0000',
                                                            })[profile.rank],
                                                            timestamp: new Date(),
                                                        }});
                                                    });
                                                }
                                            });
                                        if (countdown == 0) {
                                            clearInterval(verifying);
                                            message.channel.send(`<@!${message.author.id}>, xác nhận không thành công, vui lòng thử lại`)
                                        }
                                    }, 5000);
                                } else message.channel.send(`${client.emotes.error} - Không tồn tại Codeforces Handle như vậy`);
                            });    
                    }
                });
            } else message.channel.send(`${client.emotes.error} - Tài khoản Discord của bạn đã liên kết với một Handle, vui lòng ${client.config.discord.prefix}unidentify trước khi liên kết lại`);
        });
        /*
        User.exists({codeforcesHandle:'12344'}, function (err, doc) {
            if (err){
                console.log(err)
            } else {
                console.log("Result :", doc) // true
            }
        });*/
    }
}