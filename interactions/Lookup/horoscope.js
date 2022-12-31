// noinspection JSUnresolvedVariable

const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');
const got = require('got');
const { defer } = require('../../global/embed-helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('horoscope')
		.setDescription('Lookup your horoscope for the day.')
		.addStringOption(option =>
			option.setName('sign')
				.setDescription('The sign you want to lookup.')
				.addChoices(
					{
						name: 'Aries',
						value: 'aries',
					},
					{
						name: 'Taurus',
						value: 'taurus',
					},
					{
						name: 'Gemini',
						value: 'gemini',
					},
					{
						name: 'Cancer',
						value: 'cancer',
					},
					{
						name: 'Leo',
						value: 'leo',
					},
					{
						name: 'Virgo',
						value: 'virgo',
					},
					{
						name: 'Libra',
						value: 'libra',
					},
					{
						name: 'Scorpio',
						value: 'scorpio',
					},
					{
						name: 'Sagittarius',
						value: 'sagittarius',

					},
					{
						name: 'Capricorn',
						value: 'capricorn',
					},
					{
						name: 'Aquarius',
						value: 'aquarius',
					},
					{
						name: 'Pisces',
						value: 'pisces',
					},
				)
				.setRequired(true)),
	async execute(interaction) {
		await defer(interaction);
		// Fetch the sign to lookup
		const sign = interaction.options.get('sign').value;

		// Set the base URL for the Horoscope API
		let base = 'https://ohmanda.com/api/horoscope';

		// Fetch the horoscope data
		const horoscopeData = await got(base += `/${sign}`).json();

		// Make sign name title case
		const horoscopeName = sign.charAt(0).toUpperCase() + sign.slice(1);

		// Create a new embed
		const embed = new EmbedBuilder()
			.setTitle(`Horoscope for ${horoscopeName} for today!`)
			.setDescription(horoscopeData.horoscope)
			.setColor('#e083ce');

		// Send the embed
		await interaction.editReply({ embeds: [embed] });
	},
};
