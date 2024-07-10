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
            dm_permission: true,
            cooldown: 5,
            options: [
                {
                    name: "first",
                    description: "First option",
                    type: ApplicationCommandOptionType.String
                },
                {
                    name: "second",
                    description: "Second option",
                    type: ApplicationCommandOptionType.String
                }
            ]
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({
            content: 'Test command executed!',
            ephemeral: true
        });
        // Log all option data
        interaction.options.data.forEach(option => {
            console.log(option.name, option.value);
        });
    }
}