import IConfig from "../interfaces/IConfig";
import { Client, Collection, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';
import IClient from "../interfaces/IClient";
import Handler from "./Handler";
import Command from "./Command";
import SubCommand from "./SubCommand";
import IAuthor from "../interfaces/IAuthor";
import { connect } from 'mongoose';

export default class EmaryllisClient extends Client implements IClient {
    author: IAuthor;
    config: IConfig;
    handler: Handler;
    commands: Collection<string, Command>;
    subCommands: Collection<string, SubCommand>;
    cooldowns: Collection<string, Collection<string, number>>;
    developmentMode: boolean;

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
            token: process.env.TOKEN!,
            clientId: process.env.CLIENT_ID!,
            mongoUrl: process.env.MONGO_URL!,
            devToken: process.env.DEV_TOKEN!,
            devClientId: process.env.DEV_CLIENT_ID!,
            devGuildId: process.env.DEV_GUILD_ID!,
            devMongoUrl: process.env.DEV_MONGO_URL!,
            devIds: [process.env.AUTHOR_ID!]
        }
        this.developmentMode = (process.argv.slice(2).includes('--development'));
        this.login(this.developmentMode ? this.config.devToken : this.config.token).then(_ => console.info("Logged in!")).catch(console.error);
        this.author = {
            user: this.users.fetch(process.env.AUTHOR_ID!)!,
            authorIconUrl: process.env.AUTHOR_ICON_URL!
        }
        this.handler = new Handler(this);
        this.commands = new Collection();
        this.subCommands = new Collection();
        this.cooldowns = new Collection();
    }

    Init(): void {
        console.info(`Starting bot in ${this.developmentMode ? 'development' : 'production'} mode!`)
        this.LoadHandlers();

        connect(this.developmentMode ? this.config.devMongoUrl : this.config.mongoUrl).then(_ => console.info("Connected to MongoDB!")).catch(console.error);
    }

    LoadHandlers(): void {
        this.handler.LoadEvents().then(r => console.info("Loaded events!")).catch(console.error);
        this.handler.LoadCommands().then(r => console.info("Loaded commands!")).catch(console.error);
    }
}