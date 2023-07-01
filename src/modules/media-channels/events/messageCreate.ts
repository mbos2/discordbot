import { AttachmentBuilder, Message } from 'discord.js'
import dbService from '../../../db/service/index.js';
import { Modules } from '../../../types/types.js';

export default async (message: any) => {
  const mediaChannelRequest = await dbService.getMediaChannel();
  const mediaChannel = message.member.guild.channels.cache.get(mediaChannelRequest.data.channelId);
  const fetchedMessage = await mediaChannel.messages.fetch(message.id);
  console.log(fetchedMessage)
  if(fetchedMessage && mediaChannelRequest.data.channelId === message.channelId && mediaChannelRequest && 
    mediaChannelRequest.code === 200 && 
    mediaChannelRequest.data) {
    try {
      if(message.attachments.size > 0 && message.content.length < 1 && mediaChannel.isTextBased()) {
          const attachmentsArray = [];
          message.attachments.map(attachment => {
          const att = new AttachmentBuilder(attachment.url)
          attachmentsArray.push(att);
        })
        await fetchedMessage.delete();
      }
    } catch (error) {
      console.log(error)
    }
  }
}
