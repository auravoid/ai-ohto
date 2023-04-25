const { getJSON, setJSON } = require('@helpers/RedisHelper');


export async function analytics(command: any) {
    const commandUsage = await getJSON('commandUsage');
    const commandId = command.name;

    if (!commandUsage) {
        const newCommand = {
            name: commandId,
            usage: 1,
        };
        await setJSON('commandUsage', [newCommand]);
        return;
    } else {
        const commandIndex = commandUsage.findIndex(
            (c: { name: any }) => c.name === commandId
        );
        if (commandIndex !== -1) {
            commandUsage[commandIndex].usage++;
        } else {
            const newCommand = {
                name: commandId,
                usage: 1,
            };
            commandUsage.push(newCommand);
        }

        await setJSON('commandUsage', commandUsage).then(console.log);
    }
}
