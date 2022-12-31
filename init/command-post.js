// noinspection JSUnresolvedFunction,JSClosureCompilerSyntax,JSUnusedLocalSymbols

const {
	BOT_ID,
	BOT_TOKEN,
	CDN_KEY,
	EMBED_COLOR,
	HOMEGUILD_ID,
} = process.env;

const fetch = require('node-fetch');
const { REST } = require('@discordjs/rest');
const {
	EmbedBuilder,
	Routes,
} = require('discord.js');
const fs = require('fs');
const rest = new REST({ version: '10' }).setToken(BOT_TOKEN);

// noinspection JSUnusedGlobalSymbols
// eslint-disable-next-line no-unused-vars
const commandSchema = {
	'commands': [
		{
			name: 'string',
			description: 'string',
			id: 'integer',
			type: 'integer',
			category: 'string',
		},
	],
};

async function getCommands() {
	// Get commands from Discord.js
	let commandList = [];
	if (process.env.RAILWAY_ENVIRONMENT === 'production') {
		commandList = await rest.get(
			Routes.applicationCommands(BOT_ID),
		).catch(e => console.log(e));
	}
	else if (process.env.RAILWAY_ENVIRONMENT === 'staging') {
		commandList = await rest.get(
			Routes.applicationGuildCommands(BOT_ID, HOMEGUILD_ID),
		).catch(e => console.log(e));
	}

	// Append folder name to command array
	const commands = [];
	commandList.forEach(command => {
		// Lookup command folder using fs
		// noinspection UnnecessaryLocalVariableJS
		const category = fs.readdirSync('./interactions').find(folder => fs.readdirSync(`./interactions/${folder}`).includes(`${command.name}.js`));

		command.category = category;
		commands.push(command);
	});

	return commands;
}

function formatCommands(commands) {
	// Format commands to match schema
	const formattedCommands = {};

	// Add each category to the list
	commands.forEach(command => {
		if (command.category === 'Debug') return;
		if (!formattedCommands[command.category]) {
			formattedCommands[command.category] = [];
		}
		formattedCommands[command.category].push({
			name: command.name,
			description: command.description,
			id: command.id,
			type: command.type,
		});
	});
	return formattedCommands;
}

function sortCommands(commands) {
	// Sort commands alphabetically
	commands.sort((a, b) => {
		if (a.name < b.name) {
			return -1;
		}
		if (a.name > b.name) {
			return 1;
		}
		return 0;
	});
	return commands;
}

function postCommands(commands) {
	// Post commands to CDN
	// Pretty self explanatory
	const data = JSON.stringify(commands, null, 4);
	fetch('https://cdn.auravoid.dev/data/commands.json', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'X-Custom-Auth-Key': CDN_KEY,
		},
		body: data,
	}).catch(e => console.log(e));
}

async function updateMessage(commands, client) {
	const contextCommands = [];
	const slashCommands = [];
	commands.forEach(command => {
		// remove debug command
		if (command.name === 'debug') return;

		switch (command.type) {
		case 3:
		case 2:
			contextCommands.push(command);
			break;
		case 1:
			slashCommands.push(command);
			break;
		default:
			break;
		}
	});

	const aboutChannel = await client.channels.fetch('1020861414874824748');
	// noinspection JSUnresolvedVariable
	const message = await aboutChannel.messages.fetch('1021876155260862474');

	// Create embed
	const embed = new EmbedBuilder()
		.setTitle('Commands')
		// Set description to the list of commands and their descriptions
		.setDescription(slashCommands.map(command => `</${command.name}:${command.id}> - ${command.description}`).join('\n'))
		.setColor(EMBED_COLOR);

	// If there are context commands, add them to the embed
	if (contextCommands.length > 0) {
		embed.addFields(
			{
				name: 'Context Commands',
				value: contextCommands.map(command => `${command.name}`).join(', '),
			},
		);
	}


	message.edit({
		content: '',
		embeds: [embed],
	});
}

async function main(client) {
	console.log('COMMND: Fetching commands...');
	const commands = await getCommands();
	console.log('COMMND: Sorting commands...');
	const sortedCommands = sortCommands(commands);
	console.log('COMMND: Formatting commands...');
	const formattedCommands = formatCommands(sortedCommands);
	console.log('COMMND: Posting commands...');
	postCommands(formattedCommands);
	if (process.env.RAILWAY_ENVIRONMENT === 'production') {
		console.log('COMMND: Updating message...');
		await updateMessage(sortedCommands, client);
	}
}

module.exports = {
	execute: async function(client) {
		await main(client);
	},
};

