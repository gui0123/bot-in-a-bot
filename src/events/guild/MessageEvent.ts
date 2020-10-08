import { Message } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
import { Command } from '../../interfaces/Command';
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
	if (!client.commands.has(cmd.toLowerCase())) return;
	(client.commands.get(cmd.toLowerCase()) as Command).run(client, message, args);
};
