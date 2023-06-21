import { config } from 'dotenv';
config();

export default {
	clientOptions: {
		intents: [
			'Guilds',
			'GuildMessages',
			'MessageContent',
      'GuildMessageReactions',
      'GuildMessageTyping'
		]
	},
	plugins: []
}
