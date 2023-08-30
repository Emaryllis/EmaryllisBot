import {
	CommandInteraction,
	CommandInteractionOptionResolver,
	SlashCommandBuilder,
} from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption(option =>
			option.setName('command').setDescription('The command to reload.').setRequired(true)
		),
	async execute(interaction: CommandInteraction): Promise<void> {
		const commandName = (interaction.options as CommandInteractionOptionResolver)
			.getString('command', true)
			.toLowerCase();

		//Check command to reload exists
		const command = interaction.client.commands.get(commandName);
		if (!command) {
			await interaction.reply(`There is no command with name \`${commandName}\`!`);
			return;
		}

		// Cache invalidation
		delete require.cache[require.resolve(`./${command.data.name}.ts`)];

		// Delete old command data, store new command data into cache using require, and store new command data back to client.commands
		try {
			interaction.client.commands.delete(command.data.name);
			const newCommand = require(`./${command.data.name}.ts`);
			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply(`Reloaded \`${newCommand.data.name}\` (Success)`);
		} catch (error) {
			console.error(error);
			await interaction.reply(
				`Reloaded \`${command.data.name}\` (**FAILED**)\n\n\`${error.message}\``
			);
		}
	},
};
