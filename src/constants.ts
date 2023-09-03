import { Client, User } from 'discord.js';

export let botAuthor: User;
export let embedFooter: { text: string };

export default async function resolveConstants(client: Client): Promise<void> {
	botAuthor = await client.users.fetch('595373310955749420');
	embedFooter = { text: `Made by ${botAuthor.tag}` };
}
