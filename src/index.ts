import { Client, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import interactionCreate from './listener/interactionCreate';
import ready from './listener/ready';
import path = require('path');
import fs = require('fs');
const TOKEN = process.env.BOT_TOKEN || '';
const CLIENT_ID = process.env.CLIENT_ID || '';
const GUILD_ID = process.env.GUILD_ID || '';
const COMMANDS_PATH = 'commands';
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Slash command responses
interactionCreate(client);

// When the client is ready, run this code (only once)
ready(client);

// Log in to Discord with client's token
client.login(TOKEN);
