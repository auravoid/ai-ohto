const WeebyAPI = require('weeby-js');
const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');
const { defer } = require('../../global/embed-helper');
const weeby = new WeebyAPI(process.env.WEEBYAPI_KEY);

module.exports = {
	data: new SlashCommandBuilder()
		.setName('interact')
		.setDescription(
			'Interact with another user using a variety of different interactions.',
		)
		.addStringOption((option) =>
			option
				.setName('type')
				.setDescription('Which flag would you like to apply')
				.addChoices(
					{
						name: 'Cuddle',
						value: 'cuddle',
					},
					{
						name: 'Dance',
						value: 'dance',
					},
					{
						name: 'High Five',
						value: 'highfive',
					},
					{
						name: 'Hug',
						value: 'hug',
					},
					{
						name: 'Kiss',
						value: 'kiss',
					},
					{
						name: 'Pat',
						value: 'pat',
					},
					{
						name: 'Poke',
						value: 'poke',
					},
					{
						name: 'Punch',
						value: 'punch',
					},
					{
						name: 'Slap',
						value: 'cuddle',
					},
				)
				.setRequired(true),
		)
		.addUserOption((option) =>
			option
				.setName('user')
				.setDescription('User you want to interact with')
				.setRequired(true),
		),

	async execute(interaction) {
		await defer(interaction);
		// Get the type of interaction and user to interact with
		const target = interaction.options.getUser('user');
		const type = interaction.options.getString('type');

		// Fetch type of interaction from Weeby API
		const imgUrl = await weeby.gif.fetch(type);

		// List of types that require a different embed title
		const intDesc = {
			'cuddle': `<@${target.id}> got cuddles from <@${interaction.user.id}>`,
			'dance': `<@${interaction.user.id}> is dancing with <@${target.id}>`,
			'highfive': `<@${interaction.user.id}> high fives <@${target.id}>`,
			'hug': `<@${interaction.user.id}> gave a hug to <@${target.id}>`,
			'kiss': `<@${target.id}> got a kiss from <@${interaction.user.id}>`,
			'pat': `<@${interaction.user.id}> pats <@${target.id}>`,
			'poke': `<@${target.id}> got booped by <@${interaction.user.id}>`,
			'punch': `<@${interaction.user.id}> punches <@${target.id}>`,
			'slap': `<@${interaction.user.id}> slaps <@${target.id}>`,
		};

		// Create the embed
		const response = new EmbedBuilder()
			.setDescription(intDesc[type])
			.setImage(imgUrl)
			.setColor(process.env.EMBED_COLOR);

		// Send the embed
		await interaction.editReply({ embeds: [response] });
	},
};
