import path = require('path');
import fs = require('fs');
import { Collection, SlashCommandBuilder } from 'discord.js';
import { COMMANDS_PATH } from '.';
/**
 * Loads commands from a specified directory and returns either a Collection or an Array based on the value of type.
 * @param loadType - The type of commands to load. It can be either 'global' or any other value.
 * @returns If type is 'global', returns a Collection<any, any> containing the loaded commands. If type is not 'global', returns an Array<any> containing the JSON representations of the loaded commands.
 */
export default function getCommands(): Collection<
	string,
	{ data: SlashCommandBuilder; execute: Function }
> {
	const foldersPath = path.join(__dirname, COMMANDS_PATH); // Path to ./src/commands
	const clientCommands = new Collection<
		string,
		{ data: SlashCommandBuilder; execute: Function }
	>();

	for (const folder of fs.readdirSync(foldersPath)) {
		const commandsPath = path.join(foldersPath, folder);

		// Loop thru all ts files under ./src/commands
		for (const file of fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))) {
			const filePath = path.join(commandsPath, file);
			const command = require(filePath);

			// Set a new item in the Collection with the key as the command name and the value as the exported module
			if ('data' in command && 'execute' in command) {
				clientCommands.set(command.data.name, command);
			} else {
				console.warn(
					`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
				);
			}
		}
	}
	return clientCommands;
}
