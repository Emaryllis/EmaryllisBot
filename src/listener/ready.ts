import { Client, GatewayDispatchEvents } from '@discordjs/core';

export default (client: Client): void => {
	client.once(GatewayDispatchEvents.Ready, () => console.log('Ready!'));
};
