import { Collection, Events, REST, Routes } from "discord.js";
import EmaryllisClient from "../../classes/EmaryllisClient";
import Event from "../../classes/Event";
import Command from "../../classes/Command";

export default class Ready extends Event {
    constructor(client: EmaryllisClient) {
        super(client, {
            name: Events.ClientReady,
            description: 'Fires when the client is ready',
            once: true
        });
    }

    async Execute(...args: any) {
        console.info(`${this.client.user?.tag} is ready!`);

        /* Registering Commands */
        const commands: object[] = this.GetJson(this.client.commands);
        // Making a request to set the application's guild commands
        const rest = new REST().setToken(this.client.config.token);
        const setCommands: any = await rest.put(Routes.applicationGuildCommands(this.client.config.clientId, '1062699755857264742'), {body: commands});
        console.log(`Successfully registered ${setCommands.length} application commands!`);
    }

    /** Converts command collection into json to give to discord
     * Ignores sub commands with any uppercase option names and
     * sends a warning to console
     * */
    private GetJson(commands: Collection<string, Command>) {
        return commands.filter(command => {
            //@ts-ignore
            if (command.options && command.options?.some(option => option.name !== option.name.toLowerCase())) {
                //@ts-ignore
                console.warn(`Sub-command ${command.name}.${command.options.find(option => option.name !== option.name.toLowerCase())?.name} not lowercase! (Command file)`);
                return false;
            }
            return true;
        }).map(command => ({
            name: command.name,
            description: command.description,
            options: command.options,
            default_member_permissions: command.default_member_permissions?.toString(),
            dm_permission: command.dm_permission
        }));
    }
}