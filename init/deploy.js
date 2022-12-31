// noinspection JSUnresolvedFunction,JSClosureCompilerSyntax,JSUnusedLocalSymbols

const fs = require('fs');
const { Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const {
	BOT_ID,
	HOMEGUILD_ID,
	BOT_TOKEN,
	RAILWAY_ENVIRONMENT,
} = process.env;

module.exports = {
	name: 'deploy',
	execute: async (client) => {
		const commands = [];
		const guildCommands = [];
		const commandFolders = fs.readdirSync('./interactions');

		for (const folder of commandFolders) {
			const commandFiles = fs
				.readdirSync(`./interactions/${folder}`)
				.filter((file) => file.endsWith('.js'));
			for (const file of commandFiles) {
				const command = require(`../interactions/${folder}/${file}`);
				if (command.guildOnly) {
					guildCommands.push(command.data.toJSON());
				}
				else {
					commands.push(command.data.toJSON());
				}
			}
		}

		const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

		/**
		 *
		 * @description - Function to show command additions and deletions
		 * @param oldCommands {Map} - The old commands
		 * @param newCommands {Map} - The new commands
		 * @returns Output of command additions and deletions
		 */
		async function commandCheck(oldCommands, newCommands) {
			const oldCommandsNames = oldCommands.map((command) => command.name);
			const newCommandsNames = newCommands.map((command) => command.name);
			const commandsToDelete = oldCommandsNames.filter((command) => !newCommandsNames.includes(command));
			const commandsToAdd = newCommandsNames.filter((command) => !oldCommandsNames.includes(command));
			if (commandsToAdd.length > 0) {
				console.log(`COMMND: Adding ${commandsToAdd.length} command(s)...`);
				console.log(commandsToAdd);
			}
			if (commandsToDelete.length > 0) {
				console.log(`COMMND: Removing ${commandsToDelete.length} command(s)...`);
				console.log(commandsToDelete);
			}
			// If no changes log that
			if (commandsToAdd.length === 0 && commandsToDelete.length === 0) {
				console.log('COMMND: Nothing changed...');
			}
		}


		switch (RAILWAY_ENVIRONMENT) {
		case 'staging':
			try {
				console.log('COMMND: Setting commands...');
				const stagingCommands = commands.concat(guildCommands);
				const oldCommands = await rest.get(Routes.applicationGuildCommands(BOT_ID, HOMEGUILD_ID));
				await commandCheck(oldCommands, stagingCommands);
				await rest.put(
					Routes.applicationGuildCommands(BOT_ID, HOMEGUILD_ID),
					{ body: stagingCommands },
				);

				console.log('COMMND: Set commands...');
				// eslint-disable-next-line brace-style
			} catch (error) {
				console.error(error);
			}
			break;
		case 'production':
			try {
				console.log('COMMND: Setting commands...');

				const oldCommands = await rest.get(Routes.applicationCommands(BOT_ID));
				await commandCheck(oldCommands, commands);
				await rest.put(
					Routes.applicationCommands(BOT_ID),
					{ body: commands },
				);
				await rest.put(
					Routes.applicationGuildCommands(BOT_ID, HOMEGUILD_ID),
					{ body: guildCommands },
				);

				await require('./command-post.js').execute(client);
				console.log('COMMND: Set commands...');
				// eslint-disable-next-line brace-style
			} catch (error) {
				console.error(error);
			}
		}

	},
};
