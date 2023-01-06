import "./bootstrap";

import { Client, GatewayIntentBits } from 'discord.js';
import "./helpers/glob";
import interactionCreate from './listeners/interactionCreate';
import ready from './listeners/ready';

const { BOT_TOKEN } = process.env;

console.log('Bot is starting...');

const client = new Client({
    intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMembers,
});

ready(client);
interactionCreate(client);

client.login(BOT_TOKEN).catch(console.error);
