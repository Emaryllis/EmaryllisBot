import { BaseInteraction, ChatInputCommandInteraction, Client, Events } from 'discord.js';

export default function interactionCreate(client: Client) {
	client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {
		if (!interaction.isChatInputCommand()) return; //Narrow type from BaseInteraction to ChatInputCommandInteraction
		const chatInputInteraction = interaction as ChatInputCommandInteraction;
		const command = chatInputInteraction.client.commands.get(chatInputInteraction.commandName);
		if (!command)
			return console.error(
				`No command matching ${chatInputInteraction.commandName} was found.`
			);

		try {
			await command.execute(chatInputInteraction);
			const datetime = new Date().toLocaleString('en-US', { hour12: false });
			console.info(
				`${datetime}: User ${chatInputInteraction.user.tag} issued /${chatInputInteraction.commandName}.`
			);
		} catch (error) {
			console.error(error);
			const payload = {
				content: 'There was an error while executing this command!',
				ephemeral: true,
			};
			chatInputInteraction.replied || chatInputInteraction.deferred
				? await chatInputInteraction.followUp(payload)
				: await chatInputInteraction.reply(payload);
		}
	});
}
