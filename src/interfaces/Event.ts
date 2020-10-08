import { BitClient } from '../client/Client';
export interface RunFunction {
	(client: BitClient, ...params: unknown[]): Promise<void>;
}
export interface Event {
	name: string;
	run: RunFunction;
}
