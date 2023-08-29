import { Client, Events, REST, Routes } from 'discord.js';
import getCommands from '../getCommands';
const TOKEN = process.env.BOT_TOKEN || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
export default (client: Client, timeTaken: number): void => {
	// Register slash commands
	const commands = getCommands().map(cmd => cmd.data.toJSON());
	const startTime = Date.now();
	console.info(`Started refreshing ${commands.length} application (/) commands.`);

	// We use 'c' for the event parameter to keep it separate from the already defined 'client'
	client.once(Events.ClientReady, async c => {
		try {
			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await new REST()
				.setToken(TOKEN)
				.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
			console.info(
				`Successfully reloaded ${Object.keys(data).length} application (/) commands. (${
					Date.now() - startTime
				}ms)`
			);
		} catch (err) {
			console.error(err);
		}
		// Finished registering slash commands and marks the bot as ready
		console.info(`${c.user.tag} is ready! (${Date.now() - timeTaken}ms)`);
	});
};
