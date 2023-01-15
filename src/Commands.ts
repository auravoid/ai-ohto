import { basename, join } from 'path';
import type { Command } from './Command';
import { mapScripts } from './helpers/glob';
import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';

const { BOT_ID, BOT_TOKEN } = process.env;

export const CommandMap = {} as Record<string, Command>;
export const Commands = mapScripts(
    join(__dirname, 'interactions'),
    async (file) => {
        // -3 strips last 3 chars aka [.js | .ts]
        const name = basename(file).slice(0, -3);

        const cmd = await import(file).then(
            (exports) => exports[name] as Command
        );
        if (!cmd) {
            throw new Error(
                `Command ${name} must export a Command object named "${name}"`
            );
        }

        CommandMap[cmd.name] = cmd;

        let commandList: any = [];

        const rest = new REST({ version: '9' }).setToken(BOT_TOKEN as string);

        commandList = await rest
            .get(Routes.applicationCommands(BOT_ID as string))
            .catch((e) => console.log(e));

        for (const command of commandList) {
            if (CommandMap[command.name]) {
                CommandMap[command.name].id = command.id;
            }
        }

        return cmd;
    }
);
