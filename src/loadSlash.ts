import { REST, Routes } from 'discord.js';
const TOKEN = process.env.BOT_TOKEN || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
import path = require('path');
import fs = require('fs');
/*
 * This function will load all slash commands from the ./src/commands folder
 * and register them as global slash commands to Discord.
 *
 */
export default async function loadSlash() {
	const foldersPath = path.join(__dirname, 'commands'); // Path to ./src/commands
	const commands = [];

	for (const folder of fs.readdirSync(foldersPath)) {
		const commandsPath = path.join(foldersPath, folder);

		// Loop thru all ts files under ./src/commands
		for (const file of fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);

			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			} else {
				console.warn(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
				);
			}
		}
	}

	try {
		console.info(`Started refreshing ${commands.length} application (/) commands.`);
		const rest = new REST().setToken(TOKEN);
		const data = await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands }); // Register all commands to be global
		console.info(`Successfully reloaded ${Object.keys(data).length} application (/) commands.`);
	} catch (err) {
		console.error(err);
	}
}
