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
    const request = event.options.get('request')?.value;
    let response = await google.search(`${request} site:w3schools.com`, options);
    if (!response || response.results.length < 1) {
        response = await google.search(`${request} site:developer.mozilla.org`, options);
    }
    const messageTemplate = generateSearchEmbedMessage(response, request);
    return {
        embeds: [
            messageTemplate
        ]
    };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFx3M3Nnb29nbGVcXGNvbW1hbmRzXFx3M3MudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbWFuZENvbmZpZywgQ29tbWFuZFJlc3VsdCB9IGZyb20gJ0Byb2JvcGxheS9yb2JvLmpzJztcclxuaW1wb3J0IGdvb2dsZSBmcm9tICdnb29nbGV0aGlzJztcclxuaW1wb3J0IHtnZW5lcmF0ZVNlYXJjaEVtYmVkTWVzc2FnZX0gZnJvbSAnLi4vdXRpbGl0aWVzL21lc3NhZ2UtdGVtcGxhdGUuanMnO1xyXG5pbXBvcnQgdHlwZSB7IENvbW1hbmRJbnRlcmFjdGlvbiB9IGZyb20gJ2Rpc2NvcmQuanMnO1xyXG5cclxuZXhwb3J0IGNvbnN0IGNvbmZpZzogQ29tbWFuZENvbmZpZyA9IHtcclxuICBkZXNjcmlwdGlvbjogJ1NlYXJjaGVzIGEgdzNzY2hvb2xzIHdlYnNpdGUgcmVmZXJlbmNlJyxcclxuICBvcHRpb25zOiBbXHJcbiAgICB7XHJcbiAgICAgIG5hbWU6ICdyZXF1ZXN0JyxcclxuICAgICAgcmVxdWlyZWQ6IHRydWUsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiAnU2VhcmNoIGZvciBXM1NjaG9vbHMgUmVmZXJlbmNlLidcclxuICAgIH1cclxuICBdXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChldmVudDogQ29tbWFuZEludGVyYWN0aW9uKTogUHJvbWlzZTxDb21tYW5kUmVzdWx0PiA9PiB7XHJcbiAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgIHBhZ2U6IDAsIFxyXG4gICAgc2FmZTogZmFsc2UsIC8vIFNhZmUgU2VhcmNoXHJcbiAgICBwYXJzZV9hZHM6IGZhbHNlLCAvLyBJZiBzZXQgdG8gdHJ1ZSBzcG9uc29yZWQgcmVzdWx0cyB3aWxsIGJlIHBhcnNlZFxyXG4gICAgYWRkaXRpb25hbF9wYXJhbXM6IHsgXHJcbiAgICAgIC8vIGFkZCBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgaGVyZSwgc2VlIGh0dHBzOi8vbW96LmNvbS9ibG9nL3RoZS11bHRpbWF0ZS1ndWlkZS10by10aGUtZ29vZ2xlLXNlYXJjaC1wYXJhbWV0ZXJzIGFuZCBodHRwczovL3d3dy5zZW9xdWFrZS5jb20vYmxvZy9nb29nbGUtc2VhcmNoLXBhcmFtL1xyXG4gICAgICBobDogJ2VuJyxcclxuICAgICAgbnVtOiA1XHJcbiAgICB9XHJcbiAgfVxyXG5cdGNvbnN0IHJlcXVlc3QgPSBldmVudC5vcHRpb25zLmdldCgncmVxdWVzdCcpPy52YWx1ZSBhcyBzdHJpbmc7XHJcbiAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZ29vZ2xlLnNlYXJjaChgJHtyZXF1ZXN0fSBzaXRlOnczc2Nob29scy5jb21gLCBvcHRpb25zKTtcclxuICBpZiAoIXJlc3BvbnNlIHx8IHJlc3BvbnNlLnJlc3VsdHMubGVuZ3RoIDwgMSkge1xyXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBnb29nbGUuc2VhcmNoKGAke3JlcXVlc3R9IHNpdGU6ZGV2ZWxvcGVyLm1vemlsbGEub3JnYCwgb3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBtZXNzYWdlVGVtcGxhdGUgPSBnZW5lcmF0ZVNlYXJjaEVtYmVkTWVzc2FnZShyZXNwb25zZSwgcmVxdWVzdCk7XHJcblxyXG4gIHJldHVybiB7XHJcblx0XHRlbWJlZHM6IFsgbWVzc2FnZVRlbXBsYXRlIF1cclxuXHR9O1xyXG59XHJcbiJdLCJuYW1lcyI6WyJnb29nbGUiLCJnZW5lcmF0ZVNlYXJjaEVtYmVkTWVzc2FnZSIsImNvbmZpZyIsImRlc2NyaXB0aW9uIiwib3B0aW9ucyIsIm5hbWUiLCJyZXF1aXJlZCIsImV2ZW50IiwicGFnZSIsInNhZmUiLCJwYXJzZV9hZHMiLCJhZGRpdGlvbmFsX3BhcmFtcyIsImhsIiwibnVtIiwicmVxdWVzdCIsImdldCIsInZhbHVlIiwicmVzcG9uc2UiLCJzZWFyY2giLCJyZXN1bHRzIiwibGVuZ3RoIiwibWVzc2FnZVRlbXBsYXRlIiwiZW1iZWRzIl0sIm1hcHBpbmdzIjoiQUFDQSxPQUFPQSxZQUFZLGFBQWE7QUFDaEMsU0FBUUMsMEJBQTBCLFFBQU8sbUNBQW1DO0FBRzVFLE9BQU8sTUFBTUMsU0FBd0I7SUFDbkNDLGFBQWE7SUFDYkMsU0FBUztRQUNQO1lBQ0VDLE1BQU07WUFDTkMsVUFBVTtZQUNWSCxhQUFhO1FBQ2Y7S0FDRDtBQUNILEVBQUM7QUFFRCxlQUFlLENBQUEsT0FBT0k7SUFDcEIsTUFBTUgsVUFBVTtRQUNkSSxNQUFNO1FBQ05DLE1BQU07UUFDTkMsV0FBVztRQUNYQyxtQkFBbUI7WUFDakIscUtBQXFLO1lBQ3JLQyxJQUFJO1lBQ0pDLEtBQUs7UUFDUDtJQUNGO0lBQ0QsTUFBTUMsVUFBVVAsTUFBTUgsT0FBTyxDQUFDVyxHQUFHLENBQUMsWUFBWUM7SUFDN0MsSUFBSUMsV0FBVyxNQUFNakIsT0FBT2tCLE1BQU0sQ0FBQyxDQUFDLEVBQUVKLFFBQVEsbUJBQW1CLENBQUMsRUFBRVY7SUFDcEUsSUFBSSxDQUFDYSxZQUFZQSxTQUFTRSxPQUFPLENBQUNDLE1BQU0sR0FBRyxHQUFHO1FBQzVDSCxXQUFXLE1BQU1qQixPQUFPa0IsTUFBTSxDQUFDLENBQUMsRUFBRUosUUFBUSwyQkFBMkIsQ0FBQyxFQUFFVjtJQUMxRTtJQUVBLE1BQU1pQixrQkFBa0JwQiwyQkFBMkJnQixVQUFVSDtJQUU3RCxPQUFPO1FBQ1BRLFFBQVE7WUFBRUQ7U0FBaUI7SUFDNUI7QUFDRCxDQUFBLEVBQUMifQ==