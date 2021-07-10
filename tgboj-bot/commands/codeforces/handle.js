const fetch = require('node-fetch');

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
    utilisation: '{prefix}handle [tên người dùng]',
    execute(client, message, args) {
        if (!args[0]) return message.channel.send('Vui lòng nhập tên người dùng');
        const userhandle = args.shift();
        fetch(`https://codeforces.com/api/user.info?handles=${userhandle}`)
            .then((response)=>response.json())
            .then((data)=>{
                if (data.status === 'OK') {
                    const profile = data.result[0];
                    message.channel.send('```ini\n'+'[Thông tin người dùng Codeforces]'+'```', {embed: {
                        title: userhandle,
                        url: `https://codeforces.com/profile/${userhandle}`,
                        thumbnail: {
                            'url': profile.titlePhoto,
                        },
                        description: (()=>{
                            let des = '';
                            if (profile.firstName && profile.lastName) des += profile.firstName + ' ' + profile.lastName;
                            else des += userhandle;
                            if (profile.city) des += ', ' + profile.city;
                            if (profile.country) des += ', ' + profile.country;
                            if (profile.organization) des += '\nFrom ' + profile.organization;
                            return des;
                        })(),
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
                } else message.channel.send('Không tồn tại người dùng có tên như vậy');
            });
    },
};
