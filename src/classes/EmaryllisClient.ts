import IConfig from "../interfaces/IConfig";
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import IClient from "../interfaces/IClient";
import Handler from "./Handler";
import Command from "./Command";
import SubCommand from "./SubCommand";
import * as process from "process";
import * as console from "console";

export default class EmaryllisClient extends Client implements IClient {
    config: IConfig;
    handler: Handler;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;

    constructor() {
        super({
            intents: [
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildVoiceStates,
                GatewayIntentBits.GuildMessageReactions
            ]
        });
        this.config = {
            token: process.env.BOT_TOKEN ?? '',
            clientId: process.env.CLIENT_ID ?? ''
        }
        this.handler = new Handler(this);
        this.commands = new Collection();
        this.subCommands = new Collection();
        this.cooldowns = new Collection();
    }

    Init(): void {
        this.LoadHandlers();
        this.login(this.config.token).then(_ => console.info("Logged in!")).catch(console.error)
    }

    LoadHandlers(): void {
        this.handler.LoadEvents().then(r => console.info("Loaded events!")).catch(console.error);
        this.handler.LoadCommands().then(r => console.info("Loaded commands!")).catch(console.error);
    }


}