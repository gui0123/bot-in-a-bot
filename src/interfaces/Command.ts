import { Message } from 'discord.js';
import { BitClient } from '../client/Client';

export interface RunFunction {
	(client: BitClient, message: Message, args: string[]): Promise<unknown>;
}
export interface Command {
	name: string;
	run: RunFunction;
	aliases?: string[];
	description?: string;
	cooldown?: string | number;
	category?: string;
}
