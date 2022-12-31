const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');
const got = require('got');
const { defer } = require('../../global/embed-helper');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('domain')
		.setDescription('Lookup a domain name')
		.addStringOption(option =>
			option.setName('domain')
				.setDescription('The domain name to lookup')
				.setMaxLength(256)
				.setRequired(true))
		.addStringOption(option =>
			option.setName('type')
				.setDescription('The type of lookup to perform')
				.setRequired(true)
				// Set the choices for the type option, these are commonly used types
				.setChoices(
					{
						name: 'A',
						value: 'A',
					},
					{
						name: 'AAAA',
						value: 'AAAA',
					},
					{
						name: 'ANY ',
						value: 'ANY',
					},
					{
						name: 'CERT',
						value: 'CERT',
					},
					{
						name: 'CNAME',
						value: 'CNAME',
					},
					{
						name: 'MX',
						value: 'MX',
					},
					{
						name: 'PTR',
						value: 'PTR',
					},
					{
						name: 'SOA',
						value: 'SOA',
					},
					{
						name: 'SRV',
						value: 'SRV',
					},
					{
						name: 'TXT',
						value: 'TXT',
					},
				)),
	async execute(interaction) {
		await defer(interaction);
		// Get the domain name and type from the interaction
		const domain = interaction.options.getString('domain');
		const type = interaction.options.getString('type');

		// Fetch the domain information from Google's DNS API
		const domainData = await got('https://dns.google/resolve?name=' + domain + '&type=' + type).json().catch();

		// If there is no answer, return an error
		// noinspection JSUnresolvedVariable
		if (!domainData.Answer) {
			return interaction.editReply({
				content: `No \`${type}\` records found for \`${domain}\`.`,
				ephemeral: true,
			});
		}

		// Create an embed to display the domain information
		const embed = new EmbedBuilder()
			.setTitle('Domain Lookup')
			.setColor(process.env.EMBED_COLOR);

		// If the domain answer is too large, return an error
		if (JSON.stringify(domainData).length > 3000) {
			embed.setDescription(`Results for \`${domain}\` are too long to display.`);
		}
		// Otherwise, add the domain information to the embed
		else {
			embed.setDescription(`Results for \`${domain}\`'s \`${type}\` Records\n\`\`\`json\n${JSON.stringify(domainData, null, 2)}\`\`\``);
		}

		// Reply with the embed
		await interaction.editReply({ embeds: [embed] });

	},

};
