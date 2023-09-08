import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import MESSAGE from '../../constants';

module.exports = {
	data: new SlashCommandBuilder().setName('test').setDescription('A Test Command!'),
	async execute(interaction: CommandInteraction): Promise<void> {
		try {
			await interaction.reply('This is a test command!');
		} catch (err) {
			await interaction.reply(MESSAGE.formatError(err.message));
		}
	},
};
