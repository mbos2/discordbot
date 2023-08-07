/*
  Warnings:

  - You are about to alter the column `isPublished` on the `Challenge` table. The data in that column could be lost. The data in that column will be cast from `Boolean` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Challenge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "isPublished" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "expiresAt" INTEGER NOT NULL
);
INSERT INTO "new_Challenge" ("createdAt", "data", "difficulty", "expiresAt", "id", "isPublished", "type") SELECT "createdAt", "data", "difficulty", "expiresAt", "id", "isPublished", "type" FROM "Challenge";
DROP TABLE "Challenge";
ALTER TABLE "new_Challenge" RENAME TO "Challenge";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
