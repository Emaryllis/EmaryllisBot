import { Client, Events } from 'discord.js';

export default function interactionCreate(client: Client) {
	client.on(Events.InteractionCreate, async interaction => {
		if (!interaction.isChatInputCommand()) return; //Narrow type from BaseInteraction to ChatInputCommandInteraction
		const command = interaction.client.commands.get(interaction.commandName);
		if (!command)
			return console.error(`No command matching ${interaction.commandName} was found.`);

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			const payload = {
				content: 'There was an error while executing this command!',
				ephemeral: true,
			};
			interaction.replied || interaction.deferred
				? await interaction.followUp(payload)
				: await interaction.reply(payload);
		}
	});
}
