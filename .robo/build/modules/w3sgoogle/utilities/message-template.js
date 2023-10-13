import { EmbedBuilder } from "discord.js";
export function generateSearchEmbedMessage(response, searchQuery) {
    const embed = new EmbedBuilder().setColor(0x0099ff).setTitle(`Search Results`);
    embed.addFields({
        name: `Search query: `,
        value: `${searchQuery}`
    });
    if (response && response.results.length > 0) {
        for(let i = 0; i < response.results.length; i++){
            const r = response.results[i];
            embed.addFields({
                name: `${r.url}`,
                value: `${r.description})`
            });
        }
    } else {
        embed.addFields({
            name: `Whoops! :(`,
            value: `No results found . . . `
        });
    }
    embed.setTimestamp();
    return embed;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFx3M3Nnb29nbGVcXHV0aWxpdGllc1xcbWVzc2FnZS10ZW1wbGF0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbWJlZEJ1aWxkZXIgfSBmcm9tIFwiZGlzY29yZC5qc1wiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyYXRlU2VhcmNoRW1iZWRNZXNzYWdlIChyZXNwb25zZSwgc2VhcmNoUXVlcnkpIHtcclxuXHJcbiAgY29uc3QgZW1iZWQgPSBuZXcgRW1iZWRCdWlsZGVyKClcclxuICAuc2V0Q29sb3IoMHgwMDk5ZmYpXHJcbiAgLnNldFRpdGxlKGBTZWFyY2ggUmVzdWx0c2ApO1xyXG5cclxuICBlbWJlZC5hZGRGaWVsZHMoe1xyXG4gICAgbmFtZTogYFNlYXJjaCBxdWVyeTogYCxcclxuICAgIHZhbHVlOiBgJHtzZWFyY2hRdWVyeX1gXHJcbiAgfSlcclxuXHJcbiAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwb25zZS5yZXN1bHRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHIgPSByZXNwb25zZS5yZXN1bHRzW2ldO1xyXG4gICAgICBlbWJlZC5hZGRGaWVsZHMoe1xyXG4gICAgICAgIG5hbWU6IGAke3IudXJsfWAsXHJcbiAgICAgICAgdmFsdWU6IGAke3IuZGVzY3JpcHRpb259KWBcclxuICAgICAgfSlcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgZW1iZWQuYWRkRmllbGRzKHtcclxuICAgICAgbmFtZTogYFdob29wcyEgOihgLFxyXG4gICAgICB2YWx1ZTogYE5vIHJlc3VsdHMgZm91bmQgLiAuIC4gYFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGVtYmVkLnNldFRpbWVzdGFtcCgpO1xyXG4gIHJldHVybiBlbWJlZDtcclxufSJdLCJuYW1lcyI6WyJFbWJlZEJ1aWxkZXIiLCJnZW5lcmF0ZVNlYXJjaEVtYmVkTWVzc2FnZSIsInJlc3BvbnNlIiwic2VhcmNoUXVlcnkiLCJlbWJlZCIsInNldENvbG9yIiwic2V0VGl0bGUiLCJhZGRGaWVsZHMiLCJuYW1lIiwidmFsdWUiLCJyZXN1bHRzIiwibGVuZ3RoIiwiaSIsInIiLCJ1cmwiLCJkZXNjcmlwdGlvbiIsInNldFRpbWVzdGFtcCJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsWUFBWSxRQUFRLGFBQWE7QUFFMUMsT0FBTyxTQUFTQywyQkFBNEJDLFFBQVEsRUFBRUMsV0FBVztJQUUvRCxNQUFNQyxRQUFRLElBQUlKLGVBQ2pCSyxRQUFRLENBQUMsVUFDVEMsUUFBUSxDQUFDLENBQUMsY0FBYyxDQUFDO0lBRTFCRixNQUFNRyxTQUFTLENBQUM7UUFDZEMsTUFBTSxDQUFDLGNBQWMsQ0FBQztRQUN0QkMsT0FBTyxDQUFDLEVBQUVOLFlBQVksQ0FBQztJQUN6QjtJQUVBLElBQUlELFlBQVlBLFNBQVNRLE9BQU8sQ0FBQ0MsTUFBTSxHQUFHLEdBQUc7UUFDM0MsSUFBSyxJQUFJQyxJQUFJLEdBQUdBLElBQUlWLFNBQVNRLE9BQU8sQ0FBQ0MsTUFBTSxFQUFFQyxJQUFLO1lBQ2hELE1BQU1DLElBQUlYLFNBQVNRLE9BQU8sQ0FBQ0UsRUFBRTtZQUM3QlIsTUFBTUcsU0FBUyxDQUFDO2dCQUNkQyxNQUFNLENBQUMsRUFBRUssRUFBRUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCTCxPQUFPLENBQUMsRUFBRUksRUFBRUUsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUM1QjtRQUNGO0lBQ0YsT0FBTztRQUNMWCxNQUFNRyxTQUFTLENBQUM7WUFDZEMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUNsQkMsT0FBTyxDQUFDLHVCQUF1QixDQUFDO1FBQ2xDO0lBQ0Y7SUFFQUwsTUFBTVksWUFBWTtJQUNsQixPQUFPWjtBQUNUIn0=