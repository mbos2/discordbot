import { ToadScheduler, Task, CronJob } from "toad-scheduler";
import dbService from "../../../db/service/index.js";
import { quotes } from "../data/quotes.js";
// @ts-ignore
import { posted_quotes } from "../../../../../statics/posted-quotes.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { QuoteCategory } from "../../../types/types.js";
import { AttachmentBuilder, Colors, EmbedBuilder } from "discord.js";
import axios from "axios";
const scheduler = new ToadScheduler();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const attachmentsPath = path.join(__dirname, '../../../assets/');
const switchEmbedColors = (category)=>{
    switch(category){
        case QuoteCategory.Funny:
            return Colors.Gold;
        case QuoteCategory.Inspirational:
            return Colors.Green;
        case QuoteCategory.Programming:
            return Colors.DarkAqua;
    }
};
const switchEmbedAttachment = (category)=>{
    switch(category){
        case QuoteCategory.Funny:
            return 'daily-funny-image';
        case QuoteCategory.Inspirational:
            return 'daily-inspirational-image';
        case QuoteCategory.Programming:
            return 'daily-programming-image';
    }
};
const createQuotesEmbedMessage = async (category, quote)=>{
    const quoteEmbed = new EmbedBuilder();
    if (quote.author) {
        quoteEmbed.setAuthor({
            name: `${quote.author}`
        });
    }
    quoteEmbed.setImage(`attachment://${switchEmbedAttachment(category)}.png`).addFields({
        name: '\n',
        value: '```yaml\n' + quote.text + '\n```'
    }).setColor(switchEmbedColors(category));
    return quoteEmbed;
};
const getRandomFunnyQuote = async ()=>{
    try {
        const response = await axios.get("https://quotes.rest/qod?category=funny&language=en", {
            headers: {
                "Content-type": "application/json",
                "X-TheySaidSo-Api-Secret": `${process.env.THEY_SAID_SO_API_KEY}`,
                "Authorization": `Bearer ${process.env.THEY_SAID_SO_API_KEY}`
            }
        });
        const data = response.data.contents.quotes[0];
        return {
            author: data.author,
            text: data.quote
        };
    } catch (error) {
        console.error("Error: " + error.message);
    }
};
export const getInpirationalQuoteOfTheDay = async ()=>{
    try {
        const response = await axios.get("https://quotes.rest/qod?category=inspire&language=en", {
            headers: {
                "Content-type": "application/json",
                "X-TheySaidSo-Api-Secret": `${process.env.THEY_SAID_SO_API_KEY}`,
                "Authorization": `Bearer ${process.env.THEY_SAID_SO_API_KEY}`
            }
        });
        const data = response.data.contents.quotes[0];
        return {
            author: data.author,
            text: data.quote
        };
    } catch (error) {
        console.error("Error: " + error.message);
    }
};
const getRandomProgrammingQuote = async ()=>{
    let availableQuotes = quotes.filter((quote)=>!posted_quotes.includes(quote.id));
    const postedQuotesFilePath = path.join(__dirname, '../../../../../statics/posted-quotes.js');
    // If there is no quotes left to post, reset posted quotes
    if (availableQuotes.length === 0) {
        console.log('No quotes left to post, resetting posted quotes');
        fs.writeFileSync(postedQuotesFilePath, `export const posted_quotes = ${JSON.stringify([], null, 2)};`);
        availableQuotes = quotes;
    }
    const randomIndex = Math.floor(Math.random() * availableQuotes.length);
    const selectedQuote = availableQuotes[randomIndex];
    posted_quotes.push(selectedQuote.id);
    fs.writeFileSync(postedQuotesFilePath, `export const posted_quotes = ${JSON.stringify(posted_quotes, null, 2)};`);
    return {
        id: selectedQuote.id,
        author: selectedQuote.author,
        text: selectedQuote.en
    };
};
export const createOrStartQuotesJob = async (data, event, startEvent)=>{
    const switchQuotesJob = async (category)=>{
        switch(category){
            case QuoteCategory.Funny:
                return await getRandomFunnyQuote();
            case QuoteCategory.Inspirational:
                return await getInpirationalQuoteOfTheDay();
            case QuoteCategory.Programming:
                return await getRandomProgrammingQuote();
        }
    };
    try {
        const task = new Task(`${data.category}-task`, async ()=>{
            const d = data;
            let instance = (await dbService.getQuotesInstance(d.category)).data;
            if (!instance) {
                instance = (await dbService.createQuotesInstance(d)).data;
            }
            const filePath = path.join(attachmentsPath, `${switchEmbedAttachment(data.category)}.png`);
            const file = new AttachmentBuilder(filePath, {
                name: `${switchEmbedAttachment(data.category)}.png`
            });
            let channel;
            if (event) {
                channel = await event.member.guild.channels.cache.get(instance.channelId);
                console.log('Event provided');
            } else if (startEvent) {
                channel = await startEvent.channels.cache.get(data.channelId);
                console.log('Start event provided');
            }
            const quote = await switchQuotesJob(d.category);
            const embed = await createQuotesEmbedMessage(d.category, quote);
            await channel.send({
                embeds: [
                    embed
                ],
                files: [
                    file
                ]
            });
        });
        // const job = new SimpleIntervalJob(
        //   { seconds: 15, runImmediately: true },
        //   task,
        //   {id: data.category}
        // );
        // scheduler.addSimpleIntervalJob(job);
        const job = new CronJob({
            cronExpression: `0 ${data.cronHour} * * * *`
        }, task, {
            id: data.category
        });
        scheduler.addCronJob(job);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};
export const restartExistingCronInstances = async (startEvent)=>{
    const instances = await dbService.getAllQuotesInstances();
    if (instances.data && instances.data.length > 0) {
        instances.data.forEach(async (instance)=>{
            try {
                await createOrStartQuotesJob(instance, null, startEvent);
                const channel = await startEvent.channels.cache.get(`${process.env.DISCORD_DEBUG_CHANNEL_ID}`);
                if (channel) {
                    await channel.send(`Quotes instance for category ${instance.category} started`);
                }
            } catch (error) {
                console.log(error);
                const channel = await startEvent.channels.cache.get(`${process.env.DISCORD_DEBUG_CHANNEL_ID}`);
                if (channel) {
                    await channel.send(error);
                }
            }
        });
    }
};
export const stopAndDeleteQuotesJob = async (category)=>{
    try {
        let instance = await dbService.getQuotesInstance(category);
        if (instance.data) {
            await dbService.deleteQuotesInstance(category);
            scheduler.stopById(category);
            scheduler.removeById(category);
        }
    } catch (error) {
        console.log(error);
    }
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxtb2R1bGVzXFxxdW90ZXNcXHV0aWxzXFx1dGlscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBUb2FkU2NoZWR1bGVyLCBUYXNrLCBDcm9uSm9iLCBTaW1wbGVJbnRlcnZhbEpvYiB9IGZyb20gJ3RvYWQtc2NoZWR1bGVyJztcclxuaW1wb3J0IGRiU2VydmljZSBmcm9tICcuLi8uLi8uLi9kYi9zZXJ2aWNlL2luZGV4LmpzJztcclxuaW1wb3J0IHsgUXVvdGVJbnN0YW5jZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3R5cGVzLmpzJztcclxuaW1wb3J0IHtxdW90ZXN9IGZyb20gJy4uL2RhdGEvcXVvdGVzLmpzJztcclxuLy8gQHRzLWlnbm9yZVxyXG5pbXBvcnQgeyBwb3N0ZWRfcXVvdGVzIH0gZnJvbSAnLi4vLi4vLi4vLi4vLi4vc3RhdGljcy9wb3N0ZWQtcXVvdGVzLmpzJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBmcyBmcm9tICdmcyc7XHJcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xyXG5pbXBvcnQgeyBRdW90ZUNhdGVnb3J5LCBRdW90ZSB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL3R5cGVzLmpzJztcclxuaW1wb3J0IHsgQXR0YWNobWVudEJ1aWxkZXIsIENvbG9ycywgRW1iZWRCdWlsZGVyIH0gZnJvbSAnZGlzY29yZC5qcyc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcblxyXG5jb25zdCBzY2hlZHVsZXIgPSBuZXcgVG9hZFNjaGVkdWxlcigpO1xyXG5jb25zdCBfX2ZpbGVuYW1lID0gZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpO1xyXG5jb25zdCBfX2Rpcm5hbWUgPSBwYXRoLmRpcm5hbWUoX19maWxlbmFtZSk7XHJcbmNvbnN0IGF0dGFjaG1lbnRzUGF0aCA9IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi8uLi8uLi9hc3NldHMvJyk7XHJcblxyXG5jb25zdCBzd2l0Y2hFbWJlZENvbG9ycyA9IChjYXRlZ29yeTogUXVvdGVDYXRlZ29yeSkgPT4ge1xyXG4gIHN3aXRjaCAoY2F0ZWdvcnkpIHtcclxuICAgIGNhc2UgUXVvdGVDYXRlZ29yeS5GdW5ueTpcclxuICAgICAgcmV0dXJuIENvbG9ycy5Hb2xkO1xyXG4gICAgY2FzZSBRdW90ZUNhdGVnb3J5Lkluc3BpcmF0aW9uYWw6XHJcbiAgICAgIHJldHVybiBDb2xvcnMuR3JlZW47XHJcbiAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuUHJvZ3JhbW1pbmc6XHJcbiAgICAgIHJldHVybiBDb2xvcnMuRGFya0FxdWE7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBzd2l0Y2hFbWJlZEF0dGFjaG1lbnQgPSAoY2F0ZWdvcnk6IFF1b3RlQ2F0ZWdvcnkpID0+IHtcclxuICBzd2l0Y2ggKGNhdGVnb3J5KSB7XHJcbiAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuRnVubnk6XHJcbiAgICAgIHJldHVybiAnZGFpbHktZnVubnktaW1hZ2UnO1xyXG4gICAgY2FzZSBRdW90ZUNhdGVnb3J5Lkluc3BpcmF0aW9uYWw6XHJcbiAgICAgIHJldHVybiAnZGFpbHktaW5zcGlyYXRpb25hbC1pbWFnZSc7XHJcbiAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuUHJvZ3JhbW1pbmc6XHJcbiAgICAgIHJldHVybiAnZGFpbHktcHJvZ3JhbW1pbmctaW1hZ2UnO1xyXG4gIH1cclxufVxyXG5cclxuY29uc3QgY3JlYXRlUXVvdGVzRW1iZWRNZXNzYWdlID0gYXN5bmMgKGNhdGVnb3J5OiBRdW90ZUNhdGVnb3J5LCBxdW90ZTogUXVvdGUpID0+IHtcclxuICBjb25zdCBxdW90ZUVtYmVkID0gbmV3IEVtYmVkQnVpbGRlcigpO1xyXG5cclxuXHRpZiAocXVvdGUuYXV0aG9yKSB7XHJcbiAgICBxdW90ZUVtYmVkLnNldEF1dGhvcih7IG5hbWU6IGAke3F1b3RlLmF1dGhvcn1gfSk7XHJcbiAgfVxyXG5cdHF1b3RlRW1iZWRcclxuICAuc2V0SW1hZ2UoYGF0dGFjaG1lbnQ6Ly8ke3N3aXRjaEVtYmVkQXR0YWNobWVudChjYXRlZ29yeSl9LnBuZ2ApXHJcblx0LmFkZEZpZWxkcyhcclxuXHRcdHsgbmFtZTogJ1xcbicsIHZhbHVlOiAnYGBgeWFtbFxcbicgKyBxdW90ZS50ZXh0ICsgJ1xcbmBgYCd9XHJcblx0KVxyXG4gIC5zZXRDb2xvcihzd2l0Y2hFbWJlZENvbG9ycyhjYXRlZ29yeSkpO1xyXG5cclxuICByZXR1cm4gcXVvdGVFbWJlZDtcclxufVxyXG5cclxuY29uc3QgZ2V0UmFuZG9tRnVubnlRdW90ZSA9IGFzeW5jICgpOiBQcm9taXNlPFF1b3RlPiA9PiB7XHJcbiAgdHJ5IHtcclxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgYXhpb3MuZ2V0KFwiaHR0cHM6Ly9xdW90ZXMucmVzdC9xb2Q/Y2F0ZWdvcnk9ZnVubnkmbGFuZ3VhZ2U9ZW5cIiwge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgXCJYLVRoZXlTYWlkU28tQXBpLVNlY3JldFwiOiBgJHtwcm9jZXNzLmVudi5USEVZX1NBSURfU09fQVBJX0tFWX1gLFxyXG4gICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7cHJvY2Vzcy5lbnYuVEhFWV9TQUlEX1NPX0FQSV9LRVl9YCxcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YS5jb250ZW50cy5xdW90ZXNbMF07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhdXRob3I6IGRhdGEuYXV0aG9yLFxyXG4gICAgICB0ZXh0OiBkYXRhLnF1b3RlXHJcbiAgICB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IFwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgZ2V0SW5waXJhdGlvbmFsUXVvdGVPZlRoZURheSA9IGFzeW5jICgpOiBQcm9taXNlPFF1b3RlPiA9PiB7IFxyXG4gIHRyeSB7XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGF4aW9zLmdldChcImh0dHBzOi8vcXVvdGVzLnJlc3QvcW9kP2NhdGVnb3J5PWluc3BpcmUmbGFuZ3VhZ2U9ZW5cIiwge1xyXG4gICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgXCJDb250ZW50LXR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgXCJYLVRoZXlTYWlkU28tQXBpLVNlY3JldFwiOiBgJHtwcm9jZXNzLmVudi5USEVZX1NBSURfU09fQVBJX0tFWX1gLFxyXG4gICAgICAgIFwiQXV0aG9yaXphdGlvblwiOiBgQmVhcmVyICR7cHJvY2Vzcy5lbnYuVEhFWV9TQUlEX1NPX0FQSV9LRVl9YCxcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuZGF0YS5jb250ZW50cy5xdW90ZXNbMF07XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBhdXRob3I6IGRhdGEuYXV0aG9yLFxyXG4gICAgICB0ZXh0OiBkYXRhLnF1b3RlXHJcbiAgICB9O1xyXG4gIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICBjb25zb2xlLmVycm9yKFwiRXJyb3I6IFwiICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBnZXRSYW5kb21Qcm9ncmFtbWluZ1F1b3RlID0gYXN5bmMgKCk6IFByb21pc2U8UXVvdGU+ID0+IHtcclxuICBsZXQgYXZhaWxhYmxlUXVvdGVzID0gcXVvdGVzLmZpbHRlcihxdW90ZSA9PiAhcG9zdGVkX3F1b3Rlcy5pbmNsdWRlcyhxdW90ZS5pZCkpO1xyXG4gIGNvbnN0IHBvc3RlZFF1b3Rlc0ZpbGVQYXRoID0gcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uLy4uLy4uLy4uL3N0YXRpY3MvcG9zdGVkLXF1b3Rlcy5qcycpO1xyXG4gIC8vIElmIHRoZXJlIGlzIG5vIHF1b3RlcyBsZWZ0IHRvIHBvc3QsIHJlc2V0IHBvc3RlZCBxdW90ZXNcclxuICBpZiAoYXZhaWxhYmxlUXVvdGVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgY29uc29sZS5sb2coJ05vIHF1b3RlcyBsZWZ0IHRvIHBvc3QsIHJlc2V0dGluZyBwb3N0ZWQgcXVvdGVzJylcclxuICAgIGZzLndyaXRlRmlsZVN5bmMocG9zdGVkUXVvdGVzRmlsZVBhdGgsIGBleHBvcnQgY29uc3QgcG9zdGVkX3F1b3RlcyA9ICR7SlNPTi5zdHJpbmdpZnkoW10sIG51bGwsIDIpfTtgKTtcclxuICAgIGF2YWlsYWJsZVF1b3RlcyA9IHF1b3RlcztcclxuICB9XHJcblxyXG4gIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlUXVvdGVzLmxlbmd0aCk7XHJcbiAgY29uc3Qgc2VsZWN0ZWRRdW90ZSA9IGF2YWlsYWJsZVF1b3Rlc1tyYW5kb21JbmRleF07XHJcblxyXG4gIHBvc3RlZF9xdW90ZXMucHVzaChzZWxlY3RlZFF1b3RlLmlkKTtcclxuICBmcy53cml0ZUZpbGVTeW5jKHBvc3RlZFF1b3Rlc0ZpbGVQYXRoLCBgZXhwb3J0IGNvbnN0IHBvc3RlZF9xdW90ZXMgPSAke0pTT04uc3RyaW5naWZ5KHBvc3RlZF9xdW90ZXMsIG51bGwsIDIpfTtgKTtcclxuXHJcbiAgcmV0dXJuIHtcclxuICAgIGlkOiBzZWxlY3RlZFF1b3RlLmlkLFxyXG4gICAgYXV0aG9yOiBzZWxlY3RlZFF1b3RlLmF1dGhvcixcclxuICAgIHRleHQ6IHNlbGVjdGVkUXVvdGUuZW5cclxuICB9O1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgY3JlYXRlT3JTdGFydFF1b3Rlc0pvYiA9IGFzeW5jIChkYXRhOiBRdW90ZUluc3RhbmNlLCBldmVudDogYW55LCBzdGFydEV2ZW50PzogYW55KSA9PiB7XHJcbiAgY29uc3Qgc3dpdGNoUXVvdGVzSm9iID0gYXN5bmMgKGNhdGVnb3J5OiBRdW90ZUNhdGVnb3J5KSA9PiB7XHJcbiAgICBzd2l0Y2ggKGNhdGVnb3J5KSB7XHJcbiAgICAgIGNhc2UgUXVvdGVDYXRlZ29yeS5GdW5ueTpcclxuICAgICAgICByZXR1cm4gYXdhaXQgZ2V0UmFuZG9tRnVubnlRdW90ZSgpO1xyXG4gICAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuSW5zcGlyYXRpb25hbDpcclxuICAgICAgICByZXR1cm4gYXdhaXQgZ2V0SW5waXJhdGlvbmFsUXVvdGVPZlRoZURheSgpO1xyXG4gICAgICBjYXNlIFF1b3RlQ2F0ZWdvcnkuUHJvZ3JhbW1pbmc6XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IGdldFJhbmRvbVByb2dyYW1taW5nUXVvdGUoKTtcclxuICAgIH1cclxuICB9XHJcbiAgICBcclxuICB0cnkge1xyXG4gICAgY29uc3QgdGFzayA9IG5ldyBUYXNrKFxyXG4gICAgICBgJHtkYXRhLmNhdGVnb3J5fS10YXNrYCwgYXN5bmMgKCkgPT4geyBcclxuICAgICAgICBjb25zdCBkID0gZGF0YTtcclxuICAgICAgICBsZXQgaW5zdGFuY2UgPSAoYXdhaXQgZGJTZXJ2aWNlLmdldFF1b3Rlc0luc3RhbmNlKGQuY2F0ZWdvcnkpKS5kYXRhO1xyXG4gICAgICAgIGlmICghaW5zdGFuY2UpIHtcclxuICAgICAgICAgaW5zdGFuY2UgPSAoYXdhaXQgZGJTZXJ2aWNlLmNyZWF0ZVF1b3Rlc0luc3RhbmNlKGQpKS5kYXRhO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgZmlsZVBhdGggPSBwYXRoLmpvaW4oYXR0YWNobWVudHNQYXRoLCBgJHtzd2l0Y2hFbWJlZEF0dGFjaG1lbnQoZGF0YS5jYXRlZ29yeSl9LnBuZ2ApO1xyXG4gICAgICAgIGNvbnN0IGZpbGUgPSBuZXcgQXR0YWNobWVudEJ1aWxkZXIoZmlsZVBhdGgsIHtcclxuICAgICAgICAgIG5hbWU6IGAke3N3aXRjaEVtYmVkQXR0YWNobWVudChkYXRhLmNhdGVnb3J5KX0ucG5nYFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBjaGFubmVsO1xyXG4gICAgICAgIGlmIChldmVudCkge1xyXG4gICAgICAgICAgY2hhbm5lbCA9IGF3YWl0IGV2ZW50Lm1lbWJlci5ndWlsZC5jaGFubmVscy5jYWNoZS5nZXQoaW5zdGFuY2UuY2hhbm5lbElkKTtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdFdmVudCBwcm92aWRlZCcpXHJcbiAgICAgICAgfSBlbHNlIGlmIChzdGFydEV2ZW50KSB7XHJcbiAgICAgICAgICBjaGFubmVsID0gYXdhaXQgc3RhcnRFdmVudC5jaGFubmVscy5jYWNoZS5nZXQoZGF0YS5jaGFubmVsSWQpO1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ1N0YXJ0IGV2ZW50IHByb3ZpZGVkJylcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcXVvdGUgPSBhd2FpdCBzd2l0Y2hRdW90ZXNKb2IoZC5jYXRlZ29yeSk7XHJcbiAgICAgICAgY29uc3QgZW1iZWQgPSBhd2FpdCBjcmVhdGVRdW90ZXNFbWJlZE1lc3NhZ2UoZC5jYXRlZ29yeSwgcXVvdGUpO1xyXG4gICAgICAgIGF3YWl0IGNoYW5uZWwuc2VuZCh7IGVtYmVkczogW2VtYmVkXSwgZmlsZXM6IFtmaWxlXSB9KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBjb25zdCBqb2IgPSBuZXcgU2ltcGxlSW50ZXJ2YWxKb2IoXHJcbiAgICAgIC8vICAgeyBzZWNvbmRzOiAxNSwgcnVuSW1tZWRpYXRlbHk6IHRydWUgfSxcclxuICAgICAgLy8gICB0YXNrLFxyXG4gICAgICAvLyAgIHtpZDogZGF0YS5jYXRlZ29yeX1cclxuICAgICAgLy8gKTtcclxuICAgICAgLy8gc2NoZWR1bGVyLmFkZFNpbXBsZUludGVydmFsSm9iKGpvYik7XHJcbiAgICAgIGNvbnN0IGpvYiA9IG5ldyBDcm9uSm9iKHtcclxuICAgICAgICBjcm9uRXhwcmVzc2lvbjogYDAgJHtkYXRhLmNyb25Ib3VyfSAqICogKiAqYCxcclxuICAgICAgfSwgdGFzaywge2lkOiBkYXRhLmNhdGVnb3J5fSk7XHJcbiAgICAgIHNjaGVkdWxlci5hZGRDcm9uSm9iKGpvYik7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG5cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICByZXR1cm4gZmFsc2VcclxuICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcmVzdGFydEV4aXN0aW5nQ3Jvbkluc3RhbmNlcyA9IGFzeW5jIChzdGFydEV2ZW50KSA9PiB7IFxyXG4gIGNvbnN0IGluc3RhbmNlcyA9IGF3YWl0IGRiU2VydmljZS5nZXRBbGxRdW90ZXNJbnN0YW5jZXMoKTtcclxuICBpZiAoaW5zdGFuY2VzLmRhdGEgJiYgaW5zdGFuY2VzLmRhdGEubGVuZ3RoID4gMCkge1xyXG4gICAgaW5zdGFuY2VzLmRhdGEuZm9yRWFjaChhc3luYyAoaW5zdGFuY2U6IFF1b3RlSW5zdGFuY2UpID0+IHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICBhd2FpdCBjcmVhdGVPclN0YXJ0UXVvdGVzSm9iKGluc3RhbmNlLCBudWxsLCBzdGFydEV2ZW50KTtcclxuICAgICAgICBjb25zdCBjaGFubmVsID0gYXdhaXQgc3RhcnRFdmVudC5jaGFubmVscy5jYWNoZS5nZXQoYCR7cHJvY2Vzcy5lbnYuRElTQ09SRF9ERUJVR19DSEFOTkVMX0lEfWApO1xyXG4gICAgICAgIGlmIChjaGFubmVsKSB7XHJcbiAgICAgICAgICBhd2FpdCBjaGFubmVsLnNlbmQoYFF1b3RlcyBpbnN0YW5jZSBmb3IgY2F0ZWdvcnkgJHtpbnN0YW5jZS5jYXRlZ29yeX0gc3RhcnRlZGApO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgICBjb25zdCBjaGFubmVsID0gYXdhaXQgc3RhcnRFdmVudC5jaGFubmVscy5jYWNoZS5nZXQoYCR7cHJvY2Vzcy5lbnYuRElTQ09SRF9ERUJVR19DSEFOTkVMX0lEfWApO1xyXG4gICAgICAgIGlmIChjaGFubmVsKSB7XHJcbiAgICAgICAgICBhd2FpdCBjaGFubmVsLnNlbmQoZXJyb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBzdG9wQW5kRGVsZXRlUXVvdGVzSm9iID0gYXN5bmMgKGNhdGVnb3J5OiBzdHJpbmcpID0+IHtcclxuICB0cnkge1xyXG4gICAgbGV0IGluc3RhbmNlID0gYXdhaXQgZGJTZXJ2aWNlLmdldFF1b3Rlc0luc3RhbmNlKGNhdGVnb3J5KTtcclxuICAgIGlmIChpbnN0YW5jZS5kYXRhKSB7XHJcbiAgICAgYXdhaXQgZGJTZXJ2aWNlLmRlbGV0ZVF1b3Rlc0luc3RhbmNlKGNhdGVnb3J5KTtcclxuICAgICBzY2hlZHVsZXIuc3RvcEJ5SWQoY2F0ZWdvcnkpO1xyXG4gICAgIHNjaGVkdWxlci5yZW1vdmVCeUlkKGNhdGVnb3J5KTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgfVxyXG59Il0sIm5hbWVzIjpbIlRvYWRTY2hlZHVsZXIiLCJUYXNrIiwiQ3JvbkpvYiIsImRiU2VydmljZSIsInF1b3RlcyIsInBvc3RlZF9xdW90ZXMiLCJwYXRoIiwiZnMiLCJmaWxlVVJMVG9QYXRoIiwiUXVvdGVDYXRlZ29yeSIsIkF0dGFjaG1lbnRCdWlsZGVyIiwiQ29sb3JzIiwiRW1iZWRCdWlsZGVyIiwiYXhpb3MiLCJzY2hlZHVsZXIiLCJfX2ZpbGVuYW1lIiwidXJsIiwiX19kaXJuYW1lIiwiZGlybmFtZSIsImF0dGFjaG1lbnRzUGF0aCIsImpvaW4iLCJzd2l0Y2hFbWJlZENvbG9ycyIsImNhdGVnb3J5IiwiRnVubnkiLCJHb2xkIiwiSW5zcGlyYXRpb25hbCIsIkdyZWVuIiwiUHJvZ3JhbW1pbmciLCJEYXJrQXF1YSIsInN3aXRjaEVtYmVkQXR0YWNobWVudCIsImNyZWF0ZVF1b3Rlc0VtYmVkTWVzc2FnZSIsInF1b3RlIiwicXVvdGVFbWJlZCIsImF1dGhvciIsInNldEF1dGhvciIsIm5hbWUiLCJzZXRJbWFnZSIsImFkZEZpZWxkcyIsInZhbHVlIiwidGV4dCIsInNldENvbG9yIiwiZ2V0UmFuZG9tRnVubnlRdW90ZSIsInJlc3BvbnNlIiwiZ2V0IiwiaGVhZGVycyIsInByb2Nlc3MiLCJlbnYiLCJUSEVZX1NBSURfU09fQVBJX0tFWSIsImRhdGEiLCJjb250ZW50cyIsImVycm9yIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJnZXRJbnBpcmF0aW9uYWxRdW90ZU9mVGhlRGF5IiwiZ2V0UmFuZG9tUHJvZ3JhbW1pbmdRdW90ZSIsImF2YWlsYWJsZVF1b3RlcyIsImZpbHRlciIsImluY2x1ZGVzIiwiaWQiLCJwb3N0ZWRRdW90ZXNGaWxlUGF0aCIsImxlbmd0aCIsImxvZyIsIndyaXRlRmlsZVN5bmMiLCJKU09OIiwic3RyaW5naWZ5IiwicmFuZG9tSW5kZXgiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJzZWxlY3RlZFF1b3RlIiwicHVzaCIsImVuIiwiY3JlYXRlT3JTdGFydFF1b3Rlc0pvYiIsImV2ZW50Iiwic3RhcnRFdmVudCIsInN3aXRjaFF1b3Rlc0pvYiIsInRhc2siLCJkIiwiaW5zdGFuY2UiLCJnZXRRdW90ZXNJbnN0YW5jZSIsImNyZWF0ZVF1b3Rlc0luc3RhbmNlIiwiZmlsZVBhdGgiLCJmaWxlIiwiY2hhbm5lbCIsIm1lbWJlciIsImd1aWxkIiwiY2hhbm5lbHMiLCJjYWNoZSIsImNoYW5uZWxJZCIsImVtYmVkIiwic2VuZCIsImVtYmVkcyIsImZpbGVzIiwiam9iIiwiY3JvbkV4cHJlc3Npb24iLCJjcm9uSG91ciIsImFkZENyb25Kb2IiLCJyZXN0YXJ0RXhpc3RpbmdDcm9uSW5zdGFuY2VzIiwiaW5zdGFuY2VzIiwiZ2V0QWxsUXVvdGVzSW5zdGFuY2VzIiwiZm9yRWFjaCIsIkRJU0NPUkRfREVCVUdfQ0hBTk5FTF9JRCIsInN0b3BBbmREZWxldGVRdW90ZXNKb2IiLCJkZWxldGVRdW90ZXNJbnN0YW5jZSIsInN0b3BCeUlkIiwicmVtb3ZlQnlJZCJdLCJtYXBwaW5ncyI6IkFBQUEsU0FBU0EsYUFBYSxFQUFFQyxJQUFJLEVBQUVDLE9BQU8sUUFBMkIsaUJBQWlCO0FBQ2pGLE9BQU9DLGVBQWUsK0JBQStCO0FBRXJELFNBQVFDLE1BQU0sUUFBTyxvQkFBb0I7QUFDekMsYUFBYTtBQUNiLFNBQVNDLGFBQWEsUUFBUSwwQ0FBMEM7QUFDeEUsT0FBT0MsVUFBVSxPQUFPO0FBQ3hCLE9BQU9DLFFBQVEsS0FBSztBQUNwQixTQUFTQyxhQUFhLFFBQVEsTUFBTTtBQUNwQyxTQUFTQyxhQUFhLFFBQWUsMEJBQTBCO0FBQy9ELFNBQVNDLGlCQUFpQixFQUFFQyxNQUFNLEVBQUVDLFlBQVksUUFBUSxhQUFhO0FBQ3JFLE9BQU9DLFdBQVcsUUFBUTtBQUUxQixNQUFNQyxZQUFZLElBQUlkO0FBQ3RCLE1BQU1lLGFBQWFQLGNBQWMsWUFBWVEsR0FBRztBQUNoRCxNQUFNQyxZQUFZWCxLQUFLWSxPQUFPLENBQUNIO0FBQy9CLE1BQU1JLGtCQUFrQmIsS0FBS2MsSUFBSSxDQUFDSCxXQUFXO0FBRTdDLE1BQU1JLG9CQUFvQixDQUFDQztJQUN6QixPQUFRQTtRQUNOLEtBQUtiLGNBQWNjLEtBQUs7WUFDdEIsT0FBT1osT0FBT2EsSUFBSTtRQUNwQixLQUFLZixjQUFjZ0IsYUFBYTtZQUM5QixPQUFPZCxPQUFPZSxLQUFLO1FBQ3JCLEtBQUtqQixjQUFja0IsV0FBVztZQUM1QixPQUFPaEIsT0FBT2lCLFFBQVE7SUFDMUI7QUFDRjtBQUVBLE1BQU1DLHdCQUF3QixDQUFDUDtJQUM3QixPQUFRQTtRQUNOLEtBQUtiLGNBQWNjLEtBQUs7WUFDdEIsT0FBTztRQUNULEtBQUtkLGNBQWNnQixhQUFhO1lBQzlCLE9BQU87UUFDVCxLQUFLaEIsY0FBY2tCLFdBQVc7WUFDNUIsT0FBTztJQUNYO0FBQ0Y7QUFFQSxN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