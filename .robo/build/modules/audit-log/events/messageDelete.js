import { AttachmentBuilder } from "discord.js";
import dbService from "../../../db/service/index.js";
import messageUtil from "./utilities/message-template.js";
export default (async (message)=>{
    const attachmentsArray = [];
    if (message.attachments.size > 0) {
        console.log(message.attachments);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxhdWRpdC1sb2dcXGV2ZW50c1xcbWVzc2FnZURlbGV0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXNzYWdlLCBBdHRhY2htZW50QnVpbGRlciB9IGZyb20gJ2Rpc2NvcmQuanMnXHJcbmltcG9ydCBkYlNlcnZpY2UgZnJvbSAnLi4vLi4vLi4vZGIvc2VydmljZS9pbmRleC5qcyc7XHJcbmltcG9ydCBtZXNzYWdlVXRpbCBmcm9tICcuL3V0aWxpdGllcy9tZXNzYWdlLXRlbXBsYXRlLmpzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlKSA9PiB7XHJcbiAgY29uc3QgYXR0YWNobWVudHNBcnJheSA9IFtdO1xyXG4gIGlmKG1lc3NhZ2UuYXR0YWNobWVudHMuc2l6ZSA+IDApIHtcclxuICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UuYXR0YWNobWVudHMpXHJcbiAgICBtZXNzYWdlLmF0dGFjaG1lbnRzLm1hcChhdHRhY2htZW50ID0+IHtcclxuICAgICAgY29uc3QgYXR0ID0gbmV3IEF0dGFjaG1lbnRCdWlsZGVyKGF0dGFjaG1lbnQudXJsKVxyXG4gICAgICBhdHRhY2htZW50c0FycmF5LnB1c2goYXR0KTtcclxuICAgIH0pICBcclxuICB9IGVsc2Uge1xyXG4gICAgY29uc29sZS5sb2coJ05vIGF0dGFjaG1lbnRzJylcclxuICB9XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IGF1ZGl0Q2hhbm5lbFJlcXVlc3QgPSBhd2FpdCBkYlNlcnZpY2UuZ2V0QXVkaXRMb2dDaGFubmVsKCk7XHJcbiAgICBpZiAoYXVkaXRDaGFubmVsUmVxdWVzdCAmJiBhdWRpdENoYW5uZWxSZXF1ZXN0LmNvZGUgPT09IDIwMCAmJiBhdWRpdENoYW5uZWxSZXF1ZXN0LmRhdGEpIHtcclxuICAgICAgY29uc3QgbWVzc2FnZVRlbXBsYXRlID0gbWVzc2FnZVV0aWwuZ2VuZXJhdGVFbWJlZE1lc3NhZ2UobWVzc2FnZSwgJ2RlbGV0ZWQnLCBtZXNzYWdlLmF0dGFjaG1lbnRzLnNpemUpO1xyXG4gICAgICBjb25zdCBhdWRpdENoYW5uZWwgPSBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzLmNhY2hlLmdldChhdWRpdENoYW5uZWxSZXF1ZXN0LmRhdGEuY2hhbm5lbElkKTtcclxuIFxyXG4gICAgICBpZighYXVkaXRDaGFubmVsKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihgQ2hhbm5lbCB3aXRoIGlkICR7YXVkaXRDaGFubmVsUmVxdWVzdC5kYXRhLmNoYW5uZWxJZH0gbm90IGZvdW5kYCk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZihhdWRpdENoYW5uZWwuaXNUZXh0QmFzZWQoKSkge1xyXG4gICAgICAgIGF3YWl0IGF1ZGl0Q2hhbm5lbC5zZW5kKHtlbWJlZHM6IFttZXNzYWdlVGVtcGxhdGVdLCBmaWxlczogYXR0YWNobWVudHNBcnJheX0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgfVxyXG59XHJcbiJdLCJuYW1lcyI6WyJBdHRhY2htZW50QnVpbGRlciIsImRiU2VydmljZSIsIm1lc3NhZ2VVdGlsIiwibWVzc2FnZSIsImF0dGFjaG1lbnRzQXJyYXkiLCJhdHRhY2htZW50cyIsInNpemUiLCJjb25zb2xlIiwibG9nIiwibWFwIiwiYXR0YWNobWVudCIsImF0dCIsInVybCIsInB1c2giLCJhdWRpdENoYW5uZWxSZXF1ZXN0IiwiZ2V0QXVkaXRMb2dDaGFubmVsIiwiY29kZSIsImRhdGEiLCJtZXNzYWdlVGVtcGxhdGUiLCJnZW5lcmF0ZUVtYmVkTWVzc2FnZSIsImF1ZGl0Q2hhbm5lbCIsImd1aWxkIiwiY2hhbm5lbHMiLCJjYWNoZSIsImdldCIsImNoYW5uZWxJZCIsImVycm9yIiwiaXNUZXh0QmFzZWQiLCJzZW5kIiwiZW1iZWRzIiwiZmlsZXMiXSwibWFwcGluZ3MiOiJBQUFBLFNBQWtCQSxpQkFBaUIsUUFBUSxhQUFZO0FBQ3ZELE9BQU9DLGVBQWUsK0JBQStCO0FBQ3JELE9BQU9DLGlCQUFpQixrQ0FBa0M7QUFFMUQsZUFBZSxDQUFBLE9BQU9DO0lBQ3BCLE1BQU1DLG1CQUFtQixFQUFFO0lBQzNCLElBQUdELFFBQVFFLFdBQVcsQ0FBQ0MsSUFBSSxHQUFHLEdBQUc7UUFDL0JDLFFBQVFDLEdBQUcsQ0FBQ0wsUUFBUUUsV0FBVztRQUMvQkYsUUFBUUUsV0FBVyxDQUFDSSxHQUFHLENBQUNDLENBQUFBO1lBQ3RCLE1BQU1DLE1BQU0sSUFBSVgsa0JBQWtCVSxXQUFXRSxHQUFHO1lBQ2hEUixpQkFBaUJTLElBQUksQ0FBQ0Y7UUFDeEI7SUFDRixPQUFPO1FBQ0xKLFFBQVFDLEdBQUcsQ0FBQztJQUNkO0lBQ0EsSUFBSTtRQUNGLE1BQU1NLHNCQUFzQixNQUFNYixVQUFVYyxrQkFBa0I7UUFDOUQsSUFBSUQsdUJBQXVCQSxvQkFBb0JFLElBQUksS0FBSyxPQUFPRixvQkFBb0JHLElBQUksRUFBRTtZQUN2RixNQUFNQyxrQkFBa0JoQixZQUFZaUIsb0JBQW9CLENBQUNoQixTQUFTLFdBQVdBLFFBQVFFLFdBQVcsQ0FBQ0MsSUFBSTtZQUNyRyxNQUFNYyxlQUFlakIsUUFBUWtCLEtBQUssQ0FBQ0MsUUFBUSxDQUFDQyxLQUFLLENBQUNDLEdBQUcsQ0FBQ1Ysb0JBQW9CRyxJQUFJLENBQUNRLFNBQVM7WUFFeEYsSUFBRyxDQUFDTCxjQUFjO2dCQUNoQmIsUUFBUW1CLEtBQUssQ0FBQyxDQUFDLGdCQUFnQixFQUFFWixvQkFBb0JHLElBQUksQ0FBQ1EsU0FBUyxDQUFDLFVBQVUsQ0FBQztnQkFDL0U7WUFDRjtZQUVBLElBQUdMLGFBQWFPLFdBQVcsSUFBSTtnQkFDN0IsTUFBTVAsYUFBYVEsSUFBSSxDQUFDO29CQUFDQyxRQUFRO3dCQUFDWDtxQkFBZ0I7b0JBQUVZLE9BQU8xQjtnQkFBZ0I7WUFDN0U7UUFDRjtJQUNGLEVBQUUsT0FBT3NCLE9BQU87UUFDZG5CLFFBQVFDLEdBQUcsQ0FBQ2tCO0lBQ2Q7QUFDRixDQUFBLEVBQUMifQ==