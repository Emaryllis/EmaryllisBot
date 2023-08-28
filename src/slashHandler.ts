import { REST, Routes } from 'discord.js';
import loadSlash from './loadSlash';
const TOKEN = process.env.BOT_TOKEN || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
const GUILD_ID = process.env.GUILD_ID || '';
export default async function slashHandler() {
	const commands = loadSlash('server') as Array<any>;
	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(TOKEN);

	try {
		console.info(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
			body: commands,
		});
		console.info(`Successfully reloaded ${Object.keys(data).length} application (/) commands.`);
	} catch (err) {
		console.error(err);
	}
}
