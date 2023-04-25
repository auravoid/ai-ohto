import { ChatInputCommandInteraction, EmbedBuilder, TextChannel } from 'discord.js';

const {
    BOT_HOME_CHANNEL,
    BOT_HOME_GUILD,
}= process.env;

export default async function (
    interaction: ChatInputCommandInteraction
): Promise<void> {
    if (![process.env.BOT_OWNER_ID].includes(interaction.user.id)) {
        await interaction.followUp({
            content: 'You are not authorized to use this command.',
            ephemeral: true,
        });
    } else {

        let homeGuild = await interaction.client.guilds.fetch(BOT_HOME_GUILD as string);
        let homeChannel = await homeGuild.channels.fetch(BOT_HOME_CHANNEL as string);
        const embed = new EmbedBuilder()
            .setTitle('Shutdown Initiated')
            .setDescription(`Shutting down at the request of ${interaction.user.username}#${interaction.user.discriminator}`)
            .setColor('#FE2E2E');
        
        await (homeChannel as TextChannel).send({ embeds: [embed] });

        await interaction.followUp({
            content: "I'm gonna kill myself now.",
            ephemeral: true,
        });

        process.exit(0);
    }
}
