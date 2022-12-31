const {
	EmbedBuilder,
	ContextMenuCommandBuilder,
	ApplicationCommandType,
} = require('discord.js');
const userFlagsData = require('../../global/resources/user.json');
const {
	idToTimestamp,
	dateToTimestamp,
} = require('../../global/functions.js');
const {
	defer,
	setRequestedFrom,
} = require('../../global/embed-helper');

module.exports = {
	data: new ContextMenuCommandBuilder()
		.setName('Get User')
		.setType(ApplicationCommandType.User),
	execute: async (interaction) => {
		await defer(interaction);
		const target = interaction.targetUser;
		const userFetch = await target.fetch(true);

		const userInfoEmbed = new EmbedBuilder()
			.setColor(process.env.EMBED_COLOR)
			.setThumbnail(userFetch.displayAvatarURL({ dynamic: true }))
			.setFooter({
				text: setRequestedFrom(interaction),
				iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
			})
			.addFields(
				{
					name: 'Username',
					value: `\`${target.username}#${target.discriminator}\``,
					inline: true,
				},
				{
					name: 'ID',
					value: `\`${target.id}\``,
					inline: true,
				},
				{
					name: 'Created On',
					value: idToTimestamp(target.id, 'long-date'),
					inline: true,
				},
			);

		if (userFetch.flags.toArray().length > 0) {
			userInfoEmbed.addFields(
				{
					name: 'User Flags',
					value: (userFetch.flags.toArray().map(r => {
						return `${userFlagsData[r].name}`;
					})).join('\n '),
					inline: false,
				},
			);
		}

		// If user has a banner, add it to the embed
		if (userFetch.bannerURL()) {
			userInfoEmbed.setImage(userFetch.bannerURL({
				format: 'png',
				size: 2048,
			}));
		}

		// If user has an accent color, add it to the embed
		if (userFetch.accentColor) {
			userInfoEmbed.setColor(userFetch.accentColor);
		}

		// If the user is in the same guild as the interaction, add information about their guild status
		if (interaction.guild.members.cache.get(target.id)) {
			const member = interaction.guild.members.cache.get(target.id);
			userInfoEmbed.addFields(
				{
					name: 'Joined Server On',
					value: dateToTimestamp(member.joinedTimestamp, 'long-date'),
					inline: true,
				},
				{
					name: 'Nickname',
					value: member.nickname || 'None',
					inline: true,
				},
				{
					name: 'Roles',
					value: (member.roles.cache.size - 1).toString(),
					inline: true,
				},
			);
		}

		// If target is the bot, add information about the bot
		if (target.id === interaction.client.user.id) {
			userInfoEmbed.addFields(
				{
					name: 'Hey That\'s Me!',
					value: `I'm in ${interaction.client.guilds.cache.size} servers! Use </about:1016817282212700252> to get more information about me!`,
					inline: false,
				},
			);
		}

		// Send the embed
		await interaction.editReply({ embeds: [userInfoEmbed] });
	},
};
