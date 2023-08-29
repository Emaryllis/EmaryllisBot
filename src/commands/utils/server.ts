import { EmbedBuilder, SlashCommandBuilder } from 'discord.js';

module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Provides information about the server.'),
	async execute(interaction: {
		guild: { vanityURLCode: null; name: any; memberCount: any; fetchOwner: () => any };
		reply: (arg0: { embeds: EmbedBuilder[] }) => any;
	}): Promise<void> {
		try {
			const vanityURL =
				interaction.guild.vanityURLCode === null
					? 'No Vanity URL'
					: `https://discord.gg/${interaction.guild.vanityURLCode}`;

			// interaction.guild is the object representing the Guild in which the command was run
			const exampleEmbed = new EmbedBuilder()
				.setTitle('Server Information')
				// .setDescription('Some description here')
				// .setThumbnail('https://i.imgur.com/AfFp7pu.png')
				.addFields(
					{ name: ' ', value: `Server Name: ${interaction.guild.name}` },
					{ name: ' ', value: `Members: ${interaction.guild.memberCount}` },
					{ name: ' ', value: `Server Owner: ${await interaction.guild.fetchOwner()}` },
					{ name: ' ', value: `Vanity URL: ${vanityURL}` }
				)
				// .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
				// .setImage('https://i.imgur.com/AfFp7pu.png')
				.setTimestamp()
				.setFooter({ text: 'Made by Raven :3' });

			await interaction.reply({ embeds: [exampleEmbed] });
		} catch (err) {
			console.error(err);
			await interaction.reply(err.message);
		}
	},
};
