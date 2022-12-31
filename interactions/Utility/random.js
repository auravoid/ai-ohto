/* eslint-disable no-case-declarations */
const {
	SlashCommandBuilder,
	EmbedBuilder,
} = require('discord.js');
const { defer } = require('../../global/embed-helper');
const { randomColor } = require('../../global/functions.js');
const got = require('got');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('random')
		.setDescription('Choose a random something!')
		.addSubcommand(subcommand =>
			subcommand
				.setName('number')
				.setDescription('Choose a random number')
				.addIntegerOption(option =>
					option.setName('min')
						.setDescription('The minimum number')
						.setRequired(true))
				.addIntegerOption(option =>
					option.setName('max')
						.setDescription('The maximum number')
						.setRequired(true)))
		.addSubcommand(subcommand =>
			subcommand
				.setName('color')
				.setDescription('Get a random color'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('fact')
				.setDescription('Get a random fact'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('cat')
				.setDescription('Get a random cat picture'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('dog')
				.setDescription('Get a random dog picture'))
		.addSubcommand(subcommand =>
			subcommand
				.setName('choice')
				.setDescription('Choose a random choice')
				.addStringOption(option =>
					option.setName('choices')
						.setDescription('The choices to choose from. Separate choices with a comma.')
						.setRequired(true))),
	async execute(interaction) {
		await defer(interaction);
		const embed = new EmbedBuilder();
		const subcommand = interaction.options.getSubcommand();
		const color = await randomColor();

		switch (subcommand) {
		case 'number':
			const min = interaction.options.getInteger('min');
			const max = interaction.options.getInteger('max');
			const number = Math.floor(Math.random() * (max - min + 1)) + min;
			embed.setTitle('Random Number')
				.setDescription(`Your random number is \`${number}\`!`);
			break;
		case 'color':
            color.image = `https://dummyimage.com/260x100/${color.hexColor.slice(1)}&text=+`;
            color.name = await got(`https://api.color.pizza/v1/${color.hexColor.slice(1)}`).json();
			embed
				.setColor(color.hexColor)
				.setTitle('Random Color')
				.addFields(
                    {
                        name: 'Color Name',
                        value: color.name.paletteTitle,
                    },
					{
						name: 'Hex Code',
						value: color.hexColor,
						inline: true,
					},
					{
						name: 'RGB Code',
						value: color.rgbColor,
						inline: true,
					},
				)
                .setImage(color.image);
			break;
		case 'choice':
			const choices = interaction.options.getString('choices').split(',');
			let choice = choices[Math.floor(Math.random() * choices.length)];
			choice = choice.trim();

			embed.setTitle('Random Choice')
				.setDescription(`Your random choice is \`${choice}\`!`);
			break;
		case 'fact':
			const fact = await got('https://uselessfacts.jsph.pl/random.json?language=en').json();
			embed.setTitle('Random Fact')
				.setDescription(fact.text)
				.setURL(fact.source_url)
				.setColor(color.hexColor);
			break;
		case 'cat':
			const cat = await got('https://aws.random.cat/meow').json();
			embed.setTitle('Random Cat')
				.setImage(cat.file)
				.setColor(color.hexColor);
			break;
		case 'dog':
			const dog = await got('https://random.dog/woof.json').json();
			embed.setTitle('Random Dog')
				.setImage(dog.url)
				.setColor(color.hexColor);
			break;
		}

		await interaction.editReply({ embeds: [embed] });
	},
};
