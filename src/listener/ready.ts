import { Client, Events } from 'discord.js';
import slashHandler from '../slashHandler';

export default (client: Client): void => {
	// We use 'c' for the event parameter to keep it separate from the already defined 'client'
	client.once(Events.ClientReady, async c => {
		await slashHandler();
		console.info(`${c.user.tag} is ready!`);
	});
};
