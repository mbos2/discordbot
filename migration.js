import * as dotenv from 'dotenv';
dotenv.config();
import Database from 'better-sqlite3';
const db = new Database('./src/db/database/database.db');

const createDatabase = () => {

  const modules = 
  `
    CREATE TABLE IF NOT EXISTS Modules (
      id INTEGER PRIMARY KEY,
      moduleName TEXT NOT NULL,
      isActive INTEGER NOT NULL
    );
  `
  const auditLogs = `CREATE TABLE IF NOT EXISTS AuditLogs (
    id INTEGER PRIMARY KEY,
    content TEXT NOT NULL
  );`

  const audtLogsChannels = `CREATE TABLE IF NOT EXISTS AuditLogsChannel (
    id INTEGER PRIMARY KEY,
    channelName TEXT UNIQUE NOT NULL,
    channelId TEXT NOT NULL
  );`

  try {
    db.prepare(modules);
    db.prepare(auditLogs);
    db.prepare(audtLogsChannels);
    db.exec(modules);
    db.exec(auditLogs);
    db.exec(audtLogsChannels);
  } catch (error) {
    console.log(error)
  }
}

createDatabase();