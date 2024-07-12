import Command from "../classes/Command";
import EmaryllisClient from "../classes/EmaryllisClient";
import Category from "../enums/Category";
import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";

export default class DevOnly extends Command {
    constructor(client: EmaryllisClient) {
        super(client, {
            name: 'devonly',
            description: 'Developer only command',
            category: Category.Utilities,
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permission: false,
            dev: true,
            cooldown: 3,
            options: []
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({content: 'This is a developer command', ephemeral: true})
    }
}