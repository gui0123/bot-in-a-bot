import { Client, Collection, Intents } from 'discord.js';
import * as mongoose from "mongoose";
import Logger from "../log/Logger";
class BitClient extends Client {
    private logger: Logger = new Logger();
	public constructor() {
		super({
			ws: { intents: Intents.ALL },
			messageCacheLifetime: 180,
			messageCacheMaxSize: 200,
			messageSweepInterval: 180,
		});
	};
}
export { BitClient };
