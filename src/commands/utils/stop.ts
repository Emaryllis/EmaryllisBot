import { CommandInteraction, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the bot!')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction: CommandInteraction): Promise<void> {
		await interaction.reply('Shutting Down!');
		interaction.client.destroy();
		console.info('Bot has shut down!');
	},
};
