import consola, { Consola } from "consola";
import { Client, Collection, Intents } from 'discord.js';
import * as mongoose from "mongoose";
class BitClient extends Client {
	private logger: Consola = consola;
	public constructor() {
		super({
			ws: { intents: Intents.ALL },
			messageCacheLifetime: 180,
			messageCacheMaxSize: 200,
			messageSweepInterval: 180,
		});
	};
	public start(token: string) {
		this.login(token).catch((e) => this.logger.error(e))
	}
}
export { BitClient };
