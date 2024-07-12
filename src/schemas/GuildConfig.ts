import { model, Schema } from "mongoose";

interface IGuildConfig {
    guildId: string;
}

//@ts-ignore
export default model<IGuildConfig>('GuildConfig', new Schema<IGuildConfig>({guildId: String}, {timestamps: true}))