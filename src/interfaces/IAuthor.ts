import { User } from "discord.js";

export default interface IAuthor {
    user: Promise<User>;
    authorIconUrl: string
}