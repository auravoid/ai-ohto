const { SlashCommandBuilder } = require('discord.js');
const { defer } = require('../../global/embed-helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('coinflip')
		.setDescription('Flip an amazing coin!'),
	async execute(interaction) {
		await defer(interaction);

		// Make an array of the possible outcomes, heads and tails
		const face = [
			'Heads',
			'Tails',
		];

		// Pick a random outcome
		const chosenValue = Math.random() < 0.5 ? 0 : 1;
		// Send the outcome
		await interaction.editReply(face[chosenValue]);
	},
};
