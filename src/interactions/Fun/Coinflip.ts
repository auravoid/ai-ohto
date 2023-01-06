import { ApplicationCommandType, Client, CommandInteraction } from 'discord.js';
import { Command } from '@/Command';

export const Coinflip: Command = {
    name: 'coinflip',
    description: 'Heads or Tails?',
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const face = ['Heads', 'Tails'];
        const chosenValue = Math.random() < 0.5 ? 0 : 1;

        const content = face[chosenValue];

        await interaction.followUp({
            ephemeral: false,
            content,
        });
    },
};
