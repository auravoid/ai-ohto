const { SlashCommandBuilder } = require('discord.js');
const { defer } = require('../../global/embed-helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('math')
		.setDescription('Do some math with the bot!')
		.addStringOption(option =>
			option.setName('equation')
				.setDescription('The equation to solve. [Use +, -, *, /, ^, and parentheses]')
				.setRequired(true)),
	execute: async function(interaction) {
		await defer(interaction);

		// Get the equation from the interaction
		let equation = interaction.options.getString('equation');

		// Set a variable to store the result
		let result;

		// Replace all instances of x with *
		if (equation.includes('x')) {
			equation = equation.replace(/x/g, '*');
		}

		// Try to evaluate the equation
		try {
			equation = equation.replace((/[^.\d\-+=()/*x^]/g), '');

			// Set the result to the evaluated equation
			result = eval(equation);
		}
		catch {
			// If there is an error, set the result to an error message
			return interaction.editReply('Invalid equation!');
		}

		// Send the result
		await interaction.editReply(`Result: ${result}`);
	},
};
