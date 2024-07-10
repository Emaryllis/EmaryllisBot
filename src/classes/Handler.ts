import * as path from "path";
import { glob } from "glob";
import EmaryllisClient from "./EmaryllisClient";
import Event from "./Event";
import IHandler from "../interfaces/IHandler";
import * as console from "console";
import SubCommand from "./SubCommand";
import Command from "./Command";

export default class Handler implements IHandler {
    client: EmaryllisClient;

    constructor(client: EmaryllisClient) {
        this.client = client;
    }

    async LoadEvents() {
        // Using glob to get all events and resolving their absolute paths using the path module
        const files = (await glob('build/events/**/*.js')).map(filePath => path.resolve(filePath))
        files.map(async (file: string) => {
            // Importing the default export from the file as an Event instance
            const event: Event = new (await import(file)).default(this.client);
            // If the event does not have a name, delete its cache and log a warning
            if (!event.name) return delete require.cache[require.resolve(file)] && console.warn(`Event ${file.split('/').pop()} is missing a name`);
            const execute = (...args: any) => event.Execute(...args); // Execute each event code
            // Check if event should only be fired once
            //@ts-ignore
            if (event.once) this.client.once(event.name, execute);
            //@ts-ignore
            else this.client.on(event.name, execute);

            // Delete the file cache
            return delete require.cache[require.resolve(file)];
        })
    }

    async LoadCommands() {
        // Using glob to get all commands and resolving their absolute paths using the path module
        const files = (await glob('build/commands/**/*.js')).map(filePath => path.resolve(filePath))
        files.map(async (file: string) => {
            // Importing the default export from the file as a Command or SubCommand instance
            const command: Command | SubCommand = new (await import(file)).default(this.client);
            // If the event does not have a name, delete its cache and log a warning
            if (!command.name) return delete require.cache[require.resolve(file)] && console.warn(`Command ${file.split('/').pop()} is missing a name`);

            // If the file name contains a third part after splitting by '.',
            // it is considered a subcommand and added to the subCommands map
            if (file.split('/').pop()?.split('.')[2]) {
                if (command.name !== command.name.toLowerCase())
                    console.warn(`Sub-command ${command.name} not lowercase! (Sub-command file)`)
                else return this.client.subCommands.set(command.name, command);
            }
            // Otherwise, it is considered a command and added to the commands map
            else this.client.commands.set(command.name, command as Command);

            // Delete the file cache
            return delete require.cache[require.resolve(file)];
        })
    }
}