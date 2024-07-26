/*
  Warnings:

  - Made the column `season` on table `team_drivers` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_team_drivers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "team_id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "season" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "team_drivers_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "team_drivers_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_team_drivers" ("created_at", "driver_id", "id", "season", "team_id", "updated_at") SELECT "created_at", "driver_id", "id", "season", "team_id", "updated_at" FROM "team_drivers";
DROP TABLE "team_drivers";
ALTER TABLE "new_team_drivers" RENAME TO "team_drivers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
