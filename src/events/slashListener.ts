import { BaseInteraction, Client, Events } from 'discord.js';
import MESSAGE, { cmd } from '../constants';

export default function interactionCreate(client: Client) {
	client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
		if (!interaction.isChatInputCommand()) return; //Narrow type from BaseInteraction to ChatInputCommandInteraction
		const command: cmd = interaction.client.commands.get(interaction.commandName);
		if (!command) {
			return console.error(MESSAGE.slashListener.noCommand(interaction.commandName));
		}

		try {
			await command.execute(interaction);
			const datetime = new Date().toLocaleString('en-US', { hour12: false });
			console.info(
				MESSAGE.slashListener.userLogger(
					datetime,
					interaction.user.tag,
					interaction.commandName
				)
			);
		} catch (err) {
			console.error(err);
			const payload = {
				content: MESSAGE.formatError(err.message),
				ephemeral: true,
			};
			interaction.replied || interaction.deferred
				? await interaction.followUp(payload)
				: await interaction.reply(payload);
		}
	});
}
