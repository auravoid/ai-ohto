import { ChatInputCommandInteraction, EmbedBuilder } from 'discord.js';
import { getJSON } from '@/helpers/RedisHelper';

export default async function (
    interaction: ChatInputCommandInteraction
): Promise<void> {
    const command = interaction.options.getString('command');
    const commandUsage: any = await getJSON('commandUsage');
    const embed = new EmbedBuilder().setTitle('Command Usage');
    
    if (!commandUsage) {
        await interaction.followUp({
            content: 'No commands have been used yet.',
            ephemeral: true,
        });
        return;
    }

    if (!command) {
        embed.setDescription('```' + commandUsage.map((c: any) => `\`${c.name}\` - ${c.usage}`).join('\n') + '```');
    }

    if (command) {
        const commandIndex = commandUsage.findIndex(
            (c: { name: any }) => c.name === command);
        if (commandIndex !== -1) {
            embed.setDescription(`\`${command}\` has been used ${commandUsage[commandIndex].usage} times.`);
        } else {
            embed.setDescription(`\`${command}\` has not been used yet.`);
        }
    }

    await interaction.followUp({
        embeds: [embed],
        ephemeral: false,
    });
}
