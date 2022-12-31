const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');

// This is an array with strings that will explain guild flags
const guildData = require('../../global/resources/guild.json');
const { defer } = require('../../global/embed-helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Get this server\'s information.'),
	async execute(interaction) {
		await defer(interaction);
		// Set the guild as the guild the interaction was sent in
		const guild = interaction.guild;

		// Create a new embed and append the guild's information
		const embed = new EmbedBuilder()
			.setTitle(guild.name)
			.setThumbnail(guild.iconURL())
			.addFields(
				{
					name: 'Members',
					value: `Total: ${guild.memberCount.toString()}`,
					inline: true,
				},
				{
					name: 'Roles',
					value: guild.roles.cache.size.toString(),
					inline: true,
				},
				{
					name: 'Channels',
					value: guild.channels.cache.size.toString(),
					inline: true,
				},
				{
					name: 'Created At',
					value: guild.createdAt.toDateString(),
					inline: true,
				},
				{
					name: 'Boosts',
					value: guild.premiumSubscriptionCount.toString(),
					inline: true,
				},
				{
					name: 'Boost Tier',
					value: guildData.premiumTier[guild.premiumTier],
					inline: true,
				},
				{
					name: 'Verification Level',
					value: guildData.verificationLevel[guild.verificationLevel],
					inline: true,
				},
			)
			.setColor(process.env.EMBED_COLOR);

		// If guild has X, add it to the embed
		if (guild.description) {
			embed.setDescription(guild.description);
		}
		if (guild.bannerURL()) {
			embed.setImage(guild.bannerURL());
		}
		if (guild.splashURL()) {
			embed.setImage(guild.splashURL());
		}
		if (guild.discoverySplashURL()) {
			embed.setImage(guild.discoverySplashURL());
		}
		if (guild.vanityURLCode) {
			embed.addFields({
				name: 'Vanity URL',
				value: guild.vanityURLCode,
			}, true);
		}
		if (guild.rulesChannel) {
			embed.addFields({
				name: 'Rules Channel',
				value: `${guild.rulesChannel}`,
				inline: true,
			});
		}
		if (guild.preferredLocale) {
			embed.addFields({
				name: 'Preferred Locale',
				value: guild.preferredLocale,
				inline: true,
			});
		}

		// Send the embed
		await interaction.editReply({ embeds: [embed] }).catch(console.error);
	},
};
