import * as dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import Database from "better-sqlite3";
const currentDir = dirname(fileURLToPath(import.meta.url));
const dbPath = join(currentDir, '../../../../database/database.db');
const db = new Database(dbPath, {
    fileMustExist: true
});
const dbService = {
    isModuleEnabled: async (name)=>{
        const query = db.prepare('SELECT * FROM Modules WHERE moduleName = ?').get(name);
        console.log(query);
        if (query.isEnabled === 1) return true;
        return false;
    },
    getAllModules: async ()=>{
        const query = db.prepare('SELECT * FROM Modules').all();
        return query;
    },
    setAuditLogChannel: async function(channelData) {
        try {
            db.exec('DELETE FROM AuditLogsChannel');
            const query = db.prepare('INSERT OR REPLACE INTO AuditLogsChannel (channelName, channelId) VALUES (?, ?)');
            query.run(channelData.channelName, channelData.channelId);
            return {
                code: 200
            };
        } catch (error) {
            console.error('Error executing query:', error);
            return {
                code: 500
            };
        }
    },
    getAuditLogChannel: async function() {
        try {
            const query = db.prepare('SELECT * FROM AuditLogsChannel LIMIT 1').get();
            return {
                code: 200,
                data: query
            };
        } catch (error) {
            return {
                code: 500
            };
        }
    },
    setMediaChannel: async function(channelData) {
        try {
            db.exec('DELETE FROM MediaChannel');
            const query = db.prepare('INSERT OR REPLACE INTO MediaChannel (channelName, channelId) VALUES (?, ?)');
            query.run(channelData.channelName, channelData.channelId);
            return {
                code: 200
            };
        } catch (error) {
            console.error('Error executing query:', error);
            return {
                code: 500
            };
        }
    },
    getMediaChannel: async function() {
        try {
            const query = db.prepare('SELECT * FROM MediaChannel LIMIT 1').get();
            return {
                code: 200,
                data: query
            };
        } catch (error) {
            return {
                code: 500
            };
        }
    },
    collectMessage: async function(message) {
        try {
            const query = db.prepare('INSERT INTO CollectedMessages (discordUserId, discordUsername, discordMessageId, content, category, embeds) VALUES (?, ?, ?, ?, ?, ?)');
            query.run(message.discordUserId, message.discordUsername, message.discordMessageId, message.content, message.category, message.embeds);
            return {
                code: 200,
                data: query
            };
        } catch (error) {
            console.log(error);
            return {
                code: 500
            };
        }
    },
    getCollectedMessage: async function(category) {
        try {
            let queryString = 'SELECT * FROM CollectedMessages';
            if (category) {
                queryString += `WHERE category = ${category}`;
            }
            const query = db.prepare(queryString).get();
            return {
                code: 200,
                data: query
            };
        } catch (error) {
            console.log(error);
            return {
                code: 500
            };
        }
    }
};
export default dbService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxkYlxcc2VydmljZVxcaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcbmRvdGVudi5jb25maWcoKTtcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XHJcbmltcG9ydCB7IGpvaW4sIGRpcm5hbWUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IERhdGFiYXNlIGZyb20gJ2JldHRlci1zcWxpdGUzJztcclxuaW1wb3J0IHsgQ29sbGVjdGVkTWVzc2FnZSwgQ29sbGVjdGVkTWVzc2FnZUNhdGVnb3J5IH0gZnJvbSAnLi4vLi4vdHlwZXMvdHlwZXMnO1xyXG5cclxuY29uc3QgY3VycmVudERpciA9IGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcclxuY29uc3QgZGJQYXRoID0gam9pbihjdXJyZW50RGlyLCAnLi4vLi4vLi4vLi4vZGF0YWJhc2UvZGF0YWJhc2UuZGInKTtcclxuXHJcbmNvbnN0IGRiID0gbmV3IERhdGFiYXNlKGRiUGF0aCwge1xyXG4gIGZpbGVNdXN0RXhpc3Q6IHRydWVcclxufSk7XHJcblxyXG5jb25zdCBkYlNlcnZpY2UgPSB7XHJcbiAgaXNNb2R1bGVFbmFibGVkOiBhc3luYyAobmFtZSkgPT4ge1xyXG4gICAgY29uc3QgcXVlcnkgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIE1vZHVsZXMgV0hFUkUgbW9kdWxlTmFtZSA9ID8nKS5nZXQobmFtZSk7XHJcbiAgICBjb25zb2xlLmxvZyhxdWVyeSlcclxuICAgIGlmIChxdWVyeS5pc0VuYWJsZWQgPT09IDEpIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgZ2V0QWxsTW9kdWxlczogYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gTW9kdWxlcycpLmFsbCgpXHJcbiAgICAgIHJldHVybiBxdWVyeTtcclxuICB9LFxyXG4gIHNldEF1ZGl0TG9nQ2hhbm5lbDogYXN5bmMgZnVuY3Rpb24oY2hhbm5lbERhdGEpIHsgIFxyXG4gICAgdHJ5IHtcclxuICAgICAgZGIuZXhlYygnREVMRVRFIEZST00gQXVkaXRMb2dzQ2hhbm5lbCcpXHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gZGIucHJlcGFyZSgnSU5TRVJUIE9SIFJFUExBQ0UgSU5UTyBBdWRpdExvZ3NDaGFubmVsIChjaGFubmVsTmFtZSwgY2hhbm5lbElkKSBWQUxVRVMgKD8sID8pJyk7XHJcbiAgICAgIHF1ZXJ5LnJ1bihjaGFubmVsRGF0YS5jaGFubmVsTmFtZSwgY2hhbm5lbERhdGEuY2hhbm5lbElkKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDBcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZXhlY3V0aW5nIHF1ZXJ5OicsIGVycm9yKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiA1MDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0QXVkaXRMb2dDaGFubmVsOiBhc3luYyBmdW5jdGlvbigpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBBdWRpdExvZ3NDaGFubmVsIExJTUlUIDEnKS5nZXQoKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgZGF0YTogcXVlcnlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiA1MDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2V0TWVkaWFDaGFubmVsOiBhc3luYyBmdW5jdGlvbihjaGFubmVsRGF0YSkgeyAgXHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5leGVjKCdERUxFVEUgRlJPTSBNZWRpYUNoYW5uZWwnKVxyXG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmUoJ0lOU0VSVCBPUiBSRVBMQUNFIElOVE8gTWVkaWFDaGFubmVsIChjaGFubmVsTmFtZSwgY2hhbm5lbElkKSBWQUxVRVMgKD8sID8pJyk7XHJcbiAgICAgIHF1ZXJ5LnJ1bihjaGFubmVsRGF0YS5jaGFubmVsTmFtZSwgY2hhbm5lbERhdGEuY2hhbm5lbElkKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDBcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZXhlY3V0aW5nIHF1ZXJ5OicsIGVycm9yKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiA1MDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0TWVkaWFDaGFubmVsOiBhc3luYyBmdW5jdGlvbigpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBNZWRpYUNoYW5uZWwgTElNSVQgMScpLmdldCgpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICBkYXRhOiBxdWVyeVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDUwMFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb2xsZWN0TWVzc2FnZTogYXN5bmMgZnVuY3Rpb24obWVzc2FnZTogQ29sbGVjdGVkTWVzc2FnZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcXVlcnkgPSBkYi5wcmVwYXJlKCdJTlNFUlQgSU5UTyBDb2xsZWN0ZWRNZXNzYWdlcyAoZGlzY29yZFVzZXJJZCwgZGlzY29yZFVzZXJuYW1lLCBkaXNjb3JkTWVzc2FnZUlkLCBjb250ZW50LCBjYXRlZ29yeSwgZW1iZWRzKSBWQUxVRVMgKD8sID8sID8sID8sID8sID8pJyk7XHJcbiAgICAgIHF1ZXJ5LnJ1bihtZXNzYWdlLmRpc2NvcmRVc2VySWQsIG1lc3NhZ2UuZGlzY29yZFVzZXJuYW1lLCBtZXNzYWdlLmRpc2NvcmRNZXNzYWdlSWQsIG1lc3NhZ2UuY29udGVudCwgbWVzc2FnZS5jYXRlZ29yeSwgbWVzc2FnZS5lbWJlZHMpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICBkYXRhOiBxdWVyeVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiA1MDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0Q29sbGVjdGVkTWVzc2FnZTogYXN5bmMgZnVuY3Rpb24oY2F0ZWdvcnk/OiBDb2xsZWN0ZWRNZXNzYWdlQ2F0ZWdvcnkpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBxdWVyeVN0cmluZyA9ICdTRUxFQ1QgKiBGUk9NIENvbGxlY3RlZE1lc3NhZ2VzJ1xyXG4gICAgICBpZihjYXRlZ29yeSkge1xyXG4gICAgICAgIHF1ZXJ5U3RyaW5nICs9IGBXSEVSRSBjYXRlZ29yeSA9ICR7Y2F0ZWdvcnl9YDtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmUocXVlcnlTdHJpbmcpLmdldCgpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICBkYXRhOiBxdWVyeVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiA1MDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGJTZXJ2aWNlOyJdLCJuYW1lcyI6WyJkb3RlbnYiLCJjb25maWciLCJmaWxlVVJMVG9QYXRoIiwiam9pbiIsImRpcm5hbWUiLCJEYXRhYmFzZSIsImN1cnJlbnREaXIiLCJ1cmwiLCJkYlBhdGgiLCJkYiIsImZpbGVNdXN0RXhpc3QiLCJkYlNlcnZpY2UiLCJpc01vZHVsZUVuYWJsZWQiLCJuYW1lIiwicXVlcnkiLCJwcmVwYXJlIiwiZ2V0IiwiY29uc29sZSIsImxvZyIsImlzRW5hYmxlZCIsImdldEFsbE1vZHVsZXMiLCJhbGwiLCJzZXRBdWRpdExvZ0NoYW5uZWwiLCJjaGFubmVsRGF0YSIsImV4ZWMiLCJydW4iLCJjaGFubmVsTmFtZSIsImNoYW5uZWxJZCIsImNvZGUiLCJlcnJvciIsImdldEF1ZGl0TG9nQ2hhbm5lbCIsImRhdGEiLCJzZXRNZWRpYUNoYW5uZWwiLCJnZXRNZWRpYUNoYW5uZWwiLCJjb2xsZWN0TWVzc2FnZSIsIm1lc3NhZ2UiLCJkaXNjb3JkVXNlcklkIiwiZGlzY29yZFVzZXJuYW1lIiwiZGlzY29yZE1lc3NhZ2VJZCIsImNvbnRlbnQiLCJjYXRlZ29yeSIsImVtYmVkcyIsImdldENvbGxlY3RlZE1lc3NhZ2UiLCJxdWVyeVN0cmluZyJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWUEsWUFBWSxTQUFTO0FBQ2pDQSxPQUFPQyxNQUFNO0FBQ2IsU0FBU0MsYUFBYSxRQUFRLE1BQU07QUFDcEMsU0FBU0MsSUFBSSxFQUFFQyxPQUFPLFFBQVEsT0FBTztBQUNyQyxPQUFPQyxjQUFjLGlCQUFpQjtBQUd0QyxNQUFNQyxhQUFhRixRQUFRRixjQUFjLFlBQVlLLEdBQUc7QUFDeEQsTUFBTUMsU0FBU0wsS0FBS0csWUFBWTtBQUVoQyxNQUFNRyxLQUFLLElBQUlKLFNBQVNHLFFBQVE7SUFDOUJFLGVBQWU7QUFDakI7QUFFQSxNQUFNQyxZQUFZO0lB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