import { Message } from 'discord.js'
import dbService from '../../../db/service/index.js';
import {allowedMediaTypes} from '../../../types/config.js';

export default async (message: Message) => {
  const mediaChannelRequest = await dbService.getMediaChannel();
  if(mediaChannelRequest.data.channelId === message.channelId && mediaChannelRequest && 
    mediaChannelRequest.code === 200 && 
    mediaChannelRequest.data) {
      const mediaChannel = message.member.guild.channels.cache.get(mediaChannelRequest.data.channelId);
      try {
        if (mediaChannel.isTextBased() && !message.author.bot) {
          const fetchedMessage = await mediaChannel.messages.fetch(message.id);
          if (message.attachments.size > 0) {
            console.log(message.attachments)
            const files = Array.from(message.attachments.values())
            .filter((attachment) => allowedMediaTypes.includes(attachment.contentType))
            .map((attachment) => attachment.url);
            console.log(files)
            await fetchedMessage.delete();
            await mediaChannel.send({content: `Posted by @${message.author.username}${message.author.discriminator !== '0' ? 
            `#${message.author.discriminator}` : ''}`, files: files})
          } else {
            await fetchedMessage.delete();
          }
        }    
    } catch (error) {
      console.log('media-channels -> messageCreate.ts -> catch(error): ')
      console.log(error)
    }
  }
}