import { basename, join } from 'path';
import type { Command } from './Command';
import { mapScripts } from './helpers/glob';

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

        return cmd;
    }
);
