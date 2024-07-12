import Event from "../../classes/Event";
import EmaryllisClient from "../../classes/EmaryllisClient";
import { Events, Guild } from "discord.js";
import GuildConfig from "../../schemas/GuildConfig";

export default class GuildDelete extends Event {
    constructor(client: EmaryllisClient) {
        super(client, {
            name: Events.GuildDelete,
            description: "Fires when the bot leaves a guild",
            once: false
        });
    }

    async Execute(guild: Guild) {
        try {
            await GuildConfig.deleteOne({guildId: guild.id});
        } catch (err) {
            console.error(err);
        }
    }
}