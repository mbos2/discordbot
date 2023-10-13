import { AttachmentBuilder } from "discord.js";
import dbService from "../../../db/service/index.js";
import messageUtil from "./utilities/message-template.js";
export default (async (message)=>{
    if (!message.author.bot) {
        try {
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
                    const messageTemplate = messageUtil.generateEmbedMessage(message, 'updated', message.attachments.size);
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
        } catch (error) {
            console.log(error);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxhdWRpdC1sb2dcXGV2ZW50c1xcbWVzc2FnZVVwZGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlLCBBdHRhY2htZW50QnVpbGRlciB9IGZyb20gJ2Rpc2NvcmQuanMnXHJcbmltcG9ydCBkYlNlcnZpY2UgZnJvbSAnLi4vLi4vLi4vZGIvc2VydmljZS9pbmRleC5qcyc7XHJcbmltcG9ydCBtZXNzYWdlVXRpbCBmcm9tICcuL3V0aWxpdGllcy9tZXNzYWdlLXRlbXBsYXRlLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XHJcbiAgaWYoIW1lc3NhZ2UuYXV0aG9yLmJvdCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgYXR0YWNobWVudHNBcnJheSA9IFtdO1xyXG4gICAgICBpZihtZXNzYWdlLmF0dGFjaG1lbnRzLnNpemUgPiAwKSB7XHJcbiAgICAgICAgbWVzc2FnZS5hdHRhY2htZW50cy5tYXAoYXR0YWNobWVudCA9PiB7XHJcbiAgICAgICAgICBjb25zdCBhdHQgPSBuZXcgQXR0YWNobWVudEJ1aWxkZXIoYXR0YWNobWVudC51cmwpXHJcbiAgICAgICAgICBhdHRhY2htZW50c0FycmF5LnB1c2goYXR0KTtcclxuICAgICAgICB9KSAgXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ05vIGF0dGFjaG1lbnRzJylcclxuICAgICAgfVxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGF1ZGl0Q2hhbm5lbFJlcXVlc3QgPSBhd2FpdCBkYlNlcnZpY2UuZ2V0QXVkaXRMb2dDaGFubmVsKCk7XHJcbiAgICAgICAgaWYgKGF1ZGl0Q2hhbm5lbFJlcXVlc3QgJiYgYXVkaXRDaGFubmVsUmVxdWVzdC5jb2RlID09PSAyMDAgJiYgYXVkaXRDaGFubmVsUmVxdWVzdC5kYXRhKSB7XHJcbiAgICAgICAgICBjb25zdCBtZXNzYWdlVGVtcGxhdGUgPSBtZXNzYWdlVXRpbC5nZW5lcmF0ZUVtYmVkTWVzc2FnZShtZXNzYWdlLCAndXBkYXRlZCcsIG1lc3NhZ2UuYXR0YWNobWVudHMuc2l6ZSk7XHJcbiAgICAgICAgICBjb25zdCBhdWRpdENoYW5uZWwgPSBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzLmNhY2hlLmdldChhdWRpdENoYW5uZWxSZXF1ZXN0LmRhdGEuY2hhbm5lbElkKTtcclxuICAgIFxyXG4gICAgICAgICAgaWYoIWF1ZGl0Q2hhbm5lbCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGBDaGFubmVsIHdpdGggaWQgJHthdWRpdENoYW5uZWxSZXF1ZXN0LmRhdGEuY2hhbm5lbElkfSBub3QgZm91bmRgKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmKGF1ZGl0Q2hhbm5lbC5pc1RleHRCYXNlZCgpKSB7XHJcbiAgICAgICAgICAgIGF3YWl0IGF1ZGl0Q2hhbm5lbC5zZW5kKHtlbWJlZHM6IFttZXNzYWdlVGVtcGxhdGVdLCBmaWxlczogYXR0YWNobWVudHNBcnJheX0pXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXSwibmFtZXMiOlsiQXR0YWNobWVudEJ1aWxkZXIiLCJkYlNlcnZpY2UiLCJtZXNzYWdlVXRpbCIsIm1lc3NhZ2UiLCJhdXRob3IiLCJib3QiLCJhdHRhY2htZW50c0FycmF5IiwiYXR0YWNobWVudHMiLCJzaXplIiwibWFwIiwiYXR0YWNobWVudCIsImF0dCIsInVybCIsInB1c2giLCJjb25zb2xlIiwibG9nIiwiYXVkaXRDaGFubmVsUmVxdWVzdCIsImdldEF1ZGl0TG9nQ2hhbm5lbCIsImNvZGUiLCJkYXRhIiwibWVzc2FnZVRlbXBsYXRlIiwiZ2VuZXJhdGVFbWJlZE1lc3NhZ2UiLCJhdWRpdENoYW5uZWwiLCJndWlsZCIsImNoYW5uZWxzIiwiY2FjaGUiLCJnZXQiLCJjaGFubmVsSWQiLCJlcnJvciIsImlzVGV4dEJhc2VkIiwic2VuZCIsImVtYmVkcyIsImZpbGVzIl0sIm1hcHBpbmdzIjoiQUFBQSxTQUFrQkEsaUJBQWlCLFFBQVEsYUFBWTtBQUN2RCxPQUFPQyxlQUFlLCtCQUErQjtBQUNyRCxPQUFPQyxpQkFBaUIsa0NBQWtDO0FBRTFELGVBQWUsQ0FBQSxPQUFPQztJQUNwQixJQUFHLENBQUNBLFFBQVFDLE1BQU0sQ0FBQ0MsR0FBRyxFQUFFO1FBQ3RCLElBQUk7WUFDRixNQUFNQyxtQkFBbUIsRUFBRTtZQUMzQixJQUFHSCxRQUFRSSxXQUFXLENBQUNDLElBQUksR0FBRyxHQUFHO2dCQUMvQkwsUUFBUUksV0FBVyxDQUFDRSxHQUFHLENBQUNDLENBQUFBO29CQUN0QixNQUFNQyxNQUFNLElBQUlYLGtCQUFrQlUsV0FBV0UsR0FBRztvQkFDaEROLGlCQUFpQk8sSUFBSSxDQUFDRjtnQkFDeEI7WUFDRixPQUFPO2dCQUNMRyxRQUFRQyxHQUFHLENBQUM7WUFDZDtZQUNBLElBQUk7Z0JBQ0YsTUFBTUMsc0JBQXNCLE1BQU1mLFVBQVVnQixrQkFBa0I7Z0JBQzlELElBQUlELHVCQUF1QkEsb0JBQW9CRSxJQUFJLEtBQUssT0FBT0Ysb0JBQW9CRyxJQUFJLEVBQUU7b0JBQ3ZGLE1BQU1DLGtCQUFrQmxCLFlBQVltQixvQkFBb0IsQ0FBQ2xCLFNBQVMsV0FBV0EsUUFBUUksV0FBVyxDQUFDQyxJQUFJO29CQUNyRyxNQUFNYyxlQUFlbkIsUUFBUW9CLEtBQUssQ0FBQ0MsUUFBUSxDQUFDQyxLQUFLLENBQUNDLEdBQUcsQ0FBQ1Ysb0JBQW9CRyxJQUFJLENBQUNRLFNBQVM7b0JBRXhGLElBQUcsQ0FBQ0wsY0FBYzt3QkFDaEJSLFFBQVFjLEtBQUssQ0FBQyxDQUFDLGdCQUFnQixFQUFFWixvQkFBb0JHLElBQUksQ0FBQ1EsU0FBUyxDQUFDLFVBQVUsQ0FBQzt3QkFDL0U7b0JBQ0Y7b0JBRUEsSUFBR0wsYUFBYU8sV0FBVyxJQUFJO3dCQUM3QixNQUFNUCxhQUFhUSxJQUFJLENBQUM7NEJBQUNDLFFBQVE7Z0NBQUNYOzZCQUFnQjs0QkFBRVksT0FBTzFCO3dCQUFnQjtvQkFDN0U7Z0JBQ0Y7WUFDRixFQUFFLE9BQU9zQixPQUFPO2dCQUNkZCxRQUFRQyxHQUFHLENBQUNhO1lBQ2Q7UUFDRixFQUFFLE9BQU9BLE9BQU87WUFDWmQsUUFBUUMsR0FBRyxDQUFDYTtRQUNoQjtJQUNGO0FBQ0YsQ0FBQSxFQUFDIn0=