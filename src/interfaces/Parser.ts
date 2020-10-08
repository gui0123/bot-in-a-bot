import { Message } from 'discord.js';
import { BitClient } from '../client/Client';

export interface RunFunction {
	(client: BitClient, message?: Message, args?: string[]): Promise<unknown>;
}
export interface Parser {
	name: string;
	run: RunFunction;
	cache?: boolean;
}
