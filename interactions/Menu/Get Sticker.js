const {
	EmbedBuilder,
	ContextMenuCommandBuilder,
	ApplicationCommandType,
} = require('discord.js');
const { defer } = require('../../global/embed-helper');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Get Sticker')
		.setType(ApplicationCommandType.Message),
	execute: async (interaction) => {
		await defer(interaction);
		// If the message doesn't have a sticker, return
		if (!interaction.targetMessage.stickers.first()) {
			return interaction.editReply({
				content: 'No sticker found',
				ephemeral: true,
			});
		}

		// Get the sticker
		const sticker = await interaction.targetMessage.stickers.first().fetch();

		// Set an array of what kind of sticker it is
		const stickerType = {
			1: 'Standard Discord Sticker',
			2: 'Custom Guild Sticker',
		};

		// Create the embed and add the information
		const embed = new EmbedBuilder()
			.setTitle(sticker.name)
			.setImage(sticker.url)
			.addFields({
				name: 'ID:',
				value: `\`${sticker.id}\``,
			},
			{
				name: 'Type:',
				value: `${stickerType[sticker.type]}`,
			})
			.setColor(process.env.EMBED_COLOR);

		// If sticker has a description, add it to the embed
		if (sticker.description) {
			embed.addFields({
				name: 'Description:',
				value: sticker.description,
			});
		}
		// If sticker has tags, add them to the embed
		if (sticker.tags) {
			embed.addFields({
				name: 'Tags:',
				value: sticker.tags,
			});
		}

		// Send the embed
		await interaction.editReply({ embeds: [embed] });

	},
};
