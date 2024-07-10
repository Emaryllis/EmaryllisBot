import { ChatInputCommandInteraction } from "discord.js";
import EmaryllisClient from "../classes/EmaryllisClient";

export default interface ISubCommand {
    client: EmaryllisClient;
    name: string;

    Execute(interaction: ChatInputCommandInteraction): void;
}