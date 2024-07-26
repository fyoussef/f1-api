/*
  Warnings:

  - Made the column `season` on table `teams` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_teams" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_teams" ("created_at", "id", "name", "season", "updated_at") SELECT "created_at", "id", "name", "season", "updated_at" FROM "teams";
DROP TABLE "teams";
ALTER TABLE "new_teams" RENAME TO "teams";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
