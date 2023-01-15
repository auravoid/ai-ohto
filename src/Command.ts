import type { ApplicationCommandData } from 'discord.js';
import { CommandInteraction } from 'discord.js';

export type Command = ApplicationCommandData & {
    category?: string;
    description?: string;
    name?: string;
    id?: string;
    guildOnly?: boolean;
    run(interaction: CommandInteraction): void | Promise<unknown>;
};
