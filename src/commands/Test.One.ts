import EmaryllisClient from "../classes/EmaryllisClient";
import { ChatInputCommandInteraction } from "discord.js";
import SubCommand from "../classes/SubCommand";

export default class TestOne extends SubCommand {
    constructor(client: EmaryllisClient) {
        super(client, {
            name: 'test.first'
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({
            content: 'Test command arg 1 was executed!',
            ephemeral: true
        });
    }
}