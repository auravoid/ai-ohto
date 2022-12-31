// noinspection JSUnresolvedVariable

const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');
const got = require('got');
const { defer } = require('../../global/embed-helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('minecraft')
		.setDescription('Minecraft command group')
		.addSubcommand(subcommand =>
			subcommand
				.setName('skin')
				.setDescription('Get a Minecraft skin')
				.addStringOption(option =>
					option.setName('username')
						.setDescription('The username of the Minecraft player')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('uuid')
				.setDescription('Get a Minecraft UUID')
				.addStringOption(option =>
					option.setName('username')
						.setDescription('The username of the Minecraft player')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('server')
				.setDescription('Get info about a Minecraft server')
				.addStringOption(option =>
					option.setName('ip')
						.setDescription('The IP of the Minecraft server')
						.setRequired(true))
				.addIntegerOption(option =>
					option.setName('port')
						.setDescription('The port of the Minecraft server (default: 25565)')
						.setMinValue(1)
						.setMaxValue(65535)
						.setRequired(false))),
	async execute(interaction) {
		await defer(interaction);
		// Get options and subcommand
		const subcommand = interaction.options.getSubcommand();
		const username = interaction.options.getString('username');
		const ip = interaction.options.getString('ip');
		const port = interaction.options.getInteger('port') || 25565;

		// Create the embed
		const embed = new EmbedBuilder()
			.setColor('#3b8526');

		// Switch case the subcommands
		switch (subcommand) {
		case 'skin':
			// Fetch skin from MC Heads
			embed
				.setTitle(`Skin for ${username}`)
				.setImage('https://mc-heads.net/body/' + username);
			break;
		case 'server':
			// Fetch server info from MC Server Status
			// eslint-disable-next-line no-case-declarations
			const server = await got(`https://api.mcsrvstat.us/2/${ip}:${port}`).json();
			// Edit the embed with the server info
			embed
				.setTitle(`Info For \`${ip}:${port}\``);
			if (server.online) {
				embed
					.addFields(
						{
							name: 'Version',
							value: `${server.version}`,
							inline: true,
						},
						{
							name: 'Software',
							value: `${server.software || 'Unknown'}`,
							inline: true,
						},
						{
							name: 'Players',
							value: `${server.players.online}/${server.players.max}`,
							inline: true,
						},
					)
					.setThumbnail(`https://api.mcsrvstat.us/icon/${ip}:${port}`);
			}
			else {
				// If the server is offline or doesn't exist, set the embed to say so
				embed.setDescription('Server is offline or doesn\'t exist');
			}
			break;
		case 'uuid':
			// Fetch UUID from Mojang API
			// eslint-disable-next-line no-case-declarations
			const uuid = await got(`https://api.mojang.com/users/profiles/minecraft/${username}`).json();
			embed
				.setTitle(`UUID for ${username}`)
				.setDescription(`\`${uuid.id}\`` || 'Player doesn\'t exist')
				// Set the thumbnail to the player's head from MC Heads
				.setThumbnail(`https://mc-heads.net/head/${username}`);
			break;
		default:
			// If the subcommand doesn't exist, set this, but this should never happen
			await interaction.editReply('Something went wrong.');
			return;
		}

		// Send the embed
		await interaction.editReply({ embeds: [embed] });
	},
};
