const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');
// @todo: add a Twitter snowflake converter
const { idToTimestamp } = require('../../global/functions.js');
const { defer } = require('../../global/embed-helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('snowflake')
		.setDescription('Convert a snowflake ID to a date.')
		.addStringOption(option =>
			option.setName('id')
				.setDescription('The snowflake ID to convert.')
				.setRequired(true))
		.addStringOption(option =>
			option.setName('format')
				.setDescription('The format to display the date in.')
				.setRequired(false)
				.addChoices(
					{
						name: 'Short Date',
						value: 'short-date',
					},
					{
						name: 'Long Date',
						value: 'long-date',
					},
					{
						name: 'Short Time',
						value: 'short-time',
					},
					{
						name: 'Long Time',
						value: 'long-time',
					},
					{
						name: 'Short Datetime',
						value: 'short-datetime',
					},
					{
						name: 'Long Datetime',
						value: 'long-datetime',
					},
					{
						name: 'Relative',
						value: 'relative',
					},
				),
		),
	async execute(interaction) {
		await defer(interaction);
		// Get the snowflake ID from the interaction
		const snowflake = interaction.options.getString('id');
		// Get the format from the interaction
		const format = interaction.options.getString('format');

		// If the snowflake is not a number, return an error
		if (isNaN(snowflake)) {
			return interaction.editReply({
				content: 'That doesn\'t look like a snowflake. Snowflakes contain only numbers.',
				ephemeral: true,
			});
		}

		// If snowflake is too short, return an error
		if (snowflake < 4194304) {
			return interaction.editReply({
				content: 'That doesn\'t look like a snowflake. Snowflakes are much larger numbers.',
				ephemeral: true,
			});
		}

		// Create a variable for the date from the function above
		const date = idToTimestamp(snowflake, format ?? 'long-datetime');

		// Create a new embed and add the date
		const embed = new EmbedBuilder()
			.setTitle('Snowflake ID')
			.setDescription(`\`${snowflake}\` is ${date}.`)
			.setColor(0x00AE86);

		// Send the embed
		await interaction.editReply({ embeds: [embed] });
	},
};
