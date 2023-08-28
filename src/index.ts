import { Client, Collection, Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import ready from './listener/ready';
import loadSlash from './loadSlash';
import path = require('path');
import fs = require('fs');
const TOKEN = process.env.BOT_TOKEN || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
const COMMANDS_PATH = 'commands';
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load slash commands
client.commands = loadSlash('global') as Collection<any, any>;

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
