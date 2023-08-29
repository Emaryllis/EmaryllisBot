import { Client, Events } from 'discord.js';

export default function interactionCreate(client: Client) {
	client.on(Events.InteractionCreate, async interaction => {
		if (!interaction.isChatInputCommand() && !interaction.isAutocomplete()) return;
		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			return console.error(
				`${interaction.user.tag}: /${interaction.commandName} (Not Found)`
			);
		}
		if (interaction.isAutocomplete()) {
			try {
				await command.autocomplete(interaction);
			} catch (err) {
				if (err.message.includes('command.autocomplete is not a function')) {
					console.error(
						`Did you add autocomplete to a required option? (/${interaction.commandName})`
					);
				}
				console.error(err);
			}
		} else {
			try {
				await command.execute(interaction);
				console.info(`${interaction.user.tag}: /${interaction.commandName} (Success)`);
			} catch (error) {
				console.error(
					`${interaction.user.tag}: /${interaction.commandName} (Failed)\n${error}`
				);
				const payload = {
					content: 'There was an error while executing this command!',
					ephemeral: true,
				};
				interaction.replied || interaction.deferred
					? await interaction.followUp(payload)
					: await interaction.reply(payload);
			}
		}
	});
}
