import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    EmbedBuilder,
} from 'discord.js';
import { Command } from '@/Command';
import { Octokit } from 'octokit';
const octokit = new Octokit({ 'user-agent': 'https://auravoid.dev/' });

export const Github: Command = {
    name: 'github',
    category: 'Lookup',
    description: 'Lookup a Github user or repository',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'The user to lookup',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'repository',
            description: 'The repository to lookup',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
    run: async (interaction: ChatInputCommandInteraction) => {
        const user = interaction.options.getString('user', true);
        const repository = interaction.options.getString('repository', false);

        if (repository) {
            await octokit
                .request('GET /repos/{owner}/{repo}', {
                    owner: user,
                    repo: repository,
                })
                .then((response) => {
                    const { data } = response;
                    const embed = new EmbedBuilder()
                        .setTitle(data.owner.login + '/' + data.name)
                        .setURL(data.html_url)
                        .setDescription(data.description)
                        .addFields(
                            {
                                name: 'Stars',
                                value: data.stargazers_count.toString(),
                                inline: true,
                            },
                            {
                                name: 'Forks',
                                value: data.forks_count.toString(),
                                inline: true,
                            },
                            {
                                name: 'Open Issues',
                                value: data.open_issues_count.toString(),
                                inline: true,
                            },

                            {
                                name: 'License',
                                value: data.license?.name ?? 'None',
                                inline: true,
                            },
                            {
                                name: 'Language',
                                value: data.language ?? 'None',
                                inline: true,
                            },

                            {
                                name: 'Created',
                                value: new Date(
                                    Date.parse(data.created_at)
                                ).toDateString(),
                                inline: true,
                            },
                            {
                                name: 'Last Updated',
                                value: new Date(
                                    Date.parse(data.updated_at)
                                ).toDateString(),
                                inline: true,
                            }
                        )
                        .setThumbnail(data.owner.avatar_url)
                        .setColor('#333333');

                    interaction.followUp({ embeds: [embed] });
                })
                .catch((error) => {
                    return interaction.followUp({
                        content: `\`${error.response.data.message}\``,
                        ephemeral: true,
                    });
                });
        } else {
            await octokit
                .request('GET /users/{username}', {
                    username: user,
                })
                .then((response) => {
                    const { data } = response;
                    const embed = new EmbedBuilder()
                        .setTitle(data.login)
                        .setURL(data.html_url)
                        .setDescription(data.bio)
                        .setThumbnail(data.avatar_url)
                        .setColor('#333333')
                        .addFields(
                            {
                                name: 'Name',
                                value: data.name ?? 'None',
                                inline: true,
                            },
                            {
                                name: 'Followers',
                                value: data.followers.toString(),
                                inline: true,
                            },
                            {
                                name: 'Following',
                                value: data.following.toString(),
                                inline: true,
                            },

                            {
                                name: 'Public Repos',
                                value: data.public_repos.toString(),
                                inline: true,
                            },
                            {
                                name: 'Public Gists',
                                value: data.public_gists.toString(),
                                inline: true,
                            },
                            {
                                name: 'Location',
                                value: data.location ?? 'No Location Set',
                                inline: true,
                            },

                            {
                                name: 'Created',
                                value: new Date(
                                    Date.parse(data.created_at)
                                ).toDateString(),
                                inline: true,
                            },
                            {
                                name: 'Last Updated',
                                value: new Date(
                                    Date.parse(data.updated_at)
                                ).toDateString(),
                                inline: true,
                            }
                        );
                    interaction.followUp({ embeds: [embed] });
                })
                .catch((error) => {
                    return interaction.followUp({
                        content: `\`${error.response.data.message}\``,
                        ephemeral: true,
                    });
                });
        }
    },
};
