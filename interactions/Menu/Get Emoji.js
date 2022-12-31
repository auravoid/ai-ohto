const {
	EmbedBuilder,
	ContextMenuCommandBuilder,
	ApplicationCommandType,
} = require('discord.js');
const { defer } = require('../../global/embed-helper');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Get Emoji')
		.setType(ApplicationCommandType.Message),
	execute: async (interaction) => {
		await defer(interaction);
		const content = interaction.targetMessage.content;
		const emojis = [];
		const emojiRegex = /<a?:\w+:\d+>/g;
		const emoji = content.match(emojiRegex);
		if (!emoji) {
			return interaction.editReply({
				content: 'No emoji found',
				ephemeral: true,
			});
		}

		emoji.forEach((e) => {
			const emojiId = e.match(/\d+/g);
			const emojiName = e.match(/:\w+:/g);
			const emojiAnimated = e.match(/a:/g);
			emojis.push({
				id: emojiId[0],
				name: emojiName[0].replace(/:/g, ''),
				animated: !!emojiAnimated,
			});
		});

		// Function to make plural
		function pluralize(count, word) {
			return count === 1 ? word : `${word}s`;
		}

		// If there are more than 25 emojis, return an error
		if (emojis.length > 25) {
			return interaction.editReply({
				content: 'Too many emojis! Please select a message with less than 25 emojis.',
				ephemeral: true,
			});
		}

		const embed = new EmbedBuilder()
			.setTitle('Emoji')
			.setDescription(`I found ${emoji.length + pluralize(emoji.length, ' emoji')} in this message!`)
			.setColor(process.env.EMBED_COLOR);

		emojis.forEach((e) => {
			embed.addFields({
				name: e.name,
				value: `ID: \`${e.id}\`\nAnimated: \`${e.animated}\`\nLink: [Click Here](https://cdn.discordapp.com/emojis/${e.id}.${e.animated ? 'gif' : 'png'})`,
				inline: true,
			});
		});

		await interaction.editReply({ embeds: [embed] });
	},
};
