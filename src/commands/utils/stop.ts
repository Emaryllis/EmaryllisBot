import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder().setName('stop').setDescription('Stops the bot!'),
	async execute(interaction: { client: any; reply: (arg0: string) => any }) {
		await interaction.reply('Shutting Down!');
		interaction.client.destroy();
		console.info('Bot has shut down!');
	},
};
