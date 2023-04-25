import { Client, ColorResolvable, EmbedBuilder, TextChannel } from 'discord.js';
import { get } from '@/helpers/RedisHelper';
const { COLOR_WARNING, COLOR_ERROR } = process.env;

export default async function auditLogs(client: Client) {
    await readLogs(client);
}

export async function readLogs(client: Client) {
    client.on('messageDelete', async (message) => {
        if (message.author?.bot) {
            return;
        }
        const messageGuild = message.guild?.id;
        const logChannelId = await get(`guild:${messageGuild}:logChannel`);
        if (!logChannelId) {
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle('Message Deleted')
            .setDescription(`A message was deleted in ${message.channel}`)
            .addFields(
                {
                    name: 'Author',
                    value: `${message.author}`,
                },
                {
                    name: 'Content',
                    value: '```' + message.content + '```',
                }
            )
            .setColor(COLOR_ERROR as ColorResolvable);

        const logChannel = await client.channels
            .fetch(logChannelId)
            .catch(() => {});
        (logChannel as TextChannel)?.send({ embeds: [embed] }).catch(() => {});
    });

    client.on('messageUpdate', async (oldMessage, newMessage) => {
        if (oldMessage.author?.bot) {
            return;
        }
        if (oldMessage.content === newMessage.content) {
            return;
        }

        const messageGuild = oldMessage.guild?.id;
        const logChannelId = await get(`guild:${messageGuild}:logChannel`);
        if (!logChannelId) {
            return;
        }

        const embed = new EmbedBuilder()
            .setTitle('Message Edited')
            .setDescription(`A message was edited in ${oldMessage.channel}`)
            .addFields(
                {
                    name: 'Author',
                    value: `${oldMessage.author}`,
                },
                {
                    name: 'Old Content',
                    value: '```' + oldMessage.content + '```',
                    inline: true,
                },
                {
                    name: 'New Content',
                    value: '```' + newMessage.content + '```',
                    inline: true,
                }
            )
            .setColor(COLOR_WARNING as ColorResolvable);

        const logChannel = await client.channels
            .fetch(logChannelId)
            .catch(() => {});
        (logChannel as TextChannel)?.send({ embeds: [embed] }).catch(() => {});
    });
}
