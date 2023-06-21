import * as dotenv from "dotenv";
dotenv.config();
import { fileURLToPath } from "url";
import { join, dirname } from "path";
import Database from "better-sqlite3";
const currentDir = dirname(fileURLToPath(import.meta.url));
const dbPath = join(currentDir, '../database/database.db');
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
    }
};
export default dbService;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkQ6XFxQcm9qZWt0aVxcZGlzY29yZC1ib3RzXFx3M2JvdFxcc3JjXFxkYlxcc2VydmljZVxcaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcbmRvdGVudi5jb25maWcoKTtcclxuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCc7XHJcbmltcG9ydCB7IGpvaW4sIGRpcm5hbWUgfSBmcm9tICdwYXRoJztcclxuaW1wb3J0IERhdGFiYXNlIGZyb20gJ2JldHRlci1zcWxpdGUzJztcclxuXHJcbmNvbnN0IGN1cnJlbnREaXIgPSBkaXJuYW1lKGZpbGVVUkxUb1BhdGgoaW1wb3J0Lm1ldGEudXJsKSk7XHJcbmNvbnN0IGRiUGF0aCA9IGpvaW4oY3VycmVudERpciwgJy4uL2RhdGFiYXNlL2RhdGFiYXNlLmRiJyk7XHJcblxyXG5jb25zdCBkYiA9IG5ldyBEYXRhYmFzZShkYlBhdGgsIHtcclxuICBmaWxlTXVzdEV4aXN0OiB0cnVlXHJcbn0pO1xyXG5cclxuY29uc3QgZGJTZXJ2aWNlID0ge1xyXG4gIGlzTW9kdWxlRW5hYmxlZDogYXN5bmMgKG5hbWUpID0+IHtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBNb2R1bGVzIFdIRVJFIG1vZHVsZU5hbWUgPSA/JykuZ2V0KG5hbWUpO1xyXG4gICAgY29uc29sZS5sb2cocXVlcnkpXHJcbiAgICBpZiAocXVlcnkuaXNFbmFibGVkID09PSAxKSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9LFxyXG4gIGdldEFsbE1vZHVsZXM6IGFzeW5jICgpID0+IHtcclxuICAgICAgY29uc3QgcXVlcnkgPSBkYi5wcmVwYXJlKCdTRUxFQ1QgKiBGUk9NIE1vZHVsZXMnKS5hbGwoKVxyXG4gICAgICByZXR1cm4gcXVlcnk7XHJcbiAgfSxcclxuICBzZXRBdWRpdExvZ0NoYW5uZWw6IGFzeW5jIGZ1bmN0aW9uKGNoYW5uZWxEYXRhKSB7ICBcclxuICAgIHRyeSB7XHJcbiAgICAgIGRiLmV4ZWMoJ0RFTEVURSBGUk9NIEF1ZGl0TG9nc0NoYW5uZWwnKVxyXG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmUoJ0lOU0VSVCBPUiBSRVBMQUNFIElOVE8gQXVkaXRMb2dzQ2hhbm5lbCAoY2hhbm5lbE5hbWUsIGNoYW5uZWxJZCkgVkFMVUVTICg/LCA/KScpO1xyXG4gICAgICBxdWVyeS5ydW4oY2hhbm5lbERhdGEuY2hhbm5lbE5hbWUsIGNoYW5uZWxEYXRhLmNoYW5uZWxJZCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogMjAwXHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGV4ZWN1dGluZyBxdWVyeTonLCBlcnJvcik7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogNTAwXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGdldEF1ZGl0TG9nQ2hhbm5lbDogYXN5bmMgZnVuY3Rpb24oKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gQXVkaXRMb2dzQ2hhbm5lbCBMSU1JVCAxJykuZ2V0KCk7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogMjAwLFxyXG4gICAgICAgIGRhdGE6IHF1ZXJ5XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgY29kZTogNTAwXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkYlNlcnZpY2U7Il0sIm5hbWVzIjpbImRvdGVudiIsImNvbmZpZyIsImZpbGVVUkxUb1BhdGgiLCJqb2luIiwiZGlybmFtZSIsIkRhdGFiYXNlIiwiY3VycmVudERpciIsInVybCIsImRiUGF0aCIsImRiIiwiZmlsZU11c3RFeGlzdCIsImRiU2VydmljZSIsImlzTW9kdWxlRW5hYmxlZCIsIm5hbWUiLCJxdWVyeSIsInByZXBhcmUiLCJnZXQiLCJjb25zb2xlIiwibG9nIiwiaXNFbmFibGVkIiwiZ2V0QWxsTW9kdWxlcyIsImFsbCIsInNldEF1ZGl0TG9nQ2hhbm5lbCIsImNoYW5uZWxEYXRhIiwiZXhlYyIsInJ1biIsImNoYW5uZWxOYW1lIiwiY2hhbm5lbElkIiwiY29kZSIsImVycm9yIiwiZ2V0QXVkaXRMb2dDaGFubmVsIiwiZGF0YSJdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWUEsWUFBWSxTQUFTO0FBQ2pDQSxPQUFPQyxNQUFNO0FBQ2IsU0FBU0MsYUFBYSxRQUFRLE1BQU07QUFDcEMsU0FBU0MsSUFBSSxFQUFFQyxPQUFPLFFBQVEsT0FBTztBQUNyQyxPQUFPQyxjQUFjLGlCQUFpQjtBQUV0QyxNQUFNQyxhQUFhRixRQUFRRixjQUFjLFlBQVlLLEdBQUc7QUFDeEQsTUFBTUMsU0FBU0wsS0FBS0csWUFBWTtBQUVoQyxNQUFNRyxLQUFLLElBQUlKLFNBQVNHLFFBQVE7SUFDOUJFLGVBQWU7QUFDakI7QUFFQSxNQUFNQyxZQUFZO0lBQ2hCQyxpQkFBaUIsT0FBT0M7UUFDdEIsTUFBTUMsUUFBUUwsR0FBR00sT0FBTyxDQUFDLDhDQUE4Q0MsR0FBRyxDQUFDSDtRQUMzRUksUUFBUUMsR0FBRyxDQUFDSjtRQUNaLElBQUlBLE1BQU1LLFNBQVMsS0FBSyxHQUFHLE9BQU87UUFDbEMsT0FBTztJQUNUO0lBQ0FDLGVBQWU7UUFDWCxNQUFNTixRQUFRTCxHQUFHTSxPQUFPLENBQUMseUJBQXlCTSxHQUFHO1FBQ3JELE9BQU9QO0lBQ1g7SUFDQVEsb0JBQW9CLGVBQWVDLFdBQVc7UUFDNUMsSUFBSTtZQUNGZCxHQUFHZSxJQUFJLENBQUM7WUFDUixNQUFNVixRQUFRTCxHQUFHTSxPQUFPLENBQUM7WUFDekJELE1BQU1XLEdBQUcsQ0FBQ0YsWUFBWUcsV0FBVyxFQUFFSCxZQUFZSSxTQUFTO1lBQ3hELE9BQU87Z0JBQ0xDLE1BQU07WUFDUjtRQUNGLEVBQUUsT0FBT0MsT0FBTztZQUNkWixRQUFRWSxLQUFLLENBQUMsMEJBQTBCQTtZQUN4QyxPQUFPO2dCQUNMRCxNQUFNO1lBQ1I7UUFDRjtJQUNGO0lBQ0FFLG9CQUFvQjtRQUNsQixJQUFJO1lBQ0YsTUFBTWhCLFFBQVFMLEdBQUdNLE9BQU8sQ0FBQywwQ0FBMENDLEdBQUc7WUFDdEUsT0FBTztnQkFDTFksTUFBTTtnQkFDTkcsTUFBTWpCO1lBQ1I7UUFDRixFQUFFLE9BQU9lLE9BQU87WUFDZCxPQUFPO2dCQUNMRCxNQUFNO1lBQ1I7UUFDRjtJQUVGO0FBQ0Y7QUFFQSxlQUFlakIsVUFBVSJ9