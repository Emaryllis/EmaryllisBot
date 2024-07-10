import { ChatInputCommandInteraction } from "discord.js";
import EmaryllisClient from "./EmaryllisClient";
import ISubCommand from "../interfaces/ISubCommand";
import ISubCommandOptions from "../interfaces/ISubCommandOptions";

export default class SubCommand implements ISubCommand {
    client: EmaryllisClient;
    name: string;

    constructor(client: EmaryllisClient, options: ISubCommandOptions) {
        this.client = client;
        this.name = options.name;
    }

    Execute(interaction: ChatInputCommandInteraction): void {};
}