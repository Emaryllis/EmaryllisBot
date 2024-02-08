import { Client, CommandInteraction, SlashCommandBuilder, User } from 'discord.js';

export let botAuthor: User;
export let authorURL: string;
export let embedFooter: { text: string; iconURL: string };
export async function resolveConstants(client: Client): Promise<void> {
	botAuthor = await client.users.fetch('595373310955749420');
	authorURL = 'https://github.com/Emaryllis.png';
	embedFooter = {
		text: `Made by ${botAuthor.tag}`,
		iconURL: authorURL,
	};
}

export interface cmd {
	data: SlashCommandBuilder;
	execute: (interaction: CommandInteraction) => Promise<void>;
}

const MESSAGE = {
	// General error messages
	formatError: (errorMsg: string): string => {
		return `An error has occurred\n\n\`${errorMsg}\``;
	},
	rawError: (errorMsg: string): string => {
		return `An error has occurred.\n${errorMsg}`;
	},
	reload: {
		error: (name: string, errorMsg: string): string => {
			return `Reloaded \`${name}\` (**FAILED**)\n\n\`${errorMsg}\``;
		},
		success: (name: string): string => {
			return `Reloaded \`${name}\` (Success)`;
		},
	},
	// Specific file error messages
	stop: {
		fail: 'Shut Down (**FAILED**)\n\n`You are not the owner of this bot.`',
		success: 'Shut Down (**SUCCESS**)',
		console: 'Bot has shut down!',
	},
	ready: {
		done: (tag: string, time: number): string => {
			return `${tag} is ready! (${time}ms)`;
		},
		refresh: {
			start: (len: number): string => {
				return `Started refreshing ${len} application (/) commands.`;
			},
			success: (len: number, time: number): string => {
				return `Successfully refreshed ${len} application (/) commands. (${time}ms)`;
			},
		},
		constant: {
			start: 'Started resolving constants.',
			success: (time: number): string => {
				return `Successfully refreshed constants. (${time}ms)`;
			},
		},
	},
	slashListener: {
		noCommand: (name: string): string => {
			return `No command matching ${name} was found.`;
		},
		userLogger: (datetime: string, tag: string, name: string): string => {
			return `${datetime}: User ${tag} issued /${name}.`;
		},
	},
	slashHandler: {
		missing: (name: string): string => {
			return `Command ${name} is missing a required "data" or "execute" property.`;
		},
	},
};
export default MESSAGE;
