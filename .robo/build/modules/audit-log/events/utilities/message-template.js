import { EmbedBuilder } from "discord.js";
export default {
    generateEmbedMessage: (message, eventType, attachmentsSize)=>{
        const channel = message.guild.channels.cache.find((ch)=>ch.id === message.channelId);
        let event;
        switch(eventType){
            case 'updated':
                event = 'UPDATE';
                break;
            case 'deleted':
                event = 'DELETE';
                break;
        }
        const embed = new EmbedBuilder().setColor(0x0099ff).addFields({
            name: `Message ${eventType} in a channel <#${channel.id}>`,
            value: '\u200B',
            inline: true
        }).addFields({
            name: "Message owner: ",
            value: `${message.author.username}${message.author.discriminator === '0' ? '' : "#" + message.author.discriminator} (${message.author.id})`
        });
        if (eventType === 'updated') {
            embed.addFields({
                name: "Old message content",
                value: message.content.length > 0 ? message.content : '*Textual message content is empty*'
            }).addFields({
                name: "New message content",
                value: message.reactions.message.content.length > 0 ? message.reactions.message.content : '*Textual message content is empty*'
            });
        } else if (eventType === 'deleted') {
            embed.addFields({
                name: "Deleted message content",
                value: message.content.length > 0 ? message.content : '*Textual message content is empty*'
            });
        }
        if (attachmentsSize > 0) {
            embed.addFields({
                name: "Attachments: ",
                value: String(attachmentsSize)
            });
        }
        embed.setTimestamp();
        return embed;
    }
};
export function generateSearchEmbedMessage(response) {
    const embed = new EmbedBuilder().setColor(0x0099ff).setTitle(`Search Results`);
    if (response && response.results.length > 0) {
        for(let i = 0; i < response.results.length; i++){
            const r = response.results[i];
            embed.addFields({
                name: `[${r.url}](${r.url})`,
                value: `${r.description})`
            });
        }
    }
    embed.setTimestamp();
    return embed;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxhdWRpdC1sb2dcXGV2ZW50c1xcdXRpbGl0aWVzXFxtZXNzYWdlLXRlbXBsYXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVtYmVkQnVpbGRlciB9IGZyb20gXCJkaXNjb3JkLmpzXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgZ2VuZXJhdGVFbWJlZE1lc3NhZ2U6IChtZXNzYWdlLCBldmVudFR5cGUsIGF0dGFjaG1lbnRzU2l6ZSkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGNoYW5uZWwgPSBtZXNzYWdlLmd1aWxkLmNoYW5uZWxzLmNhY2hlLmZpbmQoKGNoKSA9PiBjaC5pZCA9PT0gbWVzc2FnZS5jaGFubmVsSWQpO1xyXG4gICAgbGV0IGV2ZW50O1xyXG4gICAgc3dpdGNoIChldmVudFR5cGUpIHtcclxuICAgICAgY2FzZSAndXBkYXRlZCc6XHJcbiAgICAgICAgZXZlbnQgPSAnVVBEQVRFJztcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAnZGVsZXRlZCc6XHJcbiAgICAgICAgZXZlbnQgPSAnREVMRVRFJztcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBlbWJlZCA9IG5ldyBFbWJlZEJ1aWxkZXIoKVxyXG4gICAgLnNldENvbG9yKDB4MDA5OWZmKVxyXG4gICAgLmFkZEZpZWxkcyhcclxuICAgICAge1xyXG4gICAgICAgIG5hbWU6IGBNZXNzYWdlICR7ZXZlbnRUeXBlfSBpbiBhIGNoYW5uZWwgPCMke2NoYW5uZWwuaWR9PmAsXHJcbiAgICAgICAgdmFsdWU6ICdcXHUyMDBCJyxcclxuICAgICAgICBpbmxpbmU6IHRydWVcclxuICAgICAgfSxcclxuICAgIClcclxuICAgIC5hZGRGaWVsZHMoXHJcbiAgICAgIHtcclxuICAgICAgICBuYW1lOiBcIk1lc3NhZ2Ugb3duZXI6IFwiLFxyXG4gICAgICAgIHZhbHVlOiBgJHttZXNzYWdlLmF1dGhvci51c2VybmFtZX0ke21lc3NhZ2UuYXV0aG9yLmRpc2NyaW1pbmF0b3IgPT09ICcwJyA/ICcnIDogXCIjXCIrbWVzc2FnZS5hdXRob3IuZGlzY3JpbWluYXRvcn0gKCR7bWVzc2FnZS5hdXRob3IuaWR9KWBcclxuICAgICAgICAvLyB2YWx1ZTogYDwjJHttZXNzYWdlLmF1dGhvci51c2VybmFtZX0+YCAvLyBDdXJyZW50bHkgZG9lc24ndCB3b3JrIGR1ZSB0byBkaXNjb3JkIGlzc3Vlc1xyXG4gICAgICB9LFxyXG4gICAgKTtcclxuXHJcbiAgICBpZiAoZXZlbnRUeXBlID09PSAndXBkYXRlZCcpIHtcclxuICAgICAgZW1iZWQuYWRkRmllbGRzKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6IFwiT2xkIG1lc3NhZ2UgY29udGVudFwiLFxyXG4gICAgICAgICAgdmFsdWU6IG1lc3NhZ2UuY29udGVudC5sZW5ndGggPiAwID8gbWVzc2FnZS5jb250ZW50IDogJypUZXh0dWFsIG1lc3NhZ2UgY29udGVudCBpcyBlbXB0eSonXHJcbiAgICAgICAgfSxcclxuICAgICAgKVxyXG4gICAgICAuYWRkRmllbGRzKFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIG5hbWU6IFwiTmV3IG1lc3NhZ2UgY29udGVudFwiLFxyXG4gICAgICAgICAgdmFsdWU6IG1lc3NhZ2UucmVhY3Rpb25zLm1lc3NhZ2UuY29udGVudC5sZW5ndGggPiAwID8gbWVzc2FnZS5yZWFjdGlvbnMubWVzc2FnZS5jb250ZW50IDogJypUZXh0dWFsIG1lc3NhZ2UgY29udGVudCBpcyBlbXB0eSonXHJcbiAgICAgICAgfSxcclxuICAgICAgKVxyXG4gICAgfSBlbHNlIGlmIChldmVudFR5cGUgPT09ICdkZWxldGVkJykge1xyXG4gICAgICBlbWJlZC5hZGRGaWVsZHMoXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgbmFtZTogXCJEZWxldGVkIG1lc3NhZ2UgY29udGVudFwiLFxyXG4gICAgICAgICAgdmFsdWU6IG1lc3NhZ2UuY29udGVudC5sZW5ndGggPiAwID8gbWVzc2FnZS5jb250ZW50IDogJypUZXh0dWFsIG1lc3NhZ2UgY29udGVudCBpcyBlbXB0eSonXHJcbiAgICAgICAgfSxcclxuICAgICAgKVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChhdHRhY2htZW50c1NpemUgPiAwKSB7XHJcbiAgICAgIGVtYmVkLmFkZEZpZWxkcyhcclxuICAgICAgICB7XHJcbiAgICAgICAgICBuYW1lOiBcIkF0dGFjaG1lbnRzOiBcIixcclxuICAgICAgICAgIHZhbHVlOiBTdHJpbmcoYXR0YWNobWVudHNTaXplKVxyXG4gICAgICAgIH0sXHJcbiAgICAgIClcclxuICAgIH1cclxuXHJcblxyXG4gICAgZW1iZWQuc2V0VGltZXN0YW1wKCk7XHJcbiAgICByZXR1cm4gZW1iZWQ7XHJcbiAgfSxcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZVNlYXJjaEVtYmVkTWVzc2FnZSAocmVzcG9uc2UpIHtcclxuXHJcbiAgY29uc3QgZW1iZWQgPSBuZXcgRW1iZWRCdWlsZGVyKClcclxuICAuc2V0Q29sb3IoMHgwMDk5ZmYpXHJcbiAgLnNldFRpdGxlKGBTZWFyY2ggUmVzdWx0c2ApO1xyXG5cclxuICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UucmVzdWx0cy5sZW5ndGggPiAwKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3BvbnNlLnJlc3VsdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgY29uc3QgciA9IHJlc3BvbnNlLnJlc3VsdHNbaV07XHJcbiAgICAgIGVtYmVkLmFkZEZpZWxkcyh7XHJcbiAgICAgICAgbmFtZTogYFske3IudXJsfV0oJHtyLnVybH0pYCxcclxuICAgICAgICB2YWx1ZTogYCR7ci5kZXNjcmlwdGlvbn0pYFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZW1iZWQuc2V0VGltZXN0YW1wKCk7XHJcbiAgcmV0dXJuIGVtYmVkO1xyXG59Il0sIm5hbWVzIjpbIkVtYmVkQnVpbGRlciIsImdlbmVyYXRlRW1iZWRNZXNzYWdlIiwibWVzc2FnZSIsImV2ZW50VHlwZSIsImF0dGFjaG1lbnRzU2l6ZSIsImNoYW5uZWwiLCJndWlsZCIsImNoYW5uZWxzIiwiY2FjaGUiLCJmaW5kIiwiY2giLCJpZCIsImNoYW5uZWxJZCIsImV2ZW50IiwiZW1iZWQiLCJzZXRDb2xvciIsImFkZEZpZWxkcyIsIm5hbWUiLCJ2YWx1ZSIsImlubGluZSIsImF1dGhvciIsInVzZXJuYW1lIiwiZGlzY3JpbWluYXRvciIsImNvbnRlbnQiLCJsZW5ndGgiLCJyZWFjdGlvbnMiLCJTdHJpbmciLCJzZXRUaW1lc3RhbXAiLCJnZW5lcmF0ZVNlYXJjaEVtYmVkTWVzc2FnZSIsInJlc3BvbnNlIiwic2V0VGl0bGUiLCJyZXN1bHRzIiwiaSIsInIiLCJ1cmwiLCJkZXNjcmlwdGlvbiJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsWUFBWSxRQUFRLGFBQWE7QUFFMUMsZUFBZTtJQUNiQyxzQkFBc0IsQ0FBQ0MsU0FBU0MsV0FBV0M7UUFFekMsTUFBTUMsVUFBVUgsUUFBUUksS0FBSyxDQUFDQyxRQUFRLENBQUNDLEtBQUssQ0FBQ0MsSUFBSSxDQUFDLENBQUNDLEtBQU9BLEdBQUdDLEVBQUUsS0FBS1QsUUFBUVUsU0FBUztRQUNyRixJQUFJQztRQUNKLE9BQVFWO1lBQ04sS0FBSztnQkFDSFUsUUFBUTtnQkFDUjtZQUNGLEtBQUs7Z0JBQ0hBLFFBQVE7Z0JBQ1I7UUFDSjtRQUVBLE1BQU1DLFFBQVEsSUFBSWQsZUFDakJlLFFBQVEsQ0FBQyxVQUNUQyxTQUFTLENBQ1I7WUFDRUMsTUFBTSxDQUFDLFFBQVEsRUFBRWQsVUFBVSxnQkFBZ0IsRUFBRUUsUUFBUU0sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMxRE8sT0FBTztZQUNQQyxRQUFRO1FBQ1YsR0FFREgsU0FBUyxDQUNSO1lBQ0VDLE1BQU07WUFDTkMsT0FBTyxDQUFDLEVBQUVoQixRQUFRa0IsTUFBTSxDQUFDQyxRQUFRLENBQUMsRUFBRW5CLFFBQVFrQixNQUFNLENBQUNFLGFBQWEsS0FBSyxNQUFNLEtBQUssTUFBSXBCLFFBQVFrQixNQUFNLENBQUNFLGFBQWEsQ0FBQyxFQUFFLEVBQUVwQixRQUFRa0IsTUFBTSxDQUFDVCxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTNJO1FBR0YsSUFBSVIsY0FBYyxXQUFXO1lBQzNCVyxNQUFNRSxTQUFTLENBQ2I7Z0JBQ0VDLE1BQU07Z0JBQ05DLE9BQU9oQixRQUFRcUIsT0FBTyxDQUFDQyxNQUFNLEdBQUcsSUFBSXRCLFFBQVFxQixPQUFPLEdBQUc7WUFDeEQsR0FFRFAsU0FBUyxDQUNSO2dCQUNFQyxNQUFNO2dCQUNOQyxPQUFPaEIsUUFBUXVCLFNBQVMsQ0FBQ3ZCLE9BQU8sQ0FBQ3FCLE9BQU8sQ0FBQ0MsTUFBTSxHQUFHLElBQUl0QixRQUFRdUIsU0FBUyxDQUFDdkIsT0FBTyxDQUFDcUIsT0FBTyxHQUFHO1lBQzVGO1FBRUosT0FBTyxJQUFJcEIsY0FBYyxXQUFXO1lBQ2xDVyxNQUFNRSxTQUFTLENBQ2I7Z0JBQ0VDLE1BQU07Z0JBQ05DLE9BQU9oQixRQUFRcUIsT0FBTyxDQUFDQyxNQUFNLEdBQUcsSUFBSXRCLFFBQVFxQixPQUFPLEdBQUc7WUFDeEQ7UUFFSjtRQUVBLElBQUluQixrQkFBa0IsR0FBRztZQUN2QlUsTUFBTUUsU0FBUyxDQUNiO2dCQUNFQyxNQUFNO2dCQUNOQyxPQUFPUSxPQUFPdEI7WUFDaEI7UUFFSjtRQUdBVSxNQUFNYSxZQUFZO1FBQ2xCLE9BQU9iO0lBQ1Q7QUFDRixFQUFFO0FBRUYsT0FBTyxTQUFTYywyQkFBNEJDLFFBQVE7SUFFbEQsTUFBTWYsUUFBUSxJQUFJZCxlQUNqQmUsUUFBUSxDQUFDLFVBQ1RlLFFBQVEsQ0FBQyxDQUFDLGNBQWMsQ0FBQztJQUUxQixJQUFJRCxZQUFZQSxTQUFTRSxPQUFPLENBQUNQLE1BQU0sR0FBRyxHQUFHO1FBQzNDLElBQUssSUFBSVEsSUFBSSxHQUFHQSxJQUFJSCxTQUFTRSxPQUFPLENBQUNQLE1BQU0sRUFBRVEsSUFBSztZQUNoRCxNQUFNQyxJQUFJSixTQUFTRSxPQUFPLENBQUNDLEVBQUU7WUFDN0JsQixNQUFNRSxTQUFTLENBQUM7Z0JBQ2RDLE1BQU0sQ0FBQyxDQUFDLEVBQUVnQixFQUFFQyxHQUFHLENBQUMsRUFBRSxFQUFFRCxFQUFFQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM1QmhCLE9BQU8sQ0FBQyxFQUFFZSxFQUFFRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVCO1FBQ0Y7SUFDRjtJQUVBckIsTUFBTWEsWUFBWTtJQUNsQixPQUFPYjtBQUNUIn0=