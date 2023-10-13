import { CollectedMessageCategory } from "../../../types/types.js";
import dbService from "../../../db/service/index.js";
const categoryChoices = [];
for (const [key, value] of Object.entries(CollectedMessageCategory)){
    categoryChoices.push({
        name: key,
        value: value
    });
}
export const config = {
    description: 'Collects a message by a message id and stores it in the database',
    options: [
        {
            name: 'id',
            required: true,
            description: 'Message ID'
        },
        {
            name: 'category',
            required: true,
            description: 'Message category',
            choices: categoryChoices
        }
    ]
};
export default (async (event)=>{
    try {
        const messageId = event.options._hoistedOptions[0].value;
        const messageCategory = event.options._hoistedOptions[1].value;
        const fetchedMessage = await event.member.guild.channels.cache.get(event.channelId).messages.fetch(messageId);
        // Need to cover embeds too
        const message = {
            discordUserId: fetchedMessage.author.id,
            discordUsername: fetchedMessage.author.username,
            discordMessageId: fetchedMessage.id,
            content: fetchedMessage.content,
            embeds: JSON.stringify(fetchedMessage.embeds),
            category: messageCategory
        };
        const r = await dbService.collectMessage(message);
        console.log(r);
        if (r.code === 200) {
            return {
                content: 'Message successfully collected',
                ephemeral: true
            };
        } else {
            return {
                content: 'An error occured',
                ephemeral: true
            };
        }
    } catch (error) {
        console.log(error);
        return {
            content: 'An error occured',
            ephemeral: true
        };
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxjb2xsZWN0b3JcXGNvbW1hbmRzXFxjb2xsZWN0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1hbmRDb25maWcgfSBmcm9tICdAcm9ib3BsYXkvcm9iby5qcyc7XHJcbmltcG9ydCB7IENvbGxlY3RlZE1lc3NhZ2UsIENvbGxlY3RlZE1lc3NhZ2VDYXRlZ29yeSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3R5cGVzLmpzJztcclxuaW1wb3J0IGRiU2VydmljZSBmcm9tICcuLi8uLi8uLi9kYi9zZXJ2aWNlL2luZGV4LmpzJztcclxuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxuY29uc3QgY2F0ZWdvcnlDaG9pY2VzID0gW107XHJcbmZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKENvbGxlY3RlZE1lc3NhZ2VDYXRlZ29yeSkpIHtcclxuICBjYXRlZ29yeUNob2ljZXMucHVzaCh7XHJcbiAgICBuYW1lOiBrZXksXHJcbiAgICB2YWx1ZTogdmFsdWVcclxuICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZzogQ29tbWFuZENvbmZpZyA9IHtcclxuICBkZXNjcmlwdGlvbjogJ0NvbGxlY3RzIGEgbWVzc2FnZSBieSBhIG1lc3NhZ2UgaWQgYW5kIHN0b3JlcyBpdCBpbiB0aGUgZGF0YWJhc2UnLFxyXG4gIG9wdGlvbnM6IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2lkJyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnTWVzc2FnZSBJRCdcclxuICAgIH0sXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdjYXRlZ29yeScsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ01lc3NhZ2UgY2F0ZWdvcnknLFxyXG4gICAgICBjaG9pY2VzOiBjYXRlZ29yeUNob2ljZXNcclxuICAgIH1cclxuICBdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChldmVudCkgPT4ge1xyXG4gIHRyeSB7XHJcbiAgICBjb25zdCBtZXNzYWdlSWQgPSBldmVudC5vcHRpb25zLl9ob2lzdGVkT3B0aW9uc1swXS52YWx1ZTtcclxuICAgIGNvbnN0IG1lc3NhZ2VDYXRlZ29yeSA9IGV2ZW50Lm9wdGlvbnMuX2hvaXN0ZWRPcHRpb25zWzFdLnZhbHVlO1xyXG4gICAgY29uc3QgZmV0Y2hlZE1lc3NhZ2UgPSBhd2FpdCBldmVudC5tZW1iZXIuZ3VpbGQuY2hhbm5lbHMuY2FjaGUuZ2V0KGV2ZW50LmNoYW5uZWxJZCkubWVzc2FnZXMuZmV0Y2gobWVzc2FnZUlkKTsgXHJcbiAgICAvLyBOZWVkIHRvIGNvdmVyIGVtYmVkcyB0b29cclxuICAgIGNvbnN0IG1lc3NhZ2U6IENvbGxlY3RlZE1lc3NhZ2UgPSB7XHJcbiAgICAgIGRpc2NvcmRVc2VySWQ6IGZldGNoZWRNZXNzYWdlLmF1dGhvci5pZCxcclxuICAgICAgZGlzY29yZFVzZXJuYW1lOiBmZXRjaGVkTWVzc2FnZS5hdXRob3IudXNlcm5hbWUsXHJcbiAgICAgIGRpc2NvcmRNZXNzYWdlSWQ6IGZldGNoZWRNZXNzYWdlLmlkLFxyXG4gICAgICBjb250ZW50OiBmZXRjaGVkTWVzc2FnZS5jb250ZW50LFxyXG4gICAgICBlbWJlZHM6IEpTT04uc3RyaW5naWZ5KGZldGNoZWRNZXNzYWdlLmVtYmVkcyksXHJcbiAgICAgIGNhdGVnb3J5OiBtZXNzYWdlQ2F0ZWdvcnksXHJcbiAgICB9XHJcbiAgICBjb25zdCByID0gYXdhaXQgZGJTZXJ2aWNlLmNvbGxlY3RNZXNzYWdlKG1lc3NhZ2UpO1xyXG4gICAgY29uc29sZS5sb2cocilcclxuICAgIGlmKHIuY29kZSA9PT0gMjAwKSB7XHJcbiAgICAgIHJldHVybiB7IGNvbnRlbnQ6ICdNZXNzYWdlIHN1Y2Nlc3NmdWxseSBjb2xsZWN0ZWQnLCBlcGhlbWVyYWw6IHRydWUgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHsgY29udGVudDogJ0FuIGVycm9yIG9jY3VyZWQnLCBlcGhlbWVyYWw6IHRydWUgfVxyXG4gICAgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgIHJldHVybiB7IGNvbnRlbnQ6ICdBbiBlcnJvciBvY2N1cmVkJywgZXBoZW1lcmFsOiB0cnVlIH1cclxuICB9XHJcbn0iXSwibmFtZXMiOlsiQ29sbGVjdGVkTWVzc2FnZUNhdGVnb3J5IiwiZGJTZXJ2aWNlIiwiY2F0ZWdvcnlDaG9pY2VzIiwia2V5IiwidmFsdWUiLCJPYmplY3QiLCJlbnRyaWVzIiwicHVzaCIsIm5hbWUiLCJjb25maWciLCJkZXNjcmlwdGlvbiIsIm9wdGlvbnMiLCJyZXF1aXJlZCIsImNob2ljZXMiLCJldmVudCIsIm1lc3NhZ2VJZCIsIl9ob2lzdGVkT3B0aW9ucyIsIm1lc3NhZ2VDYXRlZ29yeSIsImZldGNoZWRNZXNzYWdlIiwibWVtYmVyIiwiZ3VpbGQiLCJjaGFubmVscyIsImNhY2hlIiwiZ2V0IiwiY2hhbm5lbElkIiwibWVzc2FnZXMiLCJmZXRjaCIsIm1lc3NhZ2UiLCJkaXNjb3JkVXNlcklkIiwiYXV0aG9yIiwiaWQiLCJkaXNjb3JkVXNlcm5hbWUiLCJ1c2VybmFtZSIsImRpc2NvcmRNZXNzYWdlSWQiLCJjb250ZW50IiwiZW1iZWRzIiwiSlNPTiIsInN0cmluZ2lmeSIsImNhdGVnb3J5IiwiciIsImNvbGxlY3RNZXNzYWdlIiwiY29uc29sZSIsImxvZyIsImNvZGUiLCJlcGhlbWVyYWwiLCJlcnJvciJdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBMkJBLHdCQUF3QixRQUFRLDBCQUEwQjtBQUNyRixPQUFPQyxlQUFlLCtCQUErQjtBQUdyRCxNQUFNQyxrQkFBa0IsRUFBRTtBQUMxQixLQUFLLE1BQU0sQ0FBQ0MsS0FBS0MsTUFBTSxJQUFJQyxPQUFPQyxPQUFPLENBQUNOLDBCQUEyQjtJQUNuRUUsZ0JBQWdCSyxJQUFJLENBQUM7UUFDbkJDLE1BQU1MO1FBQ05DLE9BQU9BO0lBQ1Q7QUFDRjtBQUVBLE9BQU8sTUFBTUssU0FBd0I7SUFDbkNDLGFBQWE7SUFDYkMsU0FBUztRQUNQO1lBQ0VILE1BQU07WUFDTkksVUFBVTtZQUNWRixhQUFhO1FBQ2Y7UUFDQTtZQUNFRixNQUFNO1lBQ05JLFVBQVU7WUFDVkYsYUFBYTtZQUNiRyxTQUFTWDtRQUNYO0tBQ0Q7QUFDSCxFQUFDO0FBRUQsZUFBZSxDQUFBLE9BQU9ZO0lBQ3BCLElBQUk7UUFDRixNQUFNQyxZQUFZRCxNQUFNSCxPQUFPLENBQUNLLGVBQWUsQ0FBQyxFQUFFLENBQUNaLEtBQUs7UUFDeEQsTUFBTWEsa0JBQWtCSCxNQUFNSCxPQUFPLENBQUNLLGVBQWUsQ0FBQyxFQUFFLENBQUNaLEtBQUs7UUFDOUQsTUFBTWMsaUJBQWlCLE1BQU1KLE1BQU1LLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDQyxRQUFRLENBQUNDLEtBQUssQ0FBQ0MsR0FBRyxDQUFDVCxNQUFNVSxTQUFTLEVBQUVDLFFBQVEsQ0FBQ0MsS0FBSyxDQUFDWDtRQUNuRywyQkFBMkI7UUFDM0IsTUFBTVksVUFBNEI7WUFDaENDLGVBQWVWLGVBQWVXLE1BQU0sQ0FBQ0MsRUFBRTtZQUN2Q0MsaUJBQWlCYixlQUFlVyxNQUFNLENBQUNHLFFBQVE7WUFDL0NDLGtCQUFrQmYsZUFBZVksRUFBRTtZQUNuQ0ksU0FBU2hCLGVBQWVnQixPQUFPO1lBQy9CQyxRQUFRQyxLQUFLQyxTQUFTLENBQUNuQixlQUFlaUIsTUFBTTtZQUM1Q0csVUFBVXJCO1FBQ1o7UUFDQSxNQUFNc0IsSUFBSSxNQUFNdEMsVUFBVXVDLGNBQWMsQ0FBQ2I7UUFDekNjLFFBQVFDLEdBQUcsQ0FBQ0g7UUFDWixJQUFHQSxFQUFFSSxJQUFJLEtBQUssS0FBSztZQUNqQixPQUFPO2dCQUFFVCxTQUFTO2dCQUFrQ1UsV0FBVztZQUFLO1FBQ3RFLE9BQU87WUFDTCxPQUFPO2dCQUFFVixTQUFTO2dCQUFvQlUsV0FBVztZQUFLO1FBQ3hEO0lBQ0YsRUFBRSxPQUFPQyxPQUFPO1FBQ2RKLFFBQVFDLEdBQUcsQ0FBQ0c7UUFDWixPQUFPO1lBQUVYLFNBQVM7WUFBb0JVLFdBQVc7UUFBSztJQUN4RDtBQUNGLENBQUEsRUFBQyJ9