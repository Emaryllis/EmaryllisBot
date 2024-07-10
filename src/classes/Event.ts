import EmaryllisClient from "./EmaryllisClient";
import { Events } from "discord.js";
import IEventOptions from "../interfaces/IEventOptions";
import IEvent from "../interfaces/IEvent";

export default class Event implements IEvent {
    client: EmaryllisClient;
    name: Events;
    description: string;
    once: boolean;

    constructor(client: EmaryllisClient, options: IEventOptions) {
        this.client = client;
        this.name = options.name;
        this.description = options.description;
        this.once = options.once;
    }

    Execute(...args: any): void {};
}