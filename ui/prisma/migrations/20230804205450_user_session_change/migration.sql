/*
  Warnings:

  - You are about to alter the column `createdAt` on the `UserSessions` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.
  - You are about to alter the column `expiresAt` on the `UserSessions` table. The data in that column could be lost. The data in that column will be cast from `DateTime` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserSessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "expiresAt" INTEGER NOT NULL
);
INSERT INTO "new_UserSessions" ("createdAt", "expiresAt", "id", "tokenId", "userId") SELECT "createdAt", "expiresAt", "id", "tokenId", "userId" FROM "UserSessions";
DROP TABLE "UserSessions";
ALTER TABLE "new_UserSessions" RENAME TO "UserSessions";
CREATE UNIQUE INDEX "UserSessions_tokenId_key" ON "UserSessions"("tokenId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
