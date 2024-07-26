/*
  Warnings:

  - Made the column `grand_prix_season_id` on table `events` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grand_prix_season_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "events_grand_prix_season_id_fkey" FOREIGN KEY ("grand_prix_season_id") REFERENCES "grand_prix_season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_events" ("created_at", "grand_prix_season_id", "id", "name", "start_at", "updated_at") SELECT "created_at", "grand_prix_season_id", "id", "name", "start_at", "updated_at" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
