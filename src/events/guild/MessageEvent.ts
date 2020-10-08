import { Message } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
interface Anything {
	[key: string]: any;
}
export const name: string = 'message';
export const run: RunFunction = async (client, message: Message) => {
	if (
		message.author.bot ||
		!message.guild ||
		!message.content.toLowerCase().startsWith(client.prefix)
	)
		return;
	const [cmd, ...args]: string[] = message.content
		.slice(client.prefix.length)
		.trim()
		.split(/ +/g);
	if (
		!client.commands.has(cmd.toLowerCase()) &&
		!client.commands.get(client.aliases.get(cmd.toLowerCase()))
	)
		return;
	const command: Anything =
		client.commands.get(cmd.toLowerCase()) ||
		client.commands.get(client.aliases.get(cmd.toLowerCase()));
	command.run(client, message, args);
};
