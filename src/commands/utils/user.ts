import { CommandInteraction, GuildMember, SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.')
		.setDMPermission(false),
	async execute(interaction: CommandInteraction): Promise<void> {
		await interaction.reply(
			`This command was run by ${interaction.user.username}, who joined on ${
				(interaction.member as GuildMember).joinedAt
			}.`
		);
	},
};
