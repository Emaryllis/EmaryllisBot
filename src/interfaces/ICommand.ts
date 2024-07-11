import { AutocompleteInteraction, ChatInputCommandInteraction } from "discord.js";
import Category from "../enums/Category";
import EmaryllisClient from "../classes/EmaryllisClient";

export default interface ICommand {
    client: EmaryllisClient;
    name: string;
    description: string;
    category: Category;
    options: object;
    default_member_permissions: bigint;
    dm_permission: boolean;
    cooldown: number;
    dev: boolean;

    Execute(interaction: ChatInputCommandInteraction): void;

    AutoComplete(interaction: AutocompleteInteraction): void;
}