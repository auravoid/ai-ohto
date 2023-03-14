import { ChatInputCommandInteraction } from 'discord.js';
import { get, set } from '@/helpers/RedisHelper';

export default async function (
    interaction: ChatInputCommandInteraction
): Promise<void> {
    const user = interaction.options.getUser('user')?.id;
    let authUsers = JSON.parse((await get('authUsers')) as string);

    if (!authUsers.includes(user)) {
        await interaction.followUp({
            content: 'That user is not authorized.',
            ephemeral: true,
        });
    } else {
        authUsers = authUsers.filter((id: string) => id !== user);
        await set('authUsers', JSON.stringify(authUsers));
        await interaction.followUp({
            content: 'User removed from list of authorized users.',
            ephemeral: true,
        });
    }
}
