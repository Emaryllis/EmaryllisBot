import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import ready from './listener/ready';
import path = require('path');
import fs = require('fs');
const TOKEN = process.env.BOT_TOKEN || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
const COMMANDS_PATH = 'commands';
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Handle Slash Commands
client.commands = new Collection();
const foldersPath = path.join(__dirname, COMMANDS_PATH);

for (const folder of fs.readdirSync(foldersPath)) {
	const commandsPath = path.join(foldersPath, folder);
	// Loop
	for (const file of fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts'))) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.warn(
				`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
			);
		}
	}
}

// Slash command responses
client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return; //Narrow type from BaseInteraction to ChatInputCommandInteraction
	const command = interaction.client.commands.get(interaction.commandName);
	if (!command) return console.error(`No command matching ${interaction.commandName} was found.`);

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		} else {
			await interaction.reply({
				content: 'There was an error while executing this command!',
				ephemeral: true,
			});
		}
	}
});
// When the client is ready, run this code (only once)
ready(client);
// Log in to Discord with client's token
client.login(TOKEN);
