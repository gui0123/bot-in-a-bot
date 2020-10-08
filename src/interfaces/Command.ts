import { Message } from 'discord.js';
import { BitClient } from '../client/Client';

export interface RunFunction {
	(client: BitClient, message: Message, args: string[]): Promise<void>;
}
export interface Command {
	name: string;
	run: RunFunction;
	aliases?: string[];
	description?: string;
	cooldown?: string | number;
}
