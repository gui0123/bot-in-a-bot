import { RunFunction } from '../../interfaces/Parser';
export const name: string = 'members';
export const run: RunFunction = async (client, message, args) => {
	const members: number = message.guild.members.cache.size;
	return members;
};
