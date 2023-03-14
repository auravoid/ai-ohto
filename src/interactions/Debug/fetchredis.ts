import { get } from '@/helpers/RedisHelper';
import { ChatInputCommandInteraction } from 'discord.js';

export default async function (
    interaction: ChatInputCommandInteraction
): Promise<void> {
    const key = interaction.options.getString('key') as string;
    const value = await get(key);
    await interaction.followUp({
        content: `The value of \`${key}\` is \n\`\`\`\n${value}\`\`\``,
        ephemeral: true,
    });
}
