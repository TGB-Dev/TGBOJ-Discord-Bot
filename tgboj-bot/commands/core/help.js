module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}help <câu lệnh>',

    execute(client, message, args) {
        if (!args[0]) {
            const infos = message.client.commands.filter((x) => x.category == 'Thông tin').map((x) => '`' + x.name + '`').join(', ');
            const codeforces = message.client.commands.filter((x) => x.category == 'Codeforces').map((x) => '`' + x.name + '`').join(', ');

            message.channel.send({
                embed: {
                    color: '0bb9ee',
                    author: {name: 'Hướng dẫn'},
                    footer: {text: client.config.discord.sauce},
                    fields: [
                        {name: 'Thông tin', value: infos},
                        {name: 'Codeforces', value: codeforces},
                    ],
                    timestamp: new Date(),
                    description: `Đây là các câu lệnh chung, nhập `+'`'+`${client.config.discord.prefix}help`+'`'+` (câu lệnh cần xem) để xem chi tiết câu lệnh ấy. Ví dụ: `+'`'+`${client.config.discord.prefix}help help`+'`'+`.`,
                },
            });
        } else {
            const command = message.client.commands.get(args.join(' ').toLowerCase()) || message.client.commands.find((x) => x.aliases && x.aliases.includes(args.join(' ').toLowerCase()));
            if (!command) return message.channel.send(`${client.emotes.error} - Câu lệnh không tồn tại!`);
            message.channel.send({
                embed: {
                    color: '0bb9ee',
                    author: {name: 'Hướng dẫn'},
                    footer: {text: client.config.discord.sauce},
                    fields: [
                        {name: 'Tên', value: command.name, inline: true},
                        {name: 'Danh mục', value: command.category, inline: true},
                        {name: 'Từ khóa tương tự', value: command.aliases<1?'Không có':command.aliases.join(', '), inline: true},
                        {name: 'Cú pháp', value: command.utilisation.replace(`{prefix}`, client.config.discord.prefix), inline: true},
                    ],
                    timestamp: new Date(),
                    description: 'Cách sử dụng câu lệnh. \nTham số cần thiết `[]`, tham số không bắt buộc `<>`.',
                },
            });
        }
    },
};
