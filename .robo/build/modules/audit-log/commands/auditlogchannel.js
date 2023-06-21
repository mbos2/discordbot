import "dotenv/config";
import dbService from "../../../db/service/index.js";
export const config = {
    description: 'Sets a channel for audit logs',
    options: [
        {
            name: 'channel',
            required: true,
            description: 'Set a channel where audit logs will be stored'
        }
    ]
};
export default (async (event)=>{
    console.log(event.options._hoistedOptions);
    const channelId = event.options._hoistedOptions[0].value.match(/\d+/)[0];
    const channelName = event.guild.channels.cache.get(channelId).name;
    try {
        const request = await dbService.setAuditLogChannel({
            channelName: channelName,
            channelId: channelId
        });
        console.log(request);
        if (request.code && request.code === 200) {
            return `Audit log channel set - <#${channelId}>`;
        }
        return `Audit channel could not be set.`;
    } catch (e) {
        console.log(e);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxhdWRpdC1sb2dcXGNvbW1hbmRzXFxhdWRpdGxvZ2NoYW5uZWwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdkb3RlbnYvY29uZmlnJ1xyXG5pbXBvcnQgdHlwZSB7IENvbW1hbmRDb25maWcgfSBmcm9tICdAcm9ib3BsYXkvcm9iby5qcydcclxuaW1wb3J0IGRiU2VydmljZSBmcm9tICcuLi8uLi8uLi9kYi9zZXJ2aWNlL2luZGV4LmpzJztcclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWc6IENvbW1hbmRDb25maWcgPSB7XHJcbiAgZGVzY3JpcHRpb246ICdTZXRzIGEgY2hhbm5lbCBmb3IgYXVkaXQgbG9ncycsXHJcbiAgb3B0aW9uczogW1xyXG4gICAge1xyXG4gICAgICBuYW1lOiAnY2hhbm5lbCcsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ1NldCBhIGNoYW5uZWwgd2hlcmUgYXVkaXQgbG9ncyB3aWxsIGJlIHN0b3JlZCdcclxuICAgIH1cclxuICBdXHJcbn1cclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZXZlbnQpID0+IHtcclxuICBjb25zb2xlLmxvZyhldmVudC5vcHRpb25zLl9ob2lzdGVkT3B0aW9ucylcclxuICBjb25zdCBjaGFubmVsSWQgPSBldmVudC5vcHRpb25zLl9ob2lzdGVkT3B0aW9uc1swXS52YWx1ZS5tYXRjaCgvXFxkKy8pWzBdO1xyXG4gIGNvbnN0IGNoYW5uZWxOYW1lID0gZXZlbnQuZ3VpbGQuY2hhbm5lbHMuY2FjaGUuZ2V0KGNoYW5uZWxJZCkubmFtZTtcclxuXHJcblx0dHJ5IHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSBhd2FpdCBkYlNlcnZpY2Uuc2V0QXVkaXRMb2dDaGFubmVsKHtcclxuICAgICAgY2hhbm5lbE5hbWU6IGNoYW5uZWxOYW1lLFxyXG4gICAgICBjaGFubmVsSWQ6IGNoYW5uZWxJZFxyXG4gICAgfSk7XHJcbiAgICBjb25zb2xlLmxvZyhyZXF1ZXN0KVxyXG4gICAgaWYgKHJlcXVlc3QuY29kZSAmJiByZXF1ZXN0LmNvZGUgPT09IDIwMCkge1xyXG4gICAgICByZXR1cm4gYEF1ZGl0IGxvZyBjaGFubmVsIHNldCAtIDwjJHtjaGFubmVsSWR9PmAgICAgICAgXHJcbiAgICB9IFxyXG5cclxuICAgIHJldHVybiBgQXVkaXQgY2hhbm5lbCBjb3VsZCBub3QgYmUgc2V0LmAgICBcclxuXHR9IGNhdGNoKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbImRiU2VydmljZSIsImNvbmZpZyIsImRlc2NyaXB0aW9uIiwib3B0aW9ucyIsIm5hbWUiLCJyZXF1aXJlZCIsImV2ZW50IiwiY29uc29sZSIsImxvZyIsIl9ob2lzdGVkT3B0aW9ucyIsImNoYW5uZWxJZCIsInZhbHVlIiwibWF0Y2giLCJjaGFubmVsTmFtZSIsImd1aWxkIiwiY2hhbm5lbHMiLCJjYWNoZSIsImdldCIsInJlcXVlc3QiLCJzZXRBdWRpdExvZ0NoYW5uZWwiLCJjb2RlIiwiZSJdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxnQkFBZTtBQUV0QixPQUFPQSxlQUFlLCtCQUErQjtBQUVyRCxPQUFPLE1BQU1DLFNBQXdCO0lBQ25DQyxhQUFhO0lBQ2JDLFNBQVM7UUFDUDtZQUNFQyxNQUFNO1lBQ05DLFVBQVU7WUFDVkgsYUFBYTtRQUNmO0tBQ0Q7QUFDSCxFQUFDO0FBR0QsZUFBZSxDQUFBLE9BQU9JO0lBQ3BCQyxRQUFRQyxHQUFHLENBQUNGLE1BQU1ILE9BQU8sQ0FBQ00sZUFBZTtJQUN6QyxNQUFNQyxZQUFZSixNQUFNSCxPQUFPLENBQUNNLGVBQWUsQ0FBQyxFQUFFLENBQUNFLEtBQUssQ0FBQ0MsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0lBQ3hFLE1BQU1DLGNBQWNQLE1BQU1RLEtBQUssQ0FBQ0MsUUFBUSxDQUFDQyxLQUFLLENBQUNDLEdBQUcsQ0FBQ1AsV0FBV04sSUFBSTtJQUVuRSxJQUFJO1FBQ0QsTUFBTWMsVUFBVSxNQUFNbEIsVUFBVW1CLGtCQUFrQixDQUFDO1lBQ2pETixhQUFhQTtZQUNiSCxXQUFXQTtRQUNiO1FBQ0FILFFBQVFDLEdBQUcsQ0FBQ1U7UUFDWixJQUFJQSxRQUFRRSxJQUFJLElBQUlGLFFBQVFFLElBQUksS0FBSyxLQUFLO1lBQ3hDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRVYsVUFBVSxDQUFDLENBQUM7UUFDbEQ7UUFFQSxPQUFPLENBQUMsK0JBQStCLENBQUM7SUFDM0MsRUFBRSxPQUFNVyxHQUFHO1FBQ1JkLFFBQVFDLEdBQUcsQ0FBQ2E7SUFDZDtBQUNGLENBQUEsRUFBQyJ9