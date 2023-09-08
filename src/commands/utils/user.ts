import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';
import MESSAGE, { embedFooter } from '../../constants';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction: CommandInteraction): Promise<void> {
		try {
			const user = await interaction.user.fetch();
			const createdTime = user.createdTimestamp.toString().slice(0, -3);
			const fields = [
				{ name: ' ', value: `Accent Color: ${user.hexAccentColor || 'No Accent Color'}` }, // Bots don't have accent colors
				{
					name: ' ',
					value: `Avatar Decoration: ${
						user.avatarDecorationURL() || 'No Avatar Decoration'
					}`,
				},
				{
					name: ' ',
					value: `Banner: ${user.bannerURL() || 'No Banner'}`,
				},
				{
					name: ' ',
					value: `Created On: <t:${createdTime}:f> (<t:${createdTime}:R>)`,
				},
				{ name: ' ', value: `Username/Tag: ${user.tag}` },
				{ name: ' ', value: `Flags: ${user.flags.toArray().join(', ')}` },
			];
			const embed = new EmbedBuilder()
				.setAuthor({
					name: `${user.globalName || user.username} ${user.bot ? '(Bot)' : ''}`, // Bots don't have global names
					iconURL: user.displayAvatarURL(),
				})
				.setColor(user.hexAccentColor)
				.addFields(fields)
				.setTimestamp()
				.setFooter(embedFooter);
			await interaction.reply({ embeds: [embed] });
		} catch (err) {
			console.error(err);
			await interaction.reply(MESSAGE.formatError(err.message));
		}
	},
};
