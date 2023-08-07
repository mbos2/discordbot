/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `Challenge` table. All the data in the column will be lost.
  - Added the required column `publishedAt` to the `Challenge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Challenge` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Challenge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "data" TEXT NOT NULL,
    "isPublished" INTEGER NOT NULL,
    "difficulty" INTEGER NOT NULL,
    "createdAt" INTEGER NOT NULL,
    "updatedAt" INTEGER NOT NULL,
    "publishedAt" INTEGER NOT NULL
);
INSERT INTO "new_Challenge" ("createdAt", "data", "difficulty", "id", "isPublished", "title", "type") SELECT "createdAt", "data", "difficulty", "id", "isPublished", "title", "type" FROM "Challenge";
DROP TABLE "Challenge";
ALTER TABLE "new_Challenge" RENAME TO "Challenge";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
