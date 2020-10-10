import { Message } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
import { Parser } from '../../interfaces/Parser';
import hasOwnProp from 'has-own-prop';
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
	const command: Anything =
		client.commands.get(cmd.toLowerCase()) ||
		client.commands.get(client.aliases.get(cmd.toLowerCase()));
	if (command) return command.run(client, message, args);
	else if (!command) {
		const custom: Anything = await client.commandModel.findOne({
			CommandName: cmd.toLowerCase(),
		});
		if (custom) {
			const content: string = custom.Content;
			const cleanContent: string[] = [];
			content.split(/ +/g).map((value: string, index: number) => {
				if (value.startsWith('{') && value.endsWith('}') && value[1] != '/') {
					const key: string = value.substring(1, value.length - 1).toLowerCase();
					const parser: Anything = client.parsers.get(key);
					if (!hasOwnProp(parser || {}, 'run'))
						return message.channel.send(
							client.embed(
								{
									description: `Error at command \`${
										custom.CommandName
									}\`\n\`\`\`\n"${key}" is not a valid parser.\nAt: ${
										index + 1
									} - "${value}"\`\`\`Continuing..`,
								},
								message
							)
						);
					if (!content.includes(`{/${key.toLowerCase()}}`))
						return message.channel.send(
							client.embed(
								{
									description: `Error at command \`${
										custom.CommandName
									}\`\n\`\`\`\n"${key}" does not have a closing tag.\nAt: ${
										index + 1
									} - "${value}"\`\`\`Continuing..`,
								},
								message
							)
						);
				} else return cleanContent.push(value);
			});
			return message.channel.send(cleanContent.join(' ').trim());
		} else return;
	}
};
