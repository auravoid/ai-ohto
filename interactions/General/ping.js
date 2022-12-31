const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with some ping information.'),
	async execute(interaction) {
		// Do some math to get the ping
		const ping = Date.now() - interaction.createdAt;
		// Fetch the ping of Discord's API
		const websocketPing = Math.round(interaction.client.ws.ping);

		// Create an embed
		const embed = new EmbedBuilder()
			.setColor(process.env.EMBED_COLOR)
			.setTitle('🏓 Pong!')
			.setDescription(`Interaction latency is \`${ping}ms\`\nAPI Latency is \`${websocketPing}ms\``);

		// Send the embed
		await interaction.reply({ embeds: [embed] });
	},
};
