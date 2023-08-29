import { Client, Events } from 'discord.js';
import loadSlash from '../loadSlash';

export default (client: Client): void => {
	// We use 'c' for the event parameter to keep it separate from the already defined 'client'
	client.once(Events.ClientReady, async c => {
		await loadSlash();
		console.info(`${c.user.tag} is ready!`);
	});
};
