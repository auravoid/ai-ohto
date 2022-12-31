const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');
const {
	defer,
} = require('../../global/embed-helper.js');
const got = require('got');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('chat')
		.setDescription(
			'Send messages into the chat!',
		)
		.addStringOption((option) =>
			option
				.setName('type')
				.setDescription('What would you like to be said?')
				.addChoices(
					{
						name: 'Joke',
						value: 'joke',
					},
					{
						name: 'Pickup Line',
						value: 'pickup',
					},
					{
						name: 'Roast',
						value: 'roast',
					},
					{
						name: 'Toast',
						value: 'toast',
					},
					{
						name: 'Topic',
						value: 'topic',
					},
				)
				.setRequired(true),
		),
	async execute(interaction) {
		await defer(interaction);
		// Get the type of message
		const type = interaction.options.getString('type');

		// Fetch JSON of messages
		const { body } = await got('https://api.auravoid.dev/fun/' + type);

		// Create the embed
		const response = new EmbedBuilder()
			.setColor('#2f3136')
			.setDescription(JSON.parse(body).data);

		// Send the embed
		await interaction.editReply({ embeds: [response] });

	},
};
