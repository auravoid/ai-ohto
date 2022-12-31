const { SlashCommandBuilder } = require('discord.js');
const uwuifier = require('uwuify');
const { defer } = require('../../global/embed-helper');
const uwu = new uwuifier();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('uwu')
		.setDescription('Makes your message UwU~')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The message to UwU')
				// Set the max length of the message to 256 because fuck you
				.setMaxLength(256)
				.setRequired(true)),
	async execute(interaction) {
		await defer(interaction);
		// Get the message and UwUify it.
		// That's it. That's the whole command.
		// I'm not even going to bother with an embed.
		// It's just a simple command.
		// Such a stupid, simple command.
		await interaction.editReply(uwu.uwuify(interaction.options.getString('message')));
	},
};
