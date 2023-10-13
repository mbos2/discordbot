import "dotenv/config";
import { createOrStartQuotesJob } from "../utils/utils.js";
import { QuoteCategory } from "../../../types/types.js";
const timeChoices = [];
for(let i = 1; i <= 24; i++){
    const time = i < 10 ? `0${i}` : i;
    timeChoices.push({
        name: `At ${time}:00`,
        value: i.toString()
    });
}
const categoryChoices = [];
for(const category in QuoteCategory){
    categoryChoices.push({
        name: category,
        value: category.toLowerCase()
    });
}
export const config = {
    description: 'Starts CRON job for sending quotes in set interval',
    options: [
        {
            name: 'channel',
            required: true,
            description: 'Choose a channel'
        },
        {
            name: 'category',
            required: true,
            description: 'Choose quote category',
            choices: categoryChoices
        },
        {
            name: 'time',
            required: true,
            description: 'Once a day, at: ',
            choices: timeChoices
        }
    ]
};
export default (async (event)=>{
    const channelId = event.options._hoistedOptions[0].value.replace(/[<>\#]/g, '');
    const category = event.options._hoistedOptions[1].value;
    const time = Number(event.options._hoistedOptions[2].value);
    const data = {
        channelId: channelId,
        category: category,
        isRunning: 1,
        cronId: category,
        cronHour: time
    };
    const success = createOrStartQuotesJob(data, event);
    if (success) {
        return {
            content: `Quotes instance for category ${category} started`,
            ephemeral: true
        };
    } else {
        return {
            content: `Failed to start quotes instance for category ${category}`,
            ephemeral: true
        };
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxxdW90ZXNcXGNvbW1hbmRzXFxxdW90ZXMtc3RhcnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICdkb3RlbnYvY29uZmlnJ1xyXG5pbXBvcnQgdHlwZSB7IENvbW1hbmRDb25maWcgfSBmcm9tICdAcm9ib3BsYXkvcm9iby5qcydcclxuaW1wb3J0IHsgY3JlYXRlT3JTdGFydFF1b3Rlc0pvYiB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJztcclxuaW1wb3J0IHsgUXVvdGVJbnN0YW5jZSwgUXVvdGVDYXRlZ29yeSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3R5cGVzLmpzJztcclxuXHJcbmNvbnN0IHRpbWVDaG9pY2VzID0gW107XHJcbmZvciAobGV0IGkgPSAxOyBpIDw9IDI0OyBpKyspIHtcclxuICBjb25zdCB0aW1lID0gaSA8IDEwID8gYDAke2l9YCA6IGk7XHJcbiAgdGltZUNob2ljZXMucHVzaCh7XHJcbiAgICBuYW1lOiBgQXQgJHt0aW1lfTowMGAsXHJcbiAgICB2YWx1ZTogaS50b1N0cmluZygpXHJcbiAgfSlcclxufVxyXG5cclxuY29uc3QgY2F0ZWdvcnlDaG9pY2VzID0gW107XHJcbmZvciAoY29uc3QgY2F0ZWdvcnkgaW4gUXVvdGVDYXRlZ29yeSkge1xyXG4gIGNhdGVnb3J5Q2hvaWNlcy5wdXNoKHtcclxuICAgIG5hbWU6IGNhdGVnb3J5LFxyXG4gICAgdmFsdWU6IGNhdGVnb3J5LnRvTG93ZXJDYXNlKClcclxuICB9KVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY29uZmlnOiBDb21tYW5kQ29uZmlnID0ge1xyXG4gIGRlc2NyaXB0aW9uOiAnU3RhcnRzIENST04gam9iIGZvciBzZW5kaW5nIHF1b3RlcyBpbiBzZXQgaW50ZXJ2YWwnLFxyXG4gIG9wdGlvbnM6IFtcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2NoYW5uZWwnLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgZGVzY3JpcHRpb246ICdDaG9vc2UgYSBjaGFubmVsJ1xyXG4gICAgfSxcclxuICAgIHtcclxuICAgICAgbmFtZTogJ2NhdGVnb3J5JyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnQ2hvb3NlIHF1b3RlIGNhdGVnb3J5JyxcclxuICAgICAgY2hvaWNlczogY2F0ZWdvcnlDaG9pY2VzXHJcbiAgICB9LFxyXG4gICAge1xyXG4gICAgICBuYW1lOiAndGltZScsXHJcbiAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICBkZXNjcmlwdGlvbjogJ09uY2UgYSBkYXksIGF0OiAnLFxyXG4gICAgICBjaG9pY2VzOiB0aW1lQ2hvaWNlc1xyXG4gICAgfSxcclxuICBdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChldmVudCkgPT4ge1xyXG4gIGNvbnN0IGNoYW5uZWxJZCA9IGV2ZW50Lm9wdGlvbnMuX2hvaXN0ZWRPcHRpb25zWzBdLnZhbHVlLnJlcGxhY2UoL1s8PlxcI10vZywgJycpO1xyXG4gIGNvbnN0IGNhdGVnb3J5ID0gZXZlbnQub3B0aW9ucy5faG9pc3RlZE9wdGlvbnNbMV0udmFsdWU7XHJcbiAgY29uc3QgdGltZSA9IE51bWJlcihldmVudC5vcHRpb25zLl9ob2lzdGVkT3B0aW9uc1syXS52YWx1ZSk7XHJcblxyXG4gIGNvbnN0IGRhdGE6IFF1b3RlSW5zdGFuY2UgPSB7XHJcbiAgICBjaGFubmVsSWQ6IGNoYW5uZWxJZCxcclxuICAgIGNhdGVnb3J5OiBjYXRlZ29yeSxcclxuICAgIGlzUnVubmluZzogMSxcclxuICAgIGNyb25JZDogY2F0ZWdvcnksXHJcbiAgICBjcm9uSG91cjogdGltZVxyXG4gIH1cclxuXHJcbiAgY29uc3Qgc3VjY2VzcyA9IGNyZWF0ZU9yU3RhcnRRdW90ZXNKb2IoZGF0YSwgZXZlbnQpO1xyXG4gIGlmIChzdWNjZXNzKSB7XHJcbiAgICByZXR1cm4geyBjb250ZW50OiBgUXVvdGVzIGluc3RhbmNlIGZvciBjYXRlZ29yeSAke2NhdGVnb3J5fSBzdGFydGVkYCwgZXBoZW1lcmFsOiB0cnVlIH1cclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHsgY29udGVudDogYEZhaWxlZCB0byBzdGFydCBxdW90ZXMgaW5zdGFuY2UgZm9yIGNhdGVnb3J5ICR7Y2F0ZWdvcnl9YCwgZXBoZW1lcmFsOiB0cnVlIH1cclxuICB9XHJcbn0iXSwibmFtZXMiOlsiY3JlYXRlT3JTdGFydFF1b3Rlc0pvYiIsIlF1b3RlQ2F0ZWdvcnkiLCJ0aW1lQ2hvaWNlcyIsImkiLCJ0aW1lIiwicHVzaCIsIm5hbWUiLCJ2YWx1ZSIsInRvU3RyaW5nIiwiY2F0ZWdvcnlDaG9pY2VzIiwiY2F0ZWdvcnkiLCJ0b0xvd2VyQ2FzZSIsImNvbmZpZyIsImRlc2NyaXB0aW9uIiwib3B0aW9ucyIsInJlcXVpcmVkIiwiY2hvaWNlcyIsImV2ZW50IiwiY2hhbm5lbElkIiwiX2hvaXN0ZWRPcHRpb25zIiwicmVwbGFjZSIsIk51bWJlciIsImRhdGEiLCJpc1J1bm5pbmciLCJjcm9uSWQiLCJjcm9uSG91ciIsInN1Y2Nlc3MiLCJjb250ZW50IiwiZXBoZW1lcmFsIl0sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLGdCQUFlO0FBRXRCLFNBQVNBLHNCQUFzQixRQUFRLG9CQUFvQjtBQUMzRCxTQUF3QkMsYUFBYSxRQUFRLDBCQUEwQjtBQUV2RSxNQUFNQyxjQUFjLEVBQUU7QUFDdEIsSUFBSyxJQUFJQyxJQUFJLEdBQUdBLEtBQUssSUFBSUEsSUFBSztJQUM1QixNQUFNQyxPQUFPRCxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUVBLEVBQUUsQ0FBQyxHQUFHQTtJQUNoQ0QsWUFBWUcsSUFBSSxDQUFDO1FBQ2ZDLE1BQU0sQ0FBQyxHQUFHLEVBQUVGLEtBQUssR0FBRyxDQUFDO1FBQ3JCRyxPQUFPSixFQUFFSyxRQUFRO0lBQ25CO0FBQ0Y7QUFFQSxNQUFNQyxrQkFBa0IsRUFBRTtBQUMxQixJQUFLLE1BQU1DLFlBQVlULGNBQWU7SUFDcENRLGdCQUFnQkosSUFBSSxDQUFDO1FBQ25CQyxNQUFNSTtRQUNOSCxPQUFPRyxTQUFTQyxXQUFXO0lBQzdCO0FBQ0Y7QUFFQSxPQUFPLE1BQU1DLFNBQXdCO0lBQ25DQyxhQUFhO0lBQ2JDLFNBQVM7UUFDUDtZQUNFUixNQUFNO1lBQ05TLFVBQVU7WUFDVkYsYUFBYTtRQUNmO1FBQ0E7WUFDRVAsTUFBTTtZQUNOUyxVQUFVO1lBQ1ZGLGFBQWE7WUFDYkcsU0FBU1A7UUFDWDtRQUNBO1lBQ0VILE1BQU07WUFDTlMsVUFBVTtZQUNWRixhQUFhO1lBQ2JHLFNBQVNkO1FBQ1g7S0FDRDtBQUNILEVBQUM7QUFFRCxlQUFlLENBQUEsT0FBT2U7SUFDcEIsTUFBTUMsWUFBWUQsTUFBTUgsT0FBTyxDQUFDSyxlQUFlLENBQUMsRUFBRSxDQUFDWixLQUFLLENBQUNhLE9BQU8sQ0FBQyxXQUFXO0lBQzVFLE1BQU1WLFdBQVdPLE1BQU1ILE9BQU8sQ0FBQ0ssZUFBZSxDQUFDLEVBQUUsQ0FBQ1osS0FBSztJQUN2RCxNQUFNSCxPQUFPaUIsT0FBT0osTUFBTUgsT0FBTyxDQUFDSyxlQUFlLENBQUMsRUFBRSxDQUFDWixLQUFLO0lBRTFELE1BQU1lLE9BQXNCO1FBQzFCSixXQUFXQTtRQUNYUixVQUFVQTtRQUNWYSxXQUFXO1FBQ1hDLFFBQVFkO1FBQ1JlLFVBQVVyQjtJQUNaO0lBRUEsTUFBTXNCLFVBQVUxQix1QkFBdUJzQixNQUFNTDtJQUM3QyxJQUFJUyxTQUFTO1FBQ1gsT0FBTztZQUFFQyxTQUFTLENBQUMsNkJBQTZCLEVBQUVqQixTQUFTLFFBQVEsQ0FBQztZQUFFa0IsV0FBVztRQUFLO0lBQ3hGLE9BQU87UUFDTCxPQUFPO1lBQUVELFNBQVMsQ0FBQyw2Q0FBNkMsRUFBRWpCLFNBQVMsQ0FBQztZQUFFa0IsV0FBVztRQUFLO0lBQ2hHO0FBQ0YsQ0FBQSxFQUFDIn0=