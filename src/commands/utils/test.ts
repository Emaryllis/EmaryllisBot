import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder().setName('test').setDescription('A Test Command!'),
	async execute(interaction: CommandInteraction): Promise<void> {
		await interaction.reply('Hello!');
	},
};
