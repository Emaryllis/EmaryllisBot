import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';
import MESSAGE from '../../constants';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the bot!')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction: CommandInteraction): Promise<void> {
		try {
			if ((await interaction.client.application.fetch()).owner != interaction.user) {
				await interaction.reply(MESSAGE.stop.fail);
				return;
			}
			await interaction.reply(MESSAGE.stop.success);
			interaction.client.destroy();
			console.info(MESSAGE.stop.console);
			process.exit(); // Bypasses command logger
		} catch (err) {
			await interaction.reply(MESSAGE.formatError(err.message));
		}
	},
};
