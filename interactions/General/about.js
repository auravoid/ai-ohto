const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');
const { defer } = require('../../global/embed-helper');
const { prettyDate } = require('../../global/functions.js');

// An array of all the dependencies for the command
const dependencies = require('../../global/resources/deps.json');


module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('Get some details about the bot.'),
	async execute(interaction) {
		await defer(interaction);
		// Create the embed with the bot's info
		const embed = new EmbedBuilder()
			.setTitle('About Me')
			.setDescription(`This bot was made by **[auravoid#6669](https://auravoid.dev/)**
Need help? Join the [support server](https://discord.gg/Ycen3xRUJb)!
Concerns about privacy? Read the [privacy policy](https://auravoid.dev/privacy).
			
The character "Ai Ohto" is from the anime "[Wonder Egg Priority](https://wonder-egg-priority.com/)" produced by [CloverWorks](https://en.cloverworks.co.jp/).`)
			.setColor(process.env.EMBED_COLOR)
			.addFields(
				{
					name: 'Commit SHA',
					value: `\`${process.env.RAILWAY_GIT_COMMIT_SHA.substring(0, 7)}\``,
					inline: true,
				},
				{
					name: 'Library',
					value: `[Discord.js v${(require('discord.js').version)}](https://discord.js.org)`,
					inline: true,
				},
				{
					name: 'Language',
					value: 'JavaScript',
					inline: true,
				},
				{
					name: 'Hosting',
					value: '[Railway](https://railway.app)',
					inline: true,
				},
				{
					name: 'Uptime',
					value: `${prettyDate(process.uptime())}`,
					inline: true,
				},
				{
					name: 'Command Count',
					value: `${interaction.client.commands.size}`,
					inline: true,
				},
				{
					name: 'Dependencies',
					value: dependencies.map(dep => `[${dep.name}](${dep.url})`).join(', '),
					inline: false,
				},
				{
					name: 'Contributors',
					value: '[auravoid#6669](https://auravoid.dev/), [FloatingMilkshake#7777](https://floatingmilkshake.com/)',
					inline: false,
				},
				{
					name: 'Source Code',
					value: 'This is a closed source bot, so the source code is not available.',
					inline: false,
				},
			);

		// Send the embed
		await interaction.editReply({ embeds: [embed] });
	},
};
