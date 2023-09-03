const startTime = Date.now(); // Importing modules takes time so putting it here instead of the bottom will give a more accurate startup time
console.info('Bot starting up...');
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import interactionCreate from './events/interactionCreate';
import ready from './events/ready';
import getCommands from './getCommands';
const TOKEN = process.env.BOT_TOKEN || '';
export const COMMANDS_PATH = 'commands';

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Put command data to client as commands property for easy access
client.commands = getCommands() as Collection<any, any>;

// Slash command responses
interactionCreate(client);

// When the client is ready, run this code
ready(client, startTime);

// Log in to Discord with client's token
client.login(TOKEN);
