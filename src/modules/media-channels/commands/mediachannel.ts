import 'dotenv/config'
import type { CommandConfig } from '@roboplay/robo.js'
import dbService from '../../../db/service/index.js';

export const config: CommandConfig = {
  description: 'Sets a channel as media only channel',
  options: [
    {
      name: 'channel',
      required: true,
      description: 'Choose a channel'
    }
  ]
}

export default async (event) => {
  console.log(event.options._hoistedOptions)
  const channelId = event.options._hoistedOptions[0].value.match(/\d+/)[0];
  const channelName = event.guild.channels.cache.get(channelId).name;

	try {
    const request = await dbService.setMediaChannel({
      channelName: channelName,
      channelId: channelId
    });
    if (request.code && request.code === 200) {
      return `Media only channel set - <#${channelId}>`       
    }

    return `Media only channel could not be set.`
	} catch(e) {
    console.log(e)
  }
}