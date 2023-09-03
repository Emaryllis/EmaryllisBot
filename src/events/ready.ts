import { Client, Events, REST, Routes } from 'discord.js';
import resolveConstants from '../constants';
import getCommands from '../getCommands';
const TOKEN = process.env.BOT_TOKEN || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
export default (client: Client, timeTaken: number): void => {
	// Register slash commands
	const commands = getCommands().map(cmd => cmd.data.toJSON());

	// We use 'c' for the event parameter to keep it separate from the already defined 'client'
	client.once(Events.ClientReady, async (c: Client) => {
		try {
			const cmdStartTime = Date.now();
			console.info(`Started refreshing ${commands.length} application (/) commands.`);
			// Register commands to Discord for users to use
			const data = await new REST()
				.setToken(TOKEN)
				.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
			console.info(
				`Successfully refreshed ${Object.keys(data).length} application (/) commands. (${
					Date.now() - cmdStartTime
				}ms)`
			);
		} catch (err) {
			console.error(err);
		}
		const constStartTime = Date.now();
		console.info('Started resolving constants.');
		// Resolve Constants
		try {
			await resolveConstants(client);
			console.info(`Successfully resolved constants. (${Date.now() - constStartTime}ms)`);
		} catch (err) {
			console.error(err);
		}

		// Finished registering slash commands and marks the bot as ready
		console.info(`${c.user.tag} is ready! (${Date.now() - timeTaken}ms)`);
	});
};
