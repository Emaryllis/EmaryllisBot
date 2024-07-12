import Event from "../../classes/Event";
import EmaryllisClient from "../../classes/EmaryllisClient";
import { Events, Guild, TextChannel } from "discord.js";
import GuildConfig from "../../schemas/GuildConfig";

export default class GuildCreate extends Event {
    constructor(client: EmaryllisClient) {
        super(client, {
            name: Events.GuildCreate,
            description: "Fires when the bot joins a guild",
            once: false
        });
    }

    async Execute(guild: Guild) {
        try {
            if (!await GuildConfig.exists({guildId: guild.id}))
                await GuildConfig.create({guildId: guild.id});
        } catch (err) {
            console.error(err);
        }
        let channel = guild.systemChannel;
        // If guild doesn't have system channel, send to first text channel
        if (!channel) {
            const channels = await guild.channels.fetch();
            const textChannels = Array.from(channels.filter(channel => channel?.isTextBased()).values()) as TextChannel[];
            // If guild doesn't have any text channels, log and return
            if (textChannels.length == 0)
                return console.info(`Guild ${guild.name} (${guild.id}) has no text channels!`);
            else channel = textChannels[0];
        }
        await channel.send(`Hello! I'm Emaryllis, a bot created by <@${(await this.client.author.user).id}>!`).catch();
    }
}