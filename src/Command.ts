import type {
    ApplicationCommandData,
    Client,
    ChatInputCommandInteraction
} from 'discord.js';

export type Command = ApplicationCommandData & {
    // FIXME: Passing client is obsolete, use interaction.client instead
    run(client: Client, interaction: ChatInputCommandInteraction): void | Promise<unknown>;
};
