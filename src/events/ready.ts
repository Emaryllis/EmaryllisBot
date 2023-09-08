import { Client, Events, REST, Routes } from 'discord.js';
import MESSAGE, { resolveConstants } from '../constants';
import getCommands from '../slashHandler';
const TOKEN = process.env.BOT_TOKEN || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
export default (client: Client, timeTaken: number): void => {
	// Register slash commands
	const commands = getCommands().map(cmd => cmd.data.toJSON());

	// We use 'c' for the event parameter to keep it separate from the already defined 'client'
	client.once(Events.ClientReady, async (c: Client) => {
		try {
			const cmdStartTime = Date.now();
			console.info(MESSAGE.ready.refresh.start(commands.length));
			// Register commands to Discord for users to use
			const data = await new REST()
				.setToken(TOKEN)
				.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
			console.info(
				MESSAGE.ready.refresh.success(Object.keys(data).length, Date.now() - cmdStartTime)
			);
		} catch (err) {
			console.error(MESSAGE.rawError(err.message));
		}
		const constStartTime = Date.now();
		console.info(MESSAGE.ready.constant.start);
		// Resolve Constants
		try {
			await resolveConstants(client);
			console.info(MESSAGE.ready.constant.success(Date.now() - constStartTime));
		} catch (err) {
			console.error(MESSAGE.rawError(err.message));
		}

		// Finished registering slash commands and marks the bot as ready
		console.info(MESSAGE.ready.done(c.user.tag, Date.now() - timeTaken));
	});
};
