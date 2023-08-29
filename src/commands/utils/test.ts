import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder().setName('test').setDescription('A Test Command!'),
	async execute(interaction: { reply: (arg0: string) => any }): Promise<void> {
		await interaction.reply('Hello!');
	},
};
