import {
	Client,
	GatewayDispatchEvents,
	GatewayIntentBits,
	InteractionType,
	MessageFlags,
} from '@discordjs/core';
import { REST } from '@discordjs/rest';
import { WebSocketManager } from '@discordjs/ws';
import 'dotenv/config';
import ready from './listener/ready';

// Create REST and WebSocket managers directly
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

const gateway = new WebSocketManager({
	token: process.env.DISCORD_TOKEN,
	intents: GatewayIntentBits.GuildMessages | GatewayIntentBits.MessageContent,
	rest,
});

// Create a client to emit relevant events.
const client = new Client({ rest, gateway });

// Listen for interactions
// Each event contains an `api` prop along with the event data that allows you to interface with the Discord REST API
client.on(GatewayDispatchEvents.InteractionCreate, async ({ data: interaction, api }) => {
	if (
		interaction.type !== InteractionType.ApplicationCommand ||
		interaction.data.name !== 'ping'
	) {
		return;
	}

	await api.interactions.reply(interaction.id, interaction.token, {
		content: 'Pong!',
		flags: MessageFlags.Ephemeral,
	});
});

// Listen for the ready event
ready(client)

// Start the WebSocket connection.
gateway.connect();
