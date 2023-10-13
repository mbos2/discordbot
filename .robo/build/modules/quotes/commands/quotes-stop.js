import "dotenv/config";
import { stopAndDeleteQuotesJob } from "../utils/utils.js";
import { ToadScheduler } from "toad-scheduler";
import { QuoteCategory } from "../../../types/types.js";
const scheduler = new ToadScheduler();
const categoryChoices = [];
for(const category in QuoteCategory){
    categoryChoices.push({
        name: category,
        value: category.toLowerCase()
    });
}
export const config = {
    description: 'STOPS CRON job for active quotes category',
    options: [
        {
            name: 'category',
            required: true,
            description: 'Choose quote category',
            choices: categoryChoices
        }
    ]
};
export default (async (event)=>{
    const category = event.options._hoistedOptions[0].value;
    try {
        await stopAndDeleteQuotesJob(category);
        return {
            content: `Quotes instance for category ${category} stopped`,
            ephemeral: true
        };
    } catch (error) {
        console.log(error);
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxxdW90ZXNcXGNvbW1hbmRzXFxxdW90ZXMtc3RvcC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJ2RvdGVudi9jb25maWcnXHJcbmltcG9ydCB0eXBlIHsgQ29tbWFuZENvbmZpZyB9IGZyb20gJ0Byb2JvcGxheS9yb2JvLmpzJ1xyXG5pbXBvcnQgeyBjcmVhdGVPclN0YXJ0UXVvdGVzSm9iLCBzdG9wQW5kRGVsZXRlUXVvdGVzSm9iIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnO1xyXG5pbXBvcnQgeyBUb2FkU2NoZWR1bGVyLCBUYXNrLCBDcm9uSm9iLCBTaW1wbGVJbnRlcnZhbEpvYiB9IGZyb20gJ3RvYWQtc2NoZWR1bGVyJztcclxuaW1wb3J0IHsgUXVvdGVJbnN0YW5jZSwgUXVvdGVDYXRlZ29yeSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3R5cGVzLmpzJztcclxuaW1wb3J0IGRiU2VydmljZSBmcm9tICcuLi8uLi8uLi9kYi9zZXJ2aWNlL2luZGV4LmpzJztcclxuXHJcbmNvbnN0IHNjaGVkdWxlciA9IG5ldyBUb2FkU2NoZWR1bGVyKCk7XHJcblxyXG5jb25zdCBjYXRlZ29yeUNob2ljZXMgPSBbXTtcclxuZm9yIChjb25zdCBjYXRlZ29yeSBpbiBRdW90ZUNhdGVnb3J5KSB7XHJcbiAgY2F0ZWdvcnlDaG9pY2VzLnB1c2goe1xyXG4gICAgbmFtZTogY2F0ZWdvcnksXHJcbiAgICB2YWx1ZTogY2F0ZWdvcnkudG9Mb3dlckNhc2UoKVxyXG4gIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBjb25maWc6IENvbW1hbmRDb25maWcgPSB7XHJcbiAgZGVzY3JpcHRpb246ICdTVE9QUyBDUk9OIGpvYiBmb3IgYWN0aXZlIHF1b3RlcyBjYXRlZ29yeScsXHJcbiAgb3B0aW9uczogW1xyXG4gICAge1xyXG4gICAgICBuYW1lOiAnY2F0ZWdvcnknLFxyXG4gICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgZGVzY3JpcHRpb246ICdDaG9vc2UgcXVvdGUgY2F0ZWdvcnknLFxyXG4gICAgICBjaG9pY2VzOiBjYXRlZ29yeUNob2ljZXNcclxuICAgIH0sXHJcbiAgXVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoZXZlbnQpID0+IHtcclxuICBjb25zdCBjYXRlZ29yeSA9IGV2ZW50Lm9wdGlvbnMuX2hvaXN0ZWRPcHRpb25zWzBdLnZhbHVlO1xyXG4gIHRyeSB7XHJcbiAgICBhd2FpdCBzdG9wQW5kRGVsZXRlUXVvdGVzSm9iKGNhdGVnb3J5KTtcclxuICAgIHJldHVybiB7IGNvbnRlbnQ6IGBRdW90ZXMgaW5zdGFuY2UgZm9yIGNhdGVnb3J5ICR7Y2F0ZWdvcnl9IHN0b3BwZWRgLCBlcGhlbWVyYWw6IHRydWUgfVxyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICB9XHJcbn0iXSwibmFtZXMiOlsic3RvcEFuZERlbGV0ZVF1b3Rlc0pvYiIsIlRvYWRTY2hlZHVsZXIiLCJRdW90ZUNhdGVnb3J5Iiwic2NoZWR1bGVyIiwiY2F0ZWdvcnlDaG9pY2VzIiwiY2F0ZWdvcnkiLCJwdXNoIiwibmFtZSIsInZhbHVlIiwidG9Mb3dlckNhc2UiLCJjb25maWciLCJkZXNjcmlwdGlvbiIsIm9wdGlvbnMiLCJyZXF1aXJlZCIsImNob2ljZXMiLCJldmVudCIsIl9ob2lzdGVkT3B0aW9ucyIsImNvbnRlbnQiLCJlcGhlbWVyYWwiLCJlcnJvciIsImNvbnNvbGUiLCJsb2ciXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sZ0JBQWU7QUFFdEIsU0FBaUNBLHNCQUFzQixRQUFRLG9CQUFvQjtBQUNuRixTQUFTQyxhQUFhLFFBQTBDLGlCQUFpQjtBQUNqRixTQUF3QkMsYUFBYSxRQUFRLDBCQUEwQjtBQUd2RSxNQUFNQyxZQUFZLElBQUlGO0FBRXRCLE1BQU1HLGtCQUFrQixFQUFFO0FBQzFCLElBQUssTUFBTUMsWUFBWUgsY0FBZTtJQUNwQ0UsZ0JBQWdCRSxJQUFJLENBQUM7UUFDbkJDLE1BQU1GO1FBQ05HLE9BQU9ILFNBQVNJLFdBQVc7SUFDN0I7QUFDRjtBQUVBLE9BQU8sTUFBTUMsU0FBd0I7SUFDbkNDLGFBQWE7SUFDYkMsU0FBUztRQUNQO1lBQ0VMLE1BQU07WUFDTk0sVUFBVTtZQUNWRixhQUFhO1lBQ2JHLFNBQVNWO1FBQ1g7S0FDRDtBQUNILEVBQUM7QUFFRCxlQUFlLENBQUEsT0FBT1c7SUFDcEIsTUFBTVYsV0FBV1UsTUFBTUgsT0FBTyxDQUFDSSxlQUFlLENBQUMsRUFBRSxDQUFDUixLQUFLO0lBQ3ZELElBQUk7UUFDRixNQUFNUix1QkFBdUJLO1FBQzdCLE9BQU87WUFBRVksU0FBUyxDQUFDLDZCQUE2QixFQUFFWixTQUFTLFFBQVEsQ0FBQztZQUFFYSxXQUFXO1FBQUs7SUFDeEYsRUFBRSxPQUFPQyxPQUFPO1FBQ2RDLFFBQVFDLEdBQUcsQ0FBQ0Y7SUFDZDtBQUNGLENBQUEsRUFBQyJ9