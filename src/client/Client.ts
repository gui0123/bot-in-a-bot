import consola, { Consola } from 'consola';
import {
	Client,
	Collection,
	Intents,
	Message,
	MessageEmbed,
	MessageEmbedOptions,
} from 'discord.js';
import glob from 'glob';
import { promisify } from 'util';
import mongoose from 'mongoose';
import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';
const globPromise = promisify(glob);
class BitClient extends Client {
	public logger: Consola = consola;
	public commands: Collection<string, object> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public cooldowns: Collection<string, number> = new Collection();
	public events: Collection<string, object> = new Collection();
	public prefix: string = '<';
	public categories: Set<string> = new Set();
	public constructor() {
		super({
			ws: { intents: Intents.ALL },
			messageCacheLifetime: 180,
			messageCacheMaxSize: 200,
			messageSweepInterval: 180,
		});
	}
	public async start(token: string, mongoURI: string): Promise<void> {
		this.login(token).catch((e) => this.logger.error(e));
		mongoose
			.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
			.catch((e) => this.logger.error(e));
		const commandFiles: string[] = await globPromise(
			`${__dirname}/../commands/**/*{.js,.ts}`,
		);
		const eventFiles: string[] = await globPromise(
			`${__dirname}/../events/**/*{.js,.ts}`,
		);
		commandFiles.map(async (cmdFile: string) => {
			const cmd = (await import(cmdFile)) as Command;
			this.commands.set(cmd.name, cmd);
			if (cmd.aliases) {
				cmd.aliases.map((alias: string) => this.aliases.set(alias, cmd.name));
			}
			this.categories.add(cmd.category);
		});
		eventFiles.map(async (eventFile: string) => {
			const ev = (await import(eventFile)) as Event;
			this.events.set(ev.name, ev);
			(ev.emitter || this).on(ev.name, ev.run.bind(null, this));
		});
	}
	public embed(data: MessageEmbedOptions, message: Message): MessageEmbed {
		return new MessageEmbed({
			...data,
			color: 'RANDOM',
			footer: {
				text: message.author.tag,
				iconURL: message.author.displayAvatarURL({ dynamic: true, format: 'png' }),
			},
		});
	}
}
export { BitClient };
