import {
    ActionRowBuilder,
    ApplicationCommandOptionType,
    ApplicationCommandType,
    ChatInputCommandInteraction,
    ColorResolvable,
    EmbedBuilder,
    StringSelectMenuBuilder,
} from 'discord.js';
import { Command } from '@/Command';
import fetch from 'node-fetch-native';
import he from 'he';

const { BOT_COLOR } = process.env;

// TODO: Make this command less stupid
// TODO: Maybe add a score system with a leaderboard using Redis

export const Quiz: Command = {
    name: 'quiz',
    category: 'Fun',
    description: 'Generate a trivia quiz just for you!',
    options: [
        {
            name: 'category',
            description: 'The quiz category',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Animals',
                    value: '27',
                },
                {
                    name: 'Art',
                    value: '25',
                },
                {
                    name: 'Celebrities',
                    value: '26',
                },
                {
                    name: 'Entertainment: Board Games',
                    value: '16',
                },
                {
                    name: 'Entertainment: Books',
                    value: '10',
                },
                {
                    name: 'Entertainment: Cartoon & Animations',
                    value: '32',
                },
                {
                    name: 'Entertainment: Comics',
                    value: '29',
                },
                {
                    name: 'Entertainment: Film',
                    value: '11',
                },
                {
                    name: 'Entertainment: Japanese Anime & Manga',
                    value: '31',
                },
                {
                    name: 'Entertainment: Music',
                    value: '12',
                },
                {
                    name: 'Entertainment: Musicals & Theatres',
                    value: '13',
                },
                {
                    name: 'Entertainment: Television',
                    value: '14',
                },
                {
                    name: 'Entertainment: Video Games',
                    value: '15',
                },
                {
                    name: 'General Knowledge',
                    value: '9',
                },
                {
                    name: 'Geography',
                    value: '22',
                },
                {
                    name: 'History',
                    value: '23',
                },
                {
                    name: 'Mythology',
                    value: '20',
                },
                {
                    name: 'Politics',
                    value: '24',
                },
                {
                    name: 'Science & Nature',
                    value: '17',
                },
                {
                    name: 'Science: Computers',
                    value: '18',
                },
                {
                    name: 'Science: Gadgets',
                    value: '30',
                },
                {
                    name: 'Science: Mathematics',
                    value: '19',
                },
                {
                    name: 'Sports',
                    value: '21',
                },
                {
                    name: 'Vehicles',
                    value: '28',
                },
            ],
        },
        {
            name: 'difficulty',
            description: 'The quiz difficulty',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Easy',
                    value: 'easy',
                },
                {
                    name: 'Medium',
                    value: 'medium',
                },
                {
                    name: 'Hard',
                    value: 'hard',
                },
            ],
        },
        {
            name: 'type',
            description: 'The quiz type',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Multiple Choice',
                    value: 'multiple',
                },
                {
                    name: 'True/False',
                    value: 'boolean',
                },
            ],
        },
    ],
    type: ApplicationCommandType.ChatInput,
    run: async (interaction: ChatInputCommandInteraction) => {
        const base = 'https://opentdb.com/api.php?amount=1';
        const cat = `${interaction.options.getString('category')}`;
        const dif = `${interaction.options.getString('difficulty')}`;
        const type = `${interaction.options.getString('type')}`;

        const url = `${base}&category=${cat}&difficulty=${dif}&type=${type}`;
        const res = await fetch(url);
        const quizData = await res.json();

        const quizQuestion = quizData.results[0].question;
        const quizAnswer = quizData.results[0].correct_answer;
        const quizIncorrect = quizData.results[0].incorrect_answers;

        const quizOptions = [quizAnswer, ...quizIncorrect];
        const quizOptionsShuffled = quizOptions.sort(() => Math.random() - 0.5);
        const quizOptionsFiltered = quizOptionsShuffled.map((option) =>
            he.decode(option)
        );
        const quizOptionsWithLetters = quizOptionsFiltered.map(
            (option, index) => {
                const letter = String.fromCharCode(97 + index);
                return `${letter}) ${option}`;
            }
        );

        const embed = new EmbedBuilder()
            .setTitle('Quiz')
            .setDescription(he.decode(quizQuestion))
            .addFields({
                name: 'Options',
                value: quizOptionsWithLetters.join('\n'),
            })
            .setColor(BOT_COLOR as ColorResolvable);

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('quiz')
                .setPlaceholder('Select an option')
                .addOptions(
                    quizOptionsFiltered.map((option, index) => {
                        const letter = String.fromCharCode(97 + index);
                        return {
                            label: option,
                            value: letter,
                        };
                    })
                )
        );

        await interaction.followUp({
            components: [row as any],
            embeds: [embed],
            ephemeral: false,
        });

        const filter = (i: any) => i.customId === 'quiz';
        const collector = interaction.channel?.createMessageComponentCollector({
            filter,
            time: 15000,
        });

        collector?.on('collect', async (i: any) => {
            const userAnswer = i.values[0];
            const correctAnswer = String.fromCharCode(
                97 + quizOptionsShuffled.indexOf(quizAnswer)
            );

            if (userAnswer === correctAnswer) {
                embed.setColor('#00ee00').setTitle('Quiz - Correct');
                await i.update({
                    components: [],
                    embeds: [embed],
                });
            } else {
                embed.setColor('#ee0000').setTitle('Quiz - Incorrect');
                await i.update({
                    components: [],
                    embeds: [embed],
                });
            }
        });
    },
};
