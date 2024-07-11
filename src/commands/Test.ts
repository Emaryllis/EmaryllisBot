import Command from "../classes/Command";
import EmaryllisClient from "../classes/EmaryllisClient";
import Category from "../enums/Category";
import { ApplicationCommandOptionType, ChatInputCommandInteraction, PermissionsBitField } from "discord.js";

export default class Test extends Command {
    constructor(client: EmaryllisClient) {
        super(client, {
            name: 'test',
            description: 'A test command',
            category: Category.Utilities,
            default_member_permissions: PermissionsBitField.Flags.UseApplicationCommands,
            dm_permission: false,
            dev: false,
            cooldown: 3,
            options: [
                {
                    name: "first",
                    description: "First option",
                    type: ApplicationCommandOptionType.Subcommand
                },
                {
                    name: "second",
                    description: "Second option",
                    type: ApplicationCommandOptionType.Subcommand
                }
            ]
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
    }
}