import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.')
		.setDMPermission(false),
	async execute(interaction: CommandInteraction): Promise<void> {
		try {
			const vanityURL =
				interaction.guild.vanityURLCode === null
					? 'No Vanity URL'
					: `https://discord.gg/${interaction.guild.vanityURLCode}`;

			// interaction.guild is the object representing the Guild in which the command was run
			const serverInfoEmbed = new EmbedBuilder()
				.setTitle('Server Information')
				.addFields(
					{ name: ' ', value: `Server Name: ${interaction.guild.name}` },
					{ name: ' ', value: `Description: ${interaction.guild.description}` },
					{ name: ' ', value: `Members: ${interaction.guild.memberCount}` },
					{ name: ' ', value: `Server Owner: ${await interaction.guild.fetchOwner()}` },
					{ name: ' ', value: `Created On: ${interaction.guild.createdTimestamp}` },
					{
						name: ' ',
						value: `Onboarding: ${(await interaction.guild.fetchOnboarding()).enabled}`,
					},
					{ name: ' ', value: `Server Owner: ${await interaction.guild.fetchOwner()}` },
					{ name: ' ', value: `Server Owner: ${await interaction.guild.fetchOwner()}` },
					{ name: ' ', value: `Server Owner: ${await interaction.guild.fetchOwner()}` },
					{ name: ' ', value: `Server Owner: ${await interaction.guild.fetchOwner()}` },
					{ name: ' ', value: `Vanity URL: ${vanityURL}` }
				)
				.setTimestamp()
				.setFooter({ text: `Made By ${interaction.client.application.owner}` });

			await interaction.reply({ embeds: [serverInfoEmbed] });
		} catch (err) {
			console.error(err);
			await interaction.reply(err.message);
		}
	},
};
