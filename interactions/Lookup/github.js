const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');
const { Octokit } = require('octokit');
const { defer } = require('../../global/embed-helper');
const octokit = new Octokit({ 'user-agent': 'https://auravoid.dev/' });

module.exports = {
	data: new SlashCommandBuilder()
		.setName('github')
		.setDescription('Look up a GitHub user or repository. ')
		.addStringOption(option =>
			option.setName('query')
				.setDescription('The user or repository to look up.')
				.setRequired(true)),
	execute: async function(interaction) {
		await defer(interaction);
		// Get the query from the interaction
		const query = interaction.options.getString('query');

		// Check if the query is a user or a repository
		// @todo: Make this not stupid
		if (query.includes('/')) {
			await octokit.request('GET /repos/{owner}/{repo}', {
				// Split the query into the owner and repository
				owner: query.split('/')[0],
				repo: query.split('/')[1],
			}).then(response => {
				// Set the repo data from the response
				const repo = response.data;

				// Create the embed
				const repoEmbed = new EmbedBuilder()
					.setTitle(repo.owner.login + '/' + repo.name)
					.setURL(repo.html_url)
					.setDescription(repo.description)
					.addFields(
						{
							name: 'Stars',
							value: repo.stargazers_count.toString(),
							inline: true,
						},
						{
							name: 'Forks',
							value: repo.forks_count.toString(),
							inline: true,
						},
						{
							name: 'Open Issues',
							value: repo.open_issues_count.toString(),
							inline: true,
						},

						{
							name: 'License',
							value: repo.license?.name ?? 'None',
							inline: true,
						},
						{
							name: 'Language',
							value: repo.language ?? 'None',
							inline: true,
						},

						{
							name: 'Created',
							value: new Date(Date.parse(repo.created_at)).toDateString(),
							inline: true,
						},
						{
							name: 'Last Updated',
							value: new Date(Date.parse(repo.updated_at)).toDateString(),
							inline: true,
						},
					)
					.setThumbnail(repo.owner.avatar_url)
					.setColor('#333333');

				// Send the embed
				interaction.editReply({ embeds: [repoEmbed] });
			}).catch(error => {
				// If there is an error, reply with the error message
				return interaction.editReply({
					content: `\`${error.response.data.message}\``,
					ephemeral: true,
				});
			});
		}
		// If the query is not a repository, it must be a user!
		// Or it's invalid, but that's not our problem.
		else {
			// As above, but with users
			await octokit.request('GET /users/{username}', {
				username: query,
			}).then(response => {
				const user = response.data;
				const userEmbed = new EmbedBuilder()
					.setTitle(user.login)
					.setURL(user.html_url)
					.setDescription(user.bio)
					.setThumbnail(user.avatar_url)
					.setColor('#333333')
					.addFields(
						{
							name: 'Name',
							value: user.name ?? 'None',
							inline: true,
						},
						{
							name: 'Followers',
							value: user.followers.toString(),
							inline: true,
						},
						{
							name: 'Following',
							value: user.following.toString(),
							inline: true,
						},

						{
							name: 'Public Repos',
							value: user.public_repos.toString(),
							inline: true,
						},
						{
							name: 'Public Gists',
							value: user.public_gists.toString(),
							inline: true,
						},
						{
							name: 'Location',
							value: user.location ?? 'No Location Set',
							inline: true,
						},

						{
							name: 'Created',
							value: new Date(Date.parse(user.created_at)).toDateString(),
							inline: true,
						},
						{
							name: 'Last Updated',
							value: new Date(Date.parse(user.updated_at)).toDateString(),
							inline: true,
						},
					);
				interaction.editReply({ embeds: [userEmbed] });
			}).catch(error => {
				return interaction.editReply({
					content: `\`${error.response.data.message}\``,
					ephemeral: true,
				});
			});
		}
	},
};
