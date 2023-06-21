import google from "googlethis";
import { generateSearchEmbedMessage } from "../utilities/message-template.js";
export const config = {
    description: 'Searches a w3schools website reference',
    options: [
        {
            name: 'request',
            required: true,
            description: 'Search for W3Schools Reference.'
        }
    ]
};
export default (async (event)=>{
    const options = {
        page: 0,
        safe: false,
        parse_ads: false,
        additional_params: {
            // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
            hl: 'en',
            num: 5
        }
    };
    let response = await google.search(`${event.options._hoistedOptions[0].value} site:w3schools.com`, options);
    if (!response || response.results.length < 1) {
        response = await google.search(`${event.options._hoistedOptions[0].value} site:developer.mozilla.org`, options);
    }
    const messageTemplate = generateSearchEmbedMessage(response, event.options._hoistedOptions[0].value);
    try {
        await event.reply({
            embeds: [
                messageTemplate
            ]
        });
    } catch (error) {
        console.log(error.code);
        // if (error.code === 'InteractionAlreadyReplied') {
        await event.editReply({
            embeds: [
                messageTemplate
            ]
        });
    // }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFx3M3Nnb29nbGVcXGNvbW1hbmRzXFx3M3MudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZENvbmZpZyB9IGZyb20gJ0Byb2JvcGxheS9yb2JvLmpzJztcclxuaW1wb3J0IGdvb2dsZSBmcm9tICdnb29nbGV0aGlzJztcclxuaW1wb3J0IHtnZW5lcmF0ZVNlYXJjaEVtYmVkTWVzc2FnZX0gZnJvbSAnLi4vdXRpbGl0aWVzL21lc3NhZ2UtdGVtcGxhdGUuanMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZzogQ29tbWFuZENvbmZpZyA9IHtcclxuICBkZXNjcmlwdGlvbjogJ1NlYXJjaGVzIGEgdzNzY2hvb2xzIHdlYnNpdGUgcmVmZXJlbmNlJyxcclxuICBvcHRpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdyZXF1ZXN0JyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnU2VhcmNoIGZvciBXM1NjaG9vbHMgUmVmZXJlbmNlLidcclxuICAgIH1cclxuICBdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChldmVudCkgPT4ge1xyXG4gIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICBwYWdlOiAwLCBcclxuICAgIHNhZmU6IGZhbHNlLCAvLyBTYWZlIFNlYXJjaFxyXG4gICAgcGFyc2VfYWRzOiBmYWxzZSwgLy8gSWYgc2V0IHRvIHRydWUgc3BvbnNvcmVkIHJlc3VsdHMgd2lsbCBiZSBwYXJzZWRcclxuICAgIGFkZGl0aW9uYWxfcGFyYW1zOiB7IFxyXG4gICAgICAvLyBhZGQgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGhlcmUsIHNlZSBodHRwczovL21vei5jb20vYmxvZy90aGUtdWx0aW1hdGUtZ3VpZGUtdG8tdGhlLWdvb2dsZS1zZWFyY2gtcGFyYW1ldGVycyBhbmQgaHR0cHM6Ly93d3cuc2VvcXVha2UuY29tL2Jsb2cvZ29vZ2xlLXNlYXJjaC1wYXJhbS9cclxuICAgICAgaGw6ICdlbicsXHJcbiAgICAgIG51bTogNVxyXG4gICAgfVxyXG4gIH1cclxuICAgIFxyXG4gIGxldCByZXNwb25zZSA9IGF3YWl0IGdvb2dsZS5zZWFyY2goYCR7ZXZlbnQub3B0aW9ucy5faG9pc3RlZE9wdGlvbnNbMF0udmFsdWV9IHNpdGU6dzNzY2hvb2xzLmNvbWAsIG9wdGlvbnMpO1xyXG4gIGlmICghcmVzcG9uc2UgfHwgcmVzcG9uc2UucmVzdWx0cy5sZW5ndGggPCAxKSB7XHJcbiAgICByZXNwb25zZSA9IGF3YWl0IGdvb2dsZS5zZWFyY2goYCR7ZXZlbnQub3B0aW9ucy5faG9pc3RlZE9wdGlvbnNbMF0udmFsdWV9IHNpdGU6ZGV2ZWxvcGVyLm1vemlsbGEub3JnYCwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtZXNzYWdlVGVtcGxhdGUgPSBnZW5lcmF0ZVNlYXJjaEVtYmVkTWVzc2FnZShyZXNwb25zZSwgZXZlbnQub3B0aW9ucy5faG9pc3RlZE9wdGlvbnNbMF0udmFsdWUpO1xyXG5cclxuICB0cnkge1xyXG4gICAgYXdhaXQgZXZlbnQucmVwbHkoe2VtYmVkczogW21lc3NhZ2VUZW1wbGF0ZV19KTtcclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IuY29kZSlcclxuICAgIC8vIGlmIChlcnJvci5jb2RlID09PSAnSW50ZXJhY3Rpb25BbHJlYWR5UmVwbGllZCcpIHtcclxuICAgICAgYXdhaXQgZXZlbnQuZWRpdFJlcGx5KHtlbWJlZHM6IFttZXNzYWdlVGVtcGxhdGVdfSk7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG5cclxufSJdLCJuYW1lcyI6WyJnb29nbGUiLCJnZW5lcmF0ZVNlYXJjaEVtYmVkTWVzc2FnZSIsImNvbmZpZyIsImRlc2NyaXB0aW9uIiwib3B0aW9ucyIsIm5hbWUiLCJyZXF1aXJlZCIsImV2ZW50IiwicGFnZSIsInNhZmUiLCJwYXJzZV9hZHMiLCJhZGRpdGlvbmFsX3BhcmFtcyIsImhsIiwibnVtIiwicmVzcG9uc2UiLCJzZWFyY2giLCJfaG9pc3RlZE9wdGlvbnMiLCJ2YWx1ZSIsInJlc3VsdHMiLCJsZW5ndGgiLCJtZXNzYWdlVGVtcGxhdGUiLCJyZXBseSIsImVtYmVkcyIsImVycm9yIiwiY29uc29sZSIsImxvZyIsImNvZGUiLCJlZGl0UmVwbHkiXSwibWFwcGluZ3MiOiJBQUNBLE9BQU9BLFlBQVksYUFBYTtBQUNoQyxTQUFRQywwQkFBMEIsUUFBTyxtQ0FBbUM7QUFFNUUsT0FBTyxNQUFNQyxTQUF3QjtJQUNuQ0MsYUFBYTtJQUNiQyxTQUFTO1FBQ1A7WUFDRUMsTUFBTTtZQUNOQyxVQUFVO1lBQ1ZILGFBQWE7UUFDZjtLQUNEO0FBQ0gsRUFBQztBQUVELGVBQWUsQ0FBQSxPQUFPSTtJQUNwQixNQUFNSCxVQUFVO1FBQ2RJLE1BQU07UUFDTkMsTUFBTTtRQUNOQyxXQUFXO1FBQ1hDLG1CQUFtQjtZQUNqQixxS0FBcUs7WUFDcktDLElBQUk7WUFDSkMsS0FBSztRQUNQO0lBQ0Y7SUFFQSxJQUFJQyxXQUFXLE1BQU1kLE9BQU9lLE1BQU0sQ0FBQyxDQUFDLEVBQUVSLE1BQU1ILE9BQU8sQ0FBQ1ksZUFBZSxDQUFDLEVBQUUsQ0FBQ0MsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUViO0lBQ25HLElBQUksQ0FBQ1UsWUFBWUEsU0FBU0ksT0FBTyxDQUFDQyxNQUFNLEdBQUcsR0FBRztRQUM1Q0wsV0FBVyxNQUFNZCxPQUFPZSxNQUFNLENBQUMsQ0FBQyxFQUFFUixNQUFNSCxPQUFPLENBQUNZLGVBQWUsQ0FBQyxFQUFFLENBQUNDLEtBQUssQ0FBQywyQkFBMkIsQ0FBQyxFQUFFYjtJQUN6RztJQUVBLE1BQU1nQixrQkFBa0JuQiwyQkFBMkJhLFVBQVVQLE1BQU1ILE9BQU8sQ0FBQ1ksZUFBZSxDQUFDLEVBQUUsQ0FBQ0MsS0FBSztJQUVuRyxJQUFJO1FBQ0YsTUFBTVYsTUFBTWMsS0FBSyxDQUFDO1lBQUNDLFFBQVE7Z0JBQUNGO2FBQWdCO1FBQUE7SUFDOUMsRUFBRSxPQUFPRyxPQUFPO1FBQ2RDLFFBQVFDLEdBQUcsQ0FBQ0YsTUFBTUcsSUFBSTtRQUN0QixvREFBb0Q7UUFDbEQsTUFBTW5CLE1BQU1vQixTQUFTLENBQUM7WUFBQ0wsUUFBUTtnQkFBQ0Y7YUFBZ0I7UUFBQTtJQUNsRCxJQUFJO0lBQ047QUFFRixDQUFBLEVBQUMifQ==