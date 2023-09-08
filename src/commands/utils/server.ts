import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import MESSAGE, { embedFooter } from '../../constants';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.')
		.setDMPermission(false),
	async execute(interaction: CommandInteraction): Promise<void> {
		try {
			const { guild } = interaction;
			const vanityURL =
				guild.vanityURLCode === null
					? 'No Vanity URL'
					: `https://discord.gg/${guild.vanityURLCode}`;

			const createdTime = guild.createdTimestamp.toString().slice(0, -3);
			const embed = new EmbedBuilder()
				.setTitle('Server Information')
				.addFields(
					{ name: ' ', value: `Server Name: ${guild.name}` },
					{
						name: ' ',
						value: `Description: ${guild.description || 'No Description'}`,
					},
					{ name: ' ', value: `Members: ${guild.memberCount}` },
					{ name: ' ', value: `Server Owner: ${await guild.fetchOwner()}` },
					{
						name: ' ',
						value: `Created On: <t:${createdTime}:f> (<t:${createdTime}:R>)`,
					},
					{
						name: ' ',
						value: `Onboarding: ${
							(await guild.fetchOnboarding()).enabled ? 'Yes' : 'Not Yet'
						}`,
					},
					{ name: ' ', value: `Vanity URL: ${vanityURL}` }
				)
				.setTimestamp()
				.setFooter(embedFooter);

			await interaction.reply({ embeds: [embed] });
		} catch (err) {
			console.error(err);
			await interaction.reply(MESSAGE.formatError(err.message));
		}
	},
};
