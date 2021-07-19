const fetch = require('node-fetch');
const User = require('./models/cfuser.js');

/**
 * Capitalize string
 * @param {string} s The input string.
 * @return {string} Capitalized string
 */
function capitalize(s) {
    return s.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
}

module.exports = {
    name: 'handle',
    aliases: [],
    category: 'Codeforces',
    utilisation: '{prefix}handle [tên người dùng Codeforces/người dùng Discord]',
    execute(client, message, args) {
        if (!args[0]) {
            const id = message.author.id;
            User.findOne({discordID: `${id}`}).
                then((data) => {
                    if (data) {
                        User.find({discordID: `${id}`})
                            .then((data)=>{
                                if (data) {
                                    fetch(`https://codeforces.com/api/user.info?handles=${data[0].codeforcesHandle}`)
                                        .then((response)=>response.json())
                                        .then((data)=>{
                                            if (data.status === 'OK') {
                                                const profile = data.result[0];
                                                message.channel.send('```ini\n'+'[Thông tin người dùng Codeforces]'+'```', {embed: {
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
                                            } else message.channel.send(`${client.emotes.error} - Không tồn tại Codeforces Handle như vậy`);
                                        });
                                }
                            });
                    } else message.channel.send(`${client.emotes.error} - Bạn chưa liên kết với handle Codeforces, vui lòng ${client.config.discord.prefix}identify`);
                });
        } else {
            const userhandle = args.shift();
            fetch(`https://codeforces.com/api/user.info?handles=${userhandle}`)
                .then((response)=>response.json())
                .then((data)=>{
                    if (data.status === 'OK') {
                        const profile = data.result[0];
                        message.channel.send('```ini\n'+'[Thông tin người dùng Codeforces]'+'```', {embed: {
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
                    } else message.channel.send(`${client.emotes.error} - Không tồn tại Codeforces Handle như vậy`);
                });
        }
    },
};
