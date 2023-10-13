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
                code: 200,
                data: channelData
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
    },
    createQuotesInstance: async (data)=>{
        try {
            const query = db.prepare('INSERT INTO QuotesSettings (channelId, category, isRunning, cronId, cronHour) VALUES (?, ?, ?, ?, ?)');
            query.run(data.channelId, data.category, data.isRunning, data.cronId, data.cronHour);
            const instance = db.prepare('SELECT * FROM QuotesSettings WHERE category = ?').get(data.category);
            return {
                code: 200,
                data: instance
            };
        } catch (error) {
            console.log(error);
            return {
                code: 500
            };
        }
    },
    getQuotesInstance: async (category)=>{
        try {
            const query = db.prepare('SELECT * FROM QuotesSettings WHERE category = ?').get(category);
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
    getAllQuotesInstances: async ()=>{
        try {
            const query = db.prepare('SELECT * FROM QuotesSettings').all();
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
    updateQuotesInstance: async (isRunning, category)=>{
        try {
            const query = db.prepare('UPDATE QuotesSettings SET isRunning = ? WHERE category = ?');
            query.run(isRunning, category);
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
    deleteQuotesInstance: async (category)=>{
        try {
            const query = db.prepare('DELETE FROM QuotesSettings WHERE category = ?');
            query.run(category);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxkYlxcc2VydmljZVxcaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcbmRvdGVudi5jb25maWcoKTtcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XHJcbmltcG9ydCB7IGpvaW4sIGRpcm5hbWUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IERhdGFiYXNlIGZyb20gJ2JldHRlci1zcWxpdGUzJztcclxuaW1wb3J0IHsgQ29sbGVjdGVkTWVzc2FnZSwgQ29sbGVjdGVkTWVzc2FnZUNhdGVnb3J5LCBRdW90ZUluc3RhbmNlIH0gZnJvbSAnLi4vLi4vdHlwZXMvdHlwZXMnO1xyXG5cclxuY29uc3QgY3VycmVudERpciA9IGRpcm5hbWUoZmlsZVVSTFRvUGF0aChpbXBvcnQubWV0YS51cmwpKTtcclxuY29uc3QgZGJQYXRoID0gam9pbihjdXJyZW50RGlyLCAnLi4vLi4vLi4vLi4vZGF0YWJhc2UvZGF0YWJhc2UuZGInKTtcclxuXHJcbmNvbnN0IGRiID0gbmV3IERhdGFiYXNlKGRiUGF0aCwge1xyXG4gIGZpbGVNdXN0RXhpc3Q6IHRydWVcclxufSk7XHJcblxyXG5jb25zdCBkYlNlcnZpY2UgPSB7XHJcbiAgaXNNb2R1bGVFbmFibGVkOiBhc3luYyAobmFtZSkgPT4ge1xyXG4gICAgY29uc3QgcXVlcnkgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIE1vZHVsZXMgV0hFUkUgbW9kdWxlTmFtZSA9ID8nKS5nZXQobmFtZSk7XHJcbiAgICBjb25zb2xlLmxvZyhxdWVyeSlcclxuICAgIGlmIChxdWVyeS5pc0VuYWJsZWQgPT09IDEpIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbiAgZ2V0QWxsTW9kdWxlczogYXN5bmMgKCkgPT4ge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gTW9kdWxlcycpLmFsbCgpXHJcbiAgICAgIHJldHVybiBxdWVyeTtcclxuICB9LFxyXG4gIHNldEF1ZGl0TG9nQ2hhbm5lbDogYXN5bmMgZnVuY3Rpb24oY2hhbm5lbERhdGEpIHsgIFxyXG4gICAgdHJ5IHtcclxuICAgICAgZGIuZXhlYygnREVMRVRFIEZST00gQXVkaXRMb2dzQ2hhbm5lbCcpXHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gZGIucHJlcGFyZSgnSU5TRVJUIE9SIFJFUExBQ0UgSU5UTyBBdWRpdExvZ3NDaGFubmVsIChjaGFubmVsTmFtZSwgY2hhbm5lbElkKSBWQUxVRVMgKD8sID8pJyk7XHJcbiAgICAgIHF1ZXJ5LnJ1bihjaGFubmVsRGF0YS5jaGFubmVsTmFtZSwgY2hhbm5lbERhdGEuY2hhbm5lbElkKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDBcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZXhlY3V0aW5nIHF1ZXJ5OicsIGVycm9yKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiA1MDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0QXVkaXRMb2dDaGFubmVsOiBhc3luYyBmdW5jdGlvbigpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBBdWRpdExvZ3NDaGFubmVsIExJTUlUIDEnKS5nZXQoKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgZGF0YTogcXVlcnlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiA1MDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2V0TWVkaWFDaGFubmVsOiBhc3luYyBmdW5jdGlvbihjaGFubmVsRGF0YSkgeyAgXHJcbiAgICB0cnkge1xyXG4gICAgICBkYi5leGVjKCdERUxFVEUgRlJPTSBNZWRpYUNoYW5uZWwnKVxyXG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmUoJ0lOU0VSVCBPUiBSRVBMQUNFIElOVE8gTWVkaWFDaGFubmVsIChjaGFubmVsTmFtZSwgY2hhbm5lbElkKSBWQUxVRVMgKD8sID8pJyk7XHJcbiAgICAgIHF1ZXJ5LnJ1bihjaGFubmVsRGF0YS5jaGFubmVsTmFtZSwgY2hhbm5lbERhdGEuY2hhbm5lbElkKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgZGF0YTogY2hhbm5lbERhdGFcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZXhlY3V0aW5nIHF1ZXJ5OicsIGVycm9yKTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiA1MDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0TWVkaWFDaGFubmVsOiBhc3luYyBmdW5jdGlvbigpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5ID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBNZWRpYUNoYW5uZWwgTElNSVQgMScpLmdldCgpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICBkYXRhOiBxdWVyeVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDUwMFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBjb2xsZWN0TWVzc2FnZTogYXN5bmMgZnVuY3Rpb24obWVzc2FnZTogQ29sbGVjdGVkTWVzc2FnZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcXVlcnkgPSBkYi5wcmVwYXJlKCdJTlNFUlQgSU5UTyBDb2xsZWN0ZWRNZXNzYWdlcyAoZGlzY29yZFVzZXJJZCwgZGlzY29yZFVzZXJuYW1lLCBkaXNjb3JkTWVzc2FnZUlkLCBjb250ZW50LCBjYXRlZ29yeSwgZW1iZWRzKSBWQUxVRVMgKD8sID8sID8sID8sID8sID8pJyk7XHJcbiAgICAgIHF1ZXJ5LnJ1bihtZXNzYWdlLmRpc2NvcmRVc2VySWQsIG1lc3NhZ2UuZGlzY29yZFVzZXJuYW1lLCBtZXNzYWdlLmRpc2NvcmRNZXNzYWdlSWQsIG1lc3NhZ2UuY29udGVudCwgbWVzc2FnZS5jYXRlZ29yeSwgbWVzc2FnZS5lbWJlZHMpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICBkYXRhOiBxdWVyeVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiA1MDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0Q29sbGVjdGVkTWVzc2FnZTogYXN5bmMgZnVuY3Rpb24oY2F0ZWdvcnk/OiBDb2xsZWN0ZWRNZXNzYWdlQ2F0ZWdvcnkpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGxldCBxdWVyeVN0cmluZyA9ICdTRUxFQ1QgKiBGUk9NIENvbGxlY3RlZE1lc3NhZ2VzJ1xyXG4gICAgICBpZihjYXRlZ29yeSkge1xyXG4gICAgICAgIHF1ZXJ5U3RyaW5nICs9IGBXSEVSRSBjYXRlZ29yeSA9ICR7Y2F0ZWdvcnl9YDtcclxuICAgICAgfVxyXG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmUocXVlcnlTdHJpbmcpLmdldCgpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICBkYXRhOiBxdWVyeVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiA1MDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3JlYXRlUXVvdGVzSW5zdGFuY2U6IGFzeW5jIChkYXRhOiBRdW90ZUluc3RhbmNlKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmUoJ0lOU0VSVCBJTlRPIFF1b3Rlc1NldHRpbmdzIChjaGFubmVsSWQsIGNhdGVnb3J5LCBpc1J1bm5pbmcsIGNyb25JZCwgY3JvbkhvdXIpIFZBTFVFUyAoPywgPywgPywgPywgPyknKTtcclxuICAgICAgcXVlcnkucnVuKGRhdGEuY2hhbm5lbElkLCBkYXRhLmNhdGVnb3J5LCBkYXRhLmlzUnVubmluZywgZGF0YS5jcm9uSWQsIGRhdGEuY3JvbkhvdXIpO1xyXG4gICAgICBjb25zdCBpbnN0YW5jZSA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gUXVvdGVzU2V0dGluZ3MgV0hFUkUgY2F0ZWdvcnkgPSA/JykuZ2V0KGRhdGEuY2F0ZWdvcnkpO1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDIwMCxcclxuICAgICAgICBkYXRhOiBpbnN0YW5jZVxyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmxvZyhlcnJvcilcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiA1MDBcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0UXVvdGVzSW5zdGFuY2U6IGFzeW5jIChjYXRlZ29yeTogc3RyaW5nKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gUXVvdGVzU2V0dGluZ3MgV0hFUkUgY2F0ZWdvcnkgPSA/JykuZ2V0KGNhdGVnb3J5KTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgZGF0YTogcXVlcnlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogNTAwXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGdldEFsbFF1b3Rlc0luc3RhbmNlczogYXN5bmMgKCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcXVlcnkgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIFF1b3Rlc1NldHRpbmdzJykuYWxsKCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIGRhdGE6IHF1ZXJ5XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yKVxyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGNvZGU6IDUwMFxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICB1cGRhdGVRdW90ZXNJbnN0YW5jZTogYXN5bmMgKGlzUnVubmluZzogYm9vbGVhbiwgY2F0ZWdvcnk6IHN0cmluZykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcXVlcnkgPSBkYi5wcmVwYXJlKCdVUERBVEUgUXVvdGVzU2V0dGluZ3MgU0VUIGlzUnVubmluZyA9ID8gV0hFUkUgY2F0ZWdvcnkgPSA/Jyk7XHJcbiAgICAgIHF1ZXJ5LnJ1bihpc1J1bm5pbmcsIGNhdGVnb3J5KTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgZGF0YTogcXVlcnlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogNTAwXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGRlbGV0ZVF1b3Rlc0luc3RhbmNlOiBhc3luYyAoY2F0ZWdvcnk6IHN0cmluZykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgcXVlcnkgPSBkYi5wcmVwYXJlKCdERUxFVEUgRlJPTSBRdW90ZXNTZXR0aW5ncyBXSEVSRSBjYXRlZ29yeSA9ID8nKTtcclxuICAgICAgcXVlcnkucnVuKGNhdGVnb3J5KTtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBjb2RlOiAyMDAsXHJcbiAgICAgICAgZGF0YTogcXVlcnlcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgY29uc29sZS5sb2coZXJyb3IpXHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogNTAwXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGRiU2VydmljZTsiXSwibmFtZXMiOlsiZG90ZW52IiwiY29uZmlnIiwiZmlsZVVSTFRvUGF0aCIsImpvaW4iLCJkaXJuYW1lIiwiRGF0YWJhc2UiLCJjdXJyZW50RGlyIiwidXJsIiwiZGJQYXRoIiwiZGIiLCJmaWxlTXVzdEV4aXN0IiwiZGJTZXJ2aWNlIiwiaXNNb2R1bGVFbmFibGVkIiwibmFtZSIsInF1ZXJ5IiwicHJlcGFyZSIsImdldCIsImNvbnNvbGUiLCJsb2ciLCJpc0VuYWJsZWQiLCJnZXRBbGxNb2R1bGVzIiwiYWxsIiwic2V0QXVkaXRMb2dDaGFubmVsIiwiY2hhbm5lbERhdGEiLCJleGVjIiwicnVuIiwiY2hhbm5lbE5hbWUiLCJjaGFubmVsSWQiLCJjb2RlIiwiZXJyb3IiLCJnZXRBdWRpdExvZ0NoYW5uZWwiLCJkYXRhIiwic2V0TWVkaWFDaGFubmVsIiwiZ2V0TWVkaWFDaGFubmVsIiwiY29sbGVjdE1lc3NhZ2UiLCJtZXNzYWdlIiwiZGlzY29yZFVzZXJJZCIsImRpc2NvcmRVc2VybmFtZSIsImRpc2NvcmRNZXNzYWdlSWQiLCJjb250ZW50IiwiY2F0ZWdvcnkiLCJlbWJlZHMiLCJnZXRDb2xsZWN0ZWRNZXNzYWdlIiwicXVlcnlTdHJpbmciLCJjcmVhdGVRdW90ZXNJbnN0YW5jZSIsImlzUnVubmluZyIsImNyb25JZCIsImNyb25Ib3VyIiwiaW5zdGFuY2UiLCJnZXRRdW90ZXNJbnN0YW5jZSIsImdldEFsbFF1b3Rlc0luc3RhbmNlcyIsInVwZGF0ZVF1b3Rlc0luc3RhbmNlIiwiZGVsZXRlUXVvdGVzSW5zdGFuY2UiXSwibWFwcGluZ3MiOiJBQUFBLFlBQVlBLFlBQVksU0FBUztBQUNqQ0EsT0FBT0MsTUFBTTtBQUNiLFNBQVNDLGFBQWEsUUFBUSxNQUFNO0FBQ3BDLFNBQVNDLElBQUksRUFBRUMsT0FBTyxRQUFRLE9BQU87QUFDckMsT0FBT0MsY0FBYyxpQkFBaUI7QUFHdEMsTUFBTUMsYUFBYUYsUUFBUUYsY0FBYyxZQUFZSyxHQUFHO0FBQ3hELE1BQU1DLFNBQVNMLEtBQUtHLFlBQVk7QUFFaEMsTUFBTUcsS0FBSyxJQUFJSixTQUFTRyxRQUFRO0lBQzlCRSxlQUFlO0FBQ2pCO0FBRUEsTUFBTUMsWUFBWTtJQUNoQkMsaUJBQWlCLE9BQU9DO1FBQ3RCLE1BQU1DLFFBQVFMLEdBQUdNLE9BQU8sQ0FBQyw4Q0FBOENDLEdBQUcsQ0FBQ0g7UUFDM0VJLFFBQVFDLEdBQUcsQ0FBQ0o7UUFDWixJQUFJQSxNQUFNSyxTQUFTLEtBQUssR0FBRyxPQUFPO1FBQ2xDLE9BQU87SUFDVDtJQUNBQyxlQUFlO1FBQ1gsTUFBTU4sUUFBUUwsR0FBR00sT0FBTyxDQUFDLHlCQUF5Qk0sR0FBRztRQUNyRCxPQUFPUDtJQUNYO0lBQ0FRLG9CQUFvQixlQUFlQyxXQUFXO1FBQzVDLElBQUk7WUFDRmQsR0FBR2UsSUFBSSxDQUFDO1lBQ1IsTUFBTVYsUUFBUUwsR0FBR00sT0FBTyxDQUFDO1lBQ3pCRCxNQUFNVyxHQUFHLENBQUNGLFlBQVlHLFdBQVcsRUFBRUgsWUFBWUksU0FBUztZQUN4RCxPQUFPO2dCQUNMQyxNQUFNO1lBQ1I7UUFDRixFQUFFLE9B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