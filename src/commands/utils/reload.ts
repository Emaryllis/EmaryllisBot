import { SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption(option =>
			option.setName('command').setDescription('The command to reload.').setRequired(true)
		),
	async execute(interaction: {
		options: { getString: (arg0: string, arg1: boolean) => string };
		client: {
			commands: {
				get: (arg0: any) => any;
				delete: (arg0: any) => void;
				set: (arg0: any, arg1: any) => void;
			};
		};
		reply: (arg0: string) => any;
	}) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		}
		delete require.cache[require.resolve(`./${command.data.name}.ts`)];

		try {
			interaction.client.commands.delete(command.data.name);
			const newCommand = require(`./${command.data.name}.ts`);
			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
		} catch (err) {
			console.error(err);
			await interaction.reply(
				`There was an error while reloading a command \`${command.data.name}\`:\n\`${err.message}\``
			);
		}
	},
};
