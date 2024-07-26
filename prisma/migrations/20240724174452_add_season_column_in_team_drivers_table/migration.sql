/*
  Warnings:

  - You are about to drop the column `season` on the `teams` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "team_drivers" ADD COLUMN "season" INTEGER DEFAULT 2024;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_teams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_teams" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "teams";
DROP TABLE "teams";
ALTER TABLE "new_teams" RENAME TO "teams";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
