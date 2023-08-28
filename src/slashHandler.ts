import path = require('path');
import fs = require('fs');
import { REST, Routes } from 'discord.js';
const TOKEN = process.env.BOT_TOKEN || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
const GUILD_ID = process.env.GUILD_ID || '';
const commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
export default async function registerSlash() {
	for (const folder of commandFolders) {
		// Grab all the command files from the commands directory you created earlier
		const commandsPath = path.join(foldersPath, folder);
		const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'));
		// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
		for (const file of commandFiles) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);
			if ('data' in command && 'execute' in command) {
				commands.push(command.data.toJSON());
			} else {
				console.warn(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
				);
			}
		}
	}

	// Construct and prepare an instance of the REST module
	const rest = new REST().setToken(TOKEN);

	// and deploy your commands!
	await (async () => {
		try {
			console.info(`Started refreshing ${commands.length} application (/) commands.`);

			// The put method is used to fully refresh all commands in the guild with the current set
			const data = await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
				body: commands,
			});
			console.info(
				`Successfully reloaded ${Object.keys(data).length} application (/) commands.`
			);
		} catch (err) {
			console.error(err);
		}
	})();
}
