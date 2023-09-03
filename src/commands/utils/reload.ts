import {
	CommandInteraction,
	CommandInteractionOptionResolver,
	PermissionFlagsBits,
	SlashCommandBuilder,
} from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
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
			// Check if interaction user is the owner of the bot
		} else if ((await interaction.client.application.fetch()).owner != interaction.user) {
			await interaction.reply(
				`Reloaded \`${command.data.name}\` (**FAILED**)\n\n\`You are not the owner of this bot.\``
			);
			return;
		}

		// Cache invalidation
		delete require.cache[require.resolve(`./${command.data.name}.ts`)];

		try {
			interaction.client.commands.delete(command.data.name); // Delete old command data
			const newCommand = require(`./${command.data.name}.ts`); // Store new command data into cache using require

			// Store new command data back to client.commands
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
