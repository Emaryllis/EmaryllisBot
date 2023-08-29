import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Check if the bot is responding!'),
	async execute(interaction: { reply: (arg0: string) => any }) {
		await interaction.reply('Hello!');
	},
};
