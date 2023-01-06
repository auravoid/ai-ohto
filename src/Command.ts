import type {
    ApplicationCommandData,
    Client,
    CommandInteraction
} from 'discord.js';

export type Command = ApplicationCommandData & {
    // FIXME: Passing client is obsolete, use interaction.client instead
    run(client: Client, interaction: CommandInteraction): void | Promise<unknown>;
};
