const { get, set } = require('@helpers/RedisHelper');

export async function analytics(command: any) {
    const commandUsage = await get('commandCount');
    const commandId = command.name;

    if (!commandUsage) {
        const newCommand = {
            name: commandId,
            usage: 1,
        };
        await set('commandCount', JSON.stringify([newCommand]));
        return;
    } else {
        const parsedCommandUsage = JSON.parse(commandUsage);

        const commandIndex = parsedCommandUsage.findIndex(
            (c: { name: any }) => c.name === commandId
        );
        if (commandIndex !== -1) {
            parsedCommandUsage[commandIndex].usage++;
        } else {
            const newCommand = {
                name: commandId,
                usage: 1,
            };
            parsedCommandUsage.push(newCommand);
        }

        await set('commandCount', JSON.stringify(parsedCommandUsage));
    }
}
