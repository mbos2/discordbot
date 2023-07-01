import * as dotenv from 'dotenv';
dotenv.config();
import Database from 'better-sqlite3';
const db = new Database('./database/database.db');

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

  const mediaChannels = `CREATE TABLE IF NOT EXISTS MediaChannel (
    id INTEGER PRIMARY KEY,
    channelName TEXT UNIQUE NOT NULL,
    channelId TEXT NOT NULL
  );`

  const collectedMessages = `CREATE TABLE IF NOT EXISTS CollectedMessages (
    id INTEGER PRIMARY KEY,
    discordUserId TEXT NOT NULL,
    discordUsername TEXT NOT NULL,
    discordMessageId TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    collectedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );`

  const alterCollectedMessagesWithEmbeds = `
    ALTER TABLE CollectedMessages
    ADD COLUMN embeds TEXT;
  `;

  try {
    db.prepare(modules);
    db.prepare(auditLogs);
    db.prepare(audtLogsChannels);
    db.prepare(mediaChannels);
    db.prepare(collectedMessages);
    db.prepare(alterCollectedMessagesWithEmbeds);
    db.exec(modules);
    db.exec(auditLogs);
    db.exec(audtLogsChannels);
    db.exec(mediaChannels);
    db.exec(collectedMessages);
    db.exec(alterCollectedMessagesWithEmbeds);
  } catch (error) {
    console.log(error)
  }
}

createDatabase();