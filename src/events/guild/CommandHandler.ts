import Event from "../../classes/Event";
import EmaryllisClient from "../../classes/EmaryllisClient";
import { ChatInputCommandInteraction, Collection, EmbedBuilder, Events } from "discord.js";
import Command from "../../classes/Command";

export default class CommandHandler extends Event {
    constructor(client: EmaryllisClient) {
        super(client, {
            name: Events.InteractionCreate,
            description: 'Handles all slash commands',
            once: false
        })
    }

    Execute(interaction: ChatInputCommandInteraction) {
        if (!interaction.isChatInputCommand()) return;

        const command: Command = this.client.commands.get(interaction.commandName)!;
        //@ts-ignore
        if (!command) return interaction.reply({
            content: 'Command not found.',
            ephemeral: true
        }) && this.client.commands.delete(interaction.commandName);

        const {cooldowns} = this.client;
        // Set a cooldown if there is none
        if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());

        const now = Date.now();
        const timestamps = cooldowns.get(command.name)!;
        const cooldownAmt = (command.cooldown ?? 3) * 1000;

        /* If command is on cooldown */
        //@ts-ignore
        if (timestamps.has(interaction.user.id) && (now < (timestamps.get(interaction.user.id) ?? 0) + cooldownAmt))
            //@ts-ignore
            return interaction.reply({
                embeds: [new EmbedBuilder()
                             .setColor('Red')
                             .setDescription(`Please wait \`${(((timestamps.get(interaction.user.id) ?? 0) + cooldownAmt - now) / 1000).toFixed(1)}\` seconds before running this command!`)
                ], ephemeral: true
            });

        /* Setting user's timestamp and remove after the cooldown */
        //@ts-ignore
        timestamps.set(interaction.user.id, now);
        //@ts-ignore
        setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmt);

        /* Try to execute command or subcommand */
        try {
            interaction.options.data.forEach(option => {
                const subCommand = this.client.subCommands.get(`${interaction.commandName}.${option.name}`);
                if (subCommand) subCommand.Execute(interaction);
                else {
                    interaction.reply({
                        content: `There was an error while executing option \`${option.name}\`!`,
                        ephemeral: true
                    });
                    console.warn(`Sub-command ${interaction.commandName}.${option.name} file not found!`);
                }
            })
            if (!interaction.options.data[0]?.name) command.Execute(interaction);
        } catch (err) {
            console.error(err);
            interaction.reply({
                content: 'There was an error while executing this command!',
                ephemeral: true
            });
        }
    }
}