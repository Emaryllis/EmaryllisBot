import IConfig from "./IConfig";
import Command from "../classes/Command";
import { Collection } from "discord.js";
import SubCommand from "../classes/SubCommand";
import IAuthor from "./IAuthor";

export default interface IClient {
    author: IAuthor;
    config: IConfig;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;
    developmentMode: boolean;

    Init(): void;

    LoadHandlers(): void;
}