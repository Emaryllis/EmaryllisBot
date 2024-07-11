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
        const clientId = this.client.developmentMode ? this.client.config.devClientId : this.client.config.clientId;
        const rest = new REST().setToken(this.client.config.token);
        if (!this.client.developmentMode) {
            const globalCommands: any = await rest.put(Routes.applicationCommands(clientId), {body: this.GetJson(this.client.commands.filter(command => !command.dev))});
            console.log(`Successfully registered ${globalCommands.length} global application commands!`);
        }
        const devCommands: any = await rest.put(Routes.applicationGuildCommands(clientId, this.client.config.devGuildId), {body: this.GetJson(this.client.commands.filter(command => command.dev))});
        console.log(`Successfully registered ${devCommands.length} developer application commands!`);
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