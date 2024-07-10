import EmaryllisClient from "../classes/EmaryllisClient";
import { ChatInputCommandInteraction } from "discord.js";
import SubCommand from "../classes/SubCommand";

export default class TestArg1 extends SubCommand {
    constructor(client: EmaryllisClient) {
        super(client, {
            name: 'test.second'
        });
    }

    Execute(interaction: ChatInputCommandInteraction) {
        interaction.reply({
            content: 'Test command arg 2 was executed!',
            ephemeral: true
        });
    }
}