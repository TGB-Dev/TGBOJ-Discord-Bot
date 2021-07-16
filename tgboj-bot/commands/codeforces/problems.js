const fetch = require('node-fetch');

/**
 * Random element from the array.
 * @param {Array} arr The input array.
 * @return {Element} Random element from the array.
 */
 function randomElement(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

module.exports = {
    name: 'problems',
    aliases: ['prob','pr','pb'],
    category: 'Codeforces',
    utilisation: ``+'`'+`tgb!problems`+'`'+` random , để lấy ngẫu nhiên một bài hoặc

                `+'`'+`tgb!problems`+'`'+` <tags> <rating bài tối thiểu> <rating bài tối đa> <số lượng bài cần lấy (tối đa 25)> 

                  Ví dụ: `+'`'+`tgb!problems`+'`'+` random, `+'`'+`tgb!problems`+'`'+` math greedy 1400 2100 5

                  Nhập lệnh: `+'`'+`tgb!tags`+'`'+` để xem tất cả các tags`,
    execute(client, message, args) {
        const type = args[0];
        if (type === 'random'){
            fetch(`https://codeforces.com/api/problemset.problems`)
                .then(response => response.json())
                .then((data)=>{
                    if (data.status === 'OK'){
                        const prob = randomElement(Array.from(data.result.problems));
                        message.channel.send({embed: {
                            description: `Link bài: https://codeforces.com/problemset/problem/${prob.contestId}/${prob.index}`,
                            title: `Tên bài: ${prob.name}`,
                            author: {name: `Bài tập ngẫu nhiên cho ${message.author.username}`},
                            footer: {text: client.config.discord.sauce},
                            fields: (()=>{
                                const res  = [{name: 'Tags', value: `||`+ prob.tags.join(', ')+`||`}];
                                if (prob.rating) res.unshift({name: 'Độ khó (rating)', value: prob.rating});
                                if (prob.type) res.unshift({name: 'Thể loại', value: prob.type});
                                return res;
                            })(),
                            color: '0bb9ee',
                            timestamp: new Date(),
                        }});
                    } else message.channel.send(`${client.emotes.error} - Đã có lỗi xảy ra, vui lòng kiểm tra và nhập lại`);
                });
        } else {
            const val = Array.from(args);
            const cnt = val.length;
            const maxRating = val[cnt-2];
            const minRating = val[cnt-3];
            var probcnt = val[cnt-1];
            if (probcnt < 1 || probcnt > 25) probcnt = 25;
            var query = '';
            for (var i = 0;i < cnt - 4; i++)
                query += val[i] + '&';
            query += val[cnt - 4];
            console.log(query);
            fetch(`https://codeforces.com/api/problemset.problems?tags=${query}`)
                .then(response => response.json())
                .then((data)=>{
                    if (data.status === 'OK'){
                        if (isNaN(val[cnt-1])||isNaN(val[cnt-2])||isNaN(val[cnt-3]))
                            return message.channel.send(`${client.emotes.error} - Ba tham số cuối phải là số và hợp lệ`);
                        const probs = Array.from(data.result.problems).filter((x) => x.rating<=maxRating && x.rating>=minRating);        
                        var out = [randomElement(probs)]; 
                        for (var i = 0; i < probcnt - 1; i++)
                            out.push(randomElement(probs));
                        out.sort((a, b) => {return a.rating - b.rating});
                        message.channel.send({embed: {
                            description: ``,
                            title: `${probcnt} bài tập theo tags cho ${message.author.username}`,
                            footer: {text: client.config.discord.sauce},
                            fields: (()=>{
                                const res = [];
                                for (x in out)
                                    res.push({name: `${out[x].name}, Rating: ${out[x].rating}`, value: `https://codeforces.com/problemset/problem/${out[x].contestId}/${out[x].index}`, inline: false}),console.log(x);
                                return res;
                            })(),
                            color: '0bb9ee',
                            timestamp: new Date(),
                        }});
                    } else message.channel.send(`${client.emotes.error} - Đã có lỗi xảy ra, vui lòng kiểm tra và nhập lại`);
                })
                .catch((error) => {
                    message.channel.send(`${client.emotes.error} - Đã có lỗi xảy ra, vui lòng kiểm tra và nhập lại`);
                });
        }
    },
};
