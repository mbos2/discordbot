import { AttachmentBuilder } from "discord.js";
import dbService from "../../../db/service/index.js";
import messageUtil from "./utilities/message-template.js";
export default (async (message)=>{
    const attachmentsArray = [];
    if (message.attachments.size > 0) {
        message.attachments.map((attachment)=>{
            const att = new AttachmentBuilder(attachment.url);
            attachmentsArray.push(att);
        });
    } else {
        console.log('No attachments');
    }
    try {
        const auditChannelRequest = await dbService.getAuditLogChannel();
        if (auditChannelRequest && auditChannelRequest.code === 200 && auditChannelRequest.data) {
            const messageTemplate = messageUtil.generateEmbedMessage(message, 'deleted', message.attachments.size);
            const auditChannel = message.guild.channels.cache.get(auditChannelRequest.data.channelId);
            if (!auditChannel) {
                console.error(`Channel with id ${auditChannelRequest.data.channelId} not found`);
                return;
            }
            if (auditChannel.isTextBased()) {
                await auditChannel.send({
                    embeds: [
                        messageTemplate
                    ],
                    files: attachmentsArray
                });
            }
        }
    } catch (error) {
        console.log(error);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxhdWRpdC1sb2dcXGV2ZW50c1xcbWVzc2FnZURlbGV0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlLCBBdHRhY2htZW50QnVpbGRlciB9IGZyb20gJ2Rpc2NvcmQuanMnXHJcbmltcG9ydCBkYlNlcnZpY2UgZnJvbSAnLi4vLi4vLi4vZGIvc2VydmljZS9pbmRleC5qcyc7XHJcbmltcG9ydCBtZXNzYWdlVXRpbCBmcm9tICcuL3V0aWxpdGllcy9tZXNzYWdlLXRlbXBsYXRlLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XHJcbiAgY29uc3QgYXR0YWNobWVudHNBcnJheSA9IFtdO1xyXG4gIGlmKG1lc3NhZ2UuYXR0YWNobWVudHMuc2l6ZSA+IDApIHtcclxuICAgIG1lc3NhZ2UuYXR0YWNobWVudHMubWFwKGF0dGFjaG1lbnQgPT4ge1xyXG4gICAgICBjb25zdCBhdHQgPSBuZXcgQXR0YWNobWVudEJ1aWxkZXIoYXR0YWNobWVudC51cmwpXHJcbiAgICAgIGF0dGFjaG1lbnRzQXJyYXkucHVzaChhdHQpO1xyXG4gICAgfSkgIFxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb25zb2xlLmxvZygnTm8gYXR0YWNobWVudHMnKVxyXG4gIH1cclxuICB0cnkge1xyXG4gICAgY29uc3QgYXVkaXRDaGFubmVsUmVxdWVzdCA9IGF3YWl0IGRiU2VydmljZS5nZXRBdWRpdExvZ0NoYW5uZWwoKTtcclxuICAgIGlmIChhdWRpdENoYW5uZWxSZXF1ZXN0ICYmIGF1ZGl0Q2hhbm5lbFJlcXVlc3QuY29kZSA9PT0gMjAwICYmIGF1ZGl0Q2hhbm5lbFJlcXVlc3QuZGF0YSkge1xyXG4gICAgICBjb25zdCBtZXNzYWdlVGVtcGxhdGUgPSBtZXNzYWdlVXRpbC5nZW5lcmF0ZUVtYmVkTWVzc2FnZShtZXNzYWdlLCAnZGVsZXRlZCcsIG1lc3NhZ2UuYXR0YWNobWVudHMuc2l6ZSk7XHJcbiAgICAgIGNvbnN0IGF1ZGl0Q2hhbm5lbCA9IG1lc3NhZ2UuZ3VpbGQuY2hhbm5lbHMuY2FjaGUuZ2V0KGF1ZGl0Q2hhbm5lbFJlcXVlc3QuZGF0YS5jaGFubmVsSWQpO1xyXG4gXHJcbiAgICAgIGlmKCFhdWRpdENoYW5uZWwpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKGBDaGFubmVsIHdpdGggaWQgJHthdWRpdENoYW5uZWxSZXF1ZXN0LmRhdGEuY2hhbm5lbElkfSBub3QgZm91bmRgKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmKGF1ZGl0Q2hhbm5lbC5pc1RleHRCYXNlZCgpKSB7XHJcbiAgICAgICAgYXdhaXQgYXVkaXRDaGFubmVsLnNlbmQoe2VtYmVkczogW21lc3NhZ2VUZW1wbGF0ZV0sIGZpbGVzOiBhdHRhY2htZW50c0FycmF5fSlcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIkF0dGFjaG1lbnRCdWlsZGVyIiwiZGJTZXJ2aWNlIiwibWVzc2FnZVV0aWwiLCJtZXNzYWdlIiwiYXR0YWNobWVudHNBcnJheSIsImF0dGFjaG1lbnRzIiwic2l6ZSIsIm1hcCIsImF0dGFjaG1lbnQiLCJhdHQiLCJ1cmwiLCJwdXNoIiwiY29uc29sZSIsImxvZyIsImF1ZGl0Q2hhbm5lbFJlcXVlc3QiLCJnZXRBdWRpdExvZ0NoYW5uZWwiLCJjb2RlIiwiZGF0YSIsIm1lc3NhZ2VUZW1wbGF0ZSIsImdlbmVyYXRlRW1iZWRNZXNzYWdlIiwiYXVkaXRDaGFubmVsIiwiZ3VpbGQiLCJjaGFubmVscyIsImNhY2hlIiwiZ2V0IiwiY2hhbm5lbElkIiwiZXJyb3IiLCJpc1RleHRCYXNlZCIsInNlbmQiLCJlbWJlZHMiLCJmaWxlcyJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBa0JBLGlCQUFpQixRQUFRLGFBQVk7QUFDdkQsT0FBT0MsZUFBZSwrQkFBK0I7QUFDckQsT0FBT0MsaUJBQWlCLGtDQUFrQztBQUUxRCxlQUFlLENBQUEsT0FBT0M7SUFDcEIsTUFBTUMsbUJBQW1CLEVBQUU7SUFDM0IsSUFBR0QsUUFBUUUsV0FBVyxDQUFDQyxJQUFJLEdBQUcsR0FBRztRQUMvQkgsUUFBUUUsV0FBVyxDQUFDRSxHQUFHLENBQUNDLENBQUFBO1lBQ3RCLE1BQU1DLE1BQU0sSUFBSVQsa0JBQWtCUSxXQUFXRSxHQUFHO1lBQ2hETixpQkFBaUJPLElBQUksQ0FBQ0Y7UUFDeEI7SUFDRixPQUFPO1FBQ0xHLFFBQVFDLEdBQUcsQ0FBQztJQUNkO0lBQ0EsSUFBSTtRQUNGLE1BQU1DLHNCQUFzQixNQUFNYixVQUFVYyxrQkFBa0I7UUFDOUQsSUFBSUQsdUJBQXVCQSxvQkFBb0JFLElBQUksS0FBSyxPQUFPRixvQkFBb0JHLElBQUksRUFBRTtZQUN2RixNQUFNQyxrQkFBa0JoQixZQUFZaUIsb0JBQW9CLENBQUNoQixTQUFTLFdBQVdBLFFBQVFFLFdBQVcsQ0FBQ0MsSUFBSTtZQUNyRyxNQUFNYyxlQUFlakIsUUFBUWtCLEtBQUssQ0FBQ0MsUUFBUSxDQUFDQyxLQUFLLENBQUNDLEdBQUcsQ0FBQ1Ysb0JBQW9CRyxJQUFJLENBQUNRLFNBQVM7WUFFeEYsSUFBRyxDQUFDTCxjQUFjO2dCQUNoQlIsUUFBUWMsS0FBSyxDQUFDLENBQUMsZ0JBQWdCLEVBQUVaLG9CQUFvQkcsSUFBSSxDQUFDUSxTQUFTLENBQUMsVUFBVSxDQUFDO2dCQUMvRTtZQUNGO1lBRUEsSUFBR0wsYUFBYU8sV0FBVyxJQUFJO2dCQUM3QixNQUFNUCxhQUFhUSxJQUFJLENBQUM7b0JBQUNDLFFBQVE7d0JBQUNYO3FCQUFnQjtvQkFBRVksT0FBTzFCO2dCQUFnQjtZQUM3RTtRQUNGO0lBQ0YsRUFBRSxPQUFPc0IsT0FBTztRQUNkZCxRQUFRQyxHQUFHLENBQUNhO0lBQ2Q7QUFDRixDQUFBLEVBQUMifQ==