import {
    ApplicationCommandType,
    ApplicationCommandOptionType,
    Client,
    CommandInteraction,
    EmbedBuilder,
} from 'discord.js';
import { Command } from '@/Command';
import fetch from 'node-fetch-native';

export const Domain: Command = {
    name: 'domain',
    description: 'Lookup a domain name',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'domain',
            description: 'The domain name to lookup',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'type',
            description: 'The type of record to lookup',
            type: ApplicationCommandOptionType.String,
            required: false,
            choices: [
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
            ],
        },
    ],
    run: async (client: Client, interaction: CommandInteraction) => {
        // @ts-ignore
        const domain = interaction.options.getString('domain');
        // @ts-ignore
        const type = interaction.options.getString('type');

        const response = await fetch(
            'https://dns.google/resolve?name=' + domain + '&type=' + type
        ).catch(console.error);
        // @ts-ignore
        const body = await response.json();

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setTitle('Domain Lookup')
            .setDescription(`Lookup information for \`${domain}\``)
            .addFields({
                name: 'Response',
                value: `\`\`\`json\n${JSON.stringify(body, null, 2)}\`\`\``,
            });

        await interaction.followUp({
            ephemeral: false,
            embeds: [embed],
        });
    },
};
