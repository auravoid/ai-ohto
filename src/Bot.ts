import { Client } from 'discord.js';
import interactionCreate from './listeners/interactionCreate';
import ready from './listeners/ready';

const { BOT_TOKEN } = process.env;

console.log('Bot is starting...');

const client = new Client({
    intents: 3,
});

ready(client);
interactionCreate(client);

client.login(BOT_TOKEN).catch(console.error);
