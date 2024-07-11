import Command from "../classes/Command";
import EmaryllisClient from "../classes/EmaryllisClient";
import Category from "../enums/Category";
import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    PermissionsBitField
} from "discord.js";

export default class UserInfo extends Command {
    constructor(client: EmaryllisClient) {
        super(client, {
            name: 'userinfo',
            description: 'Get a user\'s information',
            category: Category.Utilities,
            default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: true,
            dev: false,
            cooldown: 3,
            options: [
                {
                    name: "user",
                    description: "Select a user",
                    type: ApplicationCommandOptionType.User
                }
            ]
        });
    }

    async Execute(interaction: ChatInputCommandInteraction) {
        const user = interaction.options.getUser('user') ?? interaction.user;
        await interaction.deferReply();
        const createdTime = user.createdTimestamp.toString().slice(0, -3);
        const fields: any = [
            {name: ' ', value: `Accent Color: ${user.hexAccentColor ?? 'No Accent Color'}`}, // Bots don't have accent colors
            {name: ' ', value: `Avatar Decoration: ${user.avatarDecorationURL() ?? 'No Avatar Decoration'}`},
            {name: ' ', value: `Banner: ${user.bannerURL() ?? 'No Banner'}`},
            {name: ' ', value: `Created On: <t:${createdTime}:f> (<t:${createdTime}:R>)`},
            {name: ' ', value: `Username/Tag: ${user.tag}`},
            {name: ' ', value: `Flags: ${user.flags?.toArray().length ? user.flags.toArray().join(', ') : 'No Flags'}`},
        ];
        return interaction.editReply({
            embeds: [new EmbedBuilder()
                         .setAuthor({
                             name: `${user.globalName ?? user.username} ${user.bot ? '(Bot)' : ''}`, // Bots don't have global names
                             iconURL: user.displayAvatarURL(),
                         })
                         .addFields(fields)
                         .setTimestamp()
                         .setFooter({text: `Made by ${(await this.client.author.user).globalName}`, iconURL: this.client.author.authorIconUrl})]
        })
    }
}