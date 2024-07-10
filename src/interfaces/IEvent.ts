import { Events } from "discord.js";
import EmaryllisClient from "../classes/EmaryllisClient";

export default interface IEvent {
    client: EmaryllisClient;
    name: Events;
    description: string;
    once: boolean;
}