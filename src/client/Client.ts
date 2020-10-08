import consola, { Consola } from "consola";
import { Client, Collection, Intents } from 'discord.js';
import glob from "glob";
import { promisify } from "util";
import * as mongoose from "mongoose";
import { join } from "path";
import { Command } from "../interfaces/Command";
const globPromise = promisify(glob);
class BitClient extends Client {
	private logger: Consola = consola;
	private commands: Collection<string, object> = new Collection();
	private aliases: Collection<string, string> = new Collection();
	private cooldowns: Collection<string, string> = new Collection();
	private events: Collection<string, object> = new Collection();
	public constructor() {
		super({
			ws: { intents: Intents.ALL },
			messageCacheLifetime: 180,
			messageCacheMaxSize: 200,
			messageSweepInterval: 180,
		});
	};
	public async start(token: string) {
		this.login(token).catch((e) => this.logger.error(e));
		this.logger.info(`Loading commands..`);
		const commandFiles: string[] = await globPromise(`${__dirname}/../commands/**/*{.js,.ts}`);
		const eventFiles: string[] = await globPromise(`${__dirname}/../events/**/*{.js,.ts}`);
		commandFiles.map(async(cmdFile: string) => {
			const cmd = await import(cmdFile) as Command;
			this.commands.set(cmd.name, cmd);
			if(cmd.aliases) {
				cmd.aliases.map((alias: string) => this.aliases.set(alias, cmd.name));
			}
		});
	}
}
export { BitClient };
