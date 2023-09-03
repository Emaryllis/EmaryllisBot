import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the bot!')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction: CommandInteraction): Promise<void> {
		if ((await interaction.client.application.fetch()).owner != interaction.user) {
			await interaction.reply(`Shut Down Failed\n\n\`You are not the owner of this bot.\``);
			return;
		}
		await interaction.reply('Shutting Down!');
		interaction.client.destroy();
		console.info('Bot has shut down!');
		process.exit(); // Bypasses command logger
	},
};
