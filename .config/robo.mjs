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
	plugins: [],
  sage: {
    errorChannelId: '1123381317338415124' // dev
    // errorChannelId: '1121852107943841802' // Production
  }
}
