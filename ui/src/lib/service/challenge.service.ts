import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
const currentDir = dirname(fileURLToPath(import.meta.url));
const dbPath = join(currentDir, '../../../../database/database.db');

const db = new Database(dbPath, {
  fileMustExist: true
});

const challengeService = {
  getAllChallenges: async () => {
    try {
      const dailyChallenges = db.prepare('SELECT * FROM Challenge WHERE type=?').all('daily');
      const weeklyChallenges = db.prepare('SELECT * FROM Challenge WHERE type=?').all('weekly');
  
      return {
        challenges: {
          daily: dailyChallenges,
          weekly: weeklyChallenges
        }
      }
    } catch (error) {
      throw error;
    }
  },
  getAllApprovals: async () => {
    try {
      const approvals = db.prepare('SELECT * FROM ChallengeApprovals').all();
  
      return approvals;
    } catch (error) {
      throw error;
    }
  },
  getChallengeById: async (id: string) => {
    try {
      const challenge = db.prepare('SELECT * FROM Challenge WHERE id=?').all(id);
      return challenge;
    } catch (error) {
      throw error;
    }
  }
}

export default challengeService;