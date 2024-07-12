import Command from "../../classes/Command";
import EmaryllisClient from "../../classes/EmaryllisClient";
import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    EmbedBuilder,
    Events,
    Guild,
    PermissionsBitField
} from "discord.js";
import Category from "../../enums/Category";

export default class Emit extends Command {
    constructor(client: EmaryllisClient) {
        super(client, {
            name: 'emit',
            description: 'Emit an event',
            default_member_permissions: PermissionsBitField.Flags.Administrator,
            dm_permission: false,
            category: Category.Developer,
            dev: true,
            cooldown: 1,
            options: [
                {
                    name: 'event',
                    description: 'The event to emit',
                    required: true,
                    type: ApplicationCommandOptionType.String,
                    choices: [
                        {name: "GuildCreate", value: Events.GuildCreate},
                        {name: "GuildDelete", value: Events.GuildDelete}
                    ]
                }
            ]
        })
    }

    Execute(interaction: ChatInputCommandInteraction) {
        const event = interaction.options.getString('event');
        if (event == Events.GuildCreate || event == Events.GuildDelete) {
            this.client.emit(event, interaction.guild as Guild);
        }
        interaction.reply({
            embeds: [new EmbedBuilder().setColor('Green').setDescription(`Event emitted - \`${event}\``)], ephemeral: true
        })
    }
}