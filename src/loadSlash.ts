import path = require('path');
import fs = require('fs');
import { Collection } from 'discord.js';
/**
 * Loads commands from a specified directory and returns either a Collection or an Array based on the value of type.
 * @param loadType - The type of commands to load. It can be either 'global' or any other value.
 * @returns If type is 'global', returns a Collection<any, any> containing the loaded commands. If type is not 'global', returns an Array<any> containing the JSON representations of the loaded commands.
 */
export default function loadSlash(loadType: string): Collection<any, any> | Array<any> {
	const foldersPath = path.join(__dirname, 'commands'); // Path to ./src/commands
	const commands = [];
	const clientCommands = new Collection();

	for (const folder of fs.readdirSync(foldersPath)) {
		const commandsPath = path.join(foldersPath, folder);

		// Loop thru all ts files under ./src/commands
		for (const file of fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);

			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if ('data' in command && 'execute' in command) {
				if (loadType === 'global') clientCommands.set(command.data.name, command);
				else commands.push(command.data.toJSON());
			} else {
				console.warn(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
				);
			}
		}
	}

	return loadType === 'global' ? clientCommands : commands;
}
