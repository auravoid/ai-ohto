const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');
const { defer } = require('../../global/embed-helper');

const httpCodes = [100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300, 301, 302, 303, 304, 305, 306, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511];

module.exports = {
	data: new SlashCommandBuilder()
		.setName('httpcat')
		.setDescription('Get a random HTTP cat or look up a specific one!')
		.addIntegerOption(option =>
			option.setName('code')
				.setDescription('The HTTP status code to look up.')
				.setRequired(false)
				.setMinValue(100)
				.setMaxValue(511)),
	async execute(interaction) {
		await defer(interaction);
		const embed = new EmbedBuilder()
			.setColor('#2f3136');
		const code = interaction.options.getInteger('code');
		// If the user didn't provide a code, pick a random one
		if (!code) {
			const randomCode = httpCodes[Math.floor(Math.random() * httpCodes.length)];
			embed.setTitle(`HTTP ${randomCode}`);
			embed.setImage(`https://http.cat/${randomCode}`);
		}

		// If the user provided a code, make sure it's valid
		else if (!httpCodes.includes(code)) {
			embed.setTitle('Invalid HTTP status code!');
			embed.setDescription('Please provide a valid HTTP status code.');
		}

		// If the user provided a valid code, send the image
		else {
			embed.setTitle(`HTTP ${code}`);
			embed.setImage(`https://http.cat/${code}`);
		}

		await interaction.editReply({ embeds: [embed] });
	},
};
