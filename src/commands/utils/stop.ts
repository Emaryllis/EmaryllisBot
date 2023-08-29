import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder().setName('stop').setDescription('Stops the bot!'),
	async execute(interaction: {
		reply: (arg0: string) => any;
		client: { destroy: () => void };
	}): Promise<void> {
		await interaction.reply('Shutting Down!');
		interaction.client.destroy();
		console.info('Bot has shut down!');
	},
};
