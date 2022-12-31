const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');
const guildData = require('../../global/resources/guild.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('invite')
		.setDescription('Lookup an invite code')
		.addStringOption(option =>
			option.setName('code')
				.setDescription('The invite code to lookup')
				.setRequired(true)),
	async execute(interaction) {
		// Get the invite code from the interaction
		const code = interaction.options.getString('code');

		// Fetch the invite
		const invite = await interaction.client.fetchInvite(code, {
			force: true,
			cache: false,
			withCounts: true,
		}).catch(error => {
			// If the invite is invalid, return an error message
			return interaction.reply({
				content: `There was an error fetching the invite: ${error.message}`,
				ephemeral: true,
			});
		});

		// If there is no invite, return an error message
		if (!invite.guild) return;

		// Create the embed for the invite
		const embed = new EmbedBuilder()
			.setTitle(`Invite for ${invite.guild.name}`)
			.setThumbnail(invite.guild.iconURL())
			.setColor(process.env.EMBED_COLOR);

		// If the guild has X, add X to the embed
		if (invite.guild.description) embed.setDescription(invite.guild.description);
		if (invite.guild.premiumSubscriptionCount) {
			embed.addFields(
				{
					name: 'Boosts',
					value: invite.guild.premiumSubscriptionCount.toString(),
					inline: true,
				},
			);
		}
		if (invite.presenceCount) {
			embed.addFields(
				{
					name: 'Online',
					value: invite.presenceCount.toString(),
					inline: true,
				},
			);
		}

		if (invite.memberCount) {
			embed.addFields(
				{
					name: 'Members',
					value: invite.memberCount.toString(),
					inline: true,
				},
			);
		}

		embed.addFields(
			{
				name: 'Invite',
				value: `[Click here to join](${invite.url})`,
				inline: true,
			},
		);

		if (invite.guild.verificationLevel) {
			embed.addFields(
				{
					name: 'Verification Level',
					value: guildData.verificationLevel[invite.guild.verificationLevel],
					inline: true,
				},
			);
		}
		if (invite.guild.vanityURLCode) {
			embed.addFields(
				{
					name: 'Vanity URL',
					value: `\`${invite.guild.vanityURLCode}\``,
					inline: true,
				},
			);
		}
		if (invite.guild.banner) {
			embed.setImage(invite.guild.bannerURL({ size: 1024 }));
		}

		// Send the embed
		await interaction.reply({ embeds: [embed] });
	},
};
