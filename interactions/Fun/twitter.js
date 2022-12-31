const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');
const { defer } = require('../../global/embed-helper');
const { prettyNumber } = require('../../global/functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('twitter')
		.setDescription('Create a fake Twitter embed!')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The message of the tweet. (Use \\n for new lines)')
				.setRequired(true)
				.setMaxLength(280))
		.addStringOption(option =>
			option.setName('image')
				.setDescription('The image for the tweet.')),
	async execute(interaction) {
		await defer(interaction);
		// Make username the author's username in the server, if they have one
		const username = interaction.member.nickname || interaction.user.username;
		let message = interaction.options.getString('message');
		const image = interaction.options.getString('image');
		const likes = Math.floor(Math.random() * 10000);

		// Make sure media is a valid image
		if (image) {
			const mediaType = image.split('.').pop();
			if (!['png', 'jpg', 'jpeg', 'gif'].includes(mediaType)) {
				return interaction.editReply('Please provide a valid image.');
			}
		}

		// If message has '\n', replace it with a new line
		message = message.replace(/\\n/g, '\n');

		// If message has a link, make it a hyperlink
		if (message.includes('http')) {
			const link = message.match(/http\S+/g);
			message = message.replace(link, `[${link}](${link})`);
		}

		const embed = new EmbedBuilder()
			.setColor('#1DA1F2')
			.addFields({
				name: 'Likes',
				value: prettyNumber(likes),
			})
			.setFooter({
				text: 'Twitter',
				iconUrl: 'https://cdn.auravoid.dev/images/bot/twitter.png',
			})
			.setAuthor({
				name: `${username} (@${interaction.user.username})`,
				iconURL: interaction.user.avatarURL(),
			})
			.setImage(image)
			.setDescription(message)
			.setTimestamp();

		await interaction.editReply({ embeds: [embed] });
	},
};
