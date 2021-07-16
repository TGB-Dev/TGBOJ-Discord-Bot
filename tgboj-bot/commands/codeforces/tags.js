module.exports = {
    name: 'tags',
    aliases: [],
    category: 'Codeforces',
    utilisation: '{prefix}tags',
    execute(client, message){
        message.channel.send('Những tags hiện có trên Codeforces: \n`implementation`, `math`, `greedy`, `dp`, `data+structures`, `brute+force`, `constructive+algorithms`, `graphs`, `sortings`, `binary+search`, `dfs+and+similar`, `trees`, `strings`, `number+theory`, `combinatorics`, `*special`, `geometry`, `bitmasks`, `two+pointers`, `dsu`, `shortest+paths`, `probabilities`, `divide+and+conquer`, `hashing`, `games`, `flows`, `interactive`, `matrices`, `string+suffix+structures`, `fft`, `graph+matchings`, `ternary+search`, `expression+parsing`, `meet-in-the-middle`, `2-sat`, `chinese+remainder+theorem`, `schedules`\n\n *Lưu ý: những tag có khoảng cách như `brute force` khi dùng lệnh phải thay dấu cách thành dấu `+`: `brute+force`*');
    }
};