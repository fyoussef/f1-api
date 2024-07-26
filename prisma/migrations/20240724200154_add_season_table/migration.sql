/*
  Warnings:

  - You are about to drop the column `season` on the `grand_prix` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `team_drivers` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "seasons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "year" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "grand_prix_season" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grand_prix_id" TEXT NOT NULL,
    "season_id" TEXT,
    CONSTRAINT "grand_prix_season_grand_prix_id_fkey" FOREIGN KEY ("grand_prix_id") REFERENCES "grand_prix" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "grand_prix_season_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_grand_prix" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_grand_prix" ("created_at", "id", "name", "updated_at") SELECT "created_at", "id", "name", "updated_at" FROM "grand_prix";
DROP TABLE "grand_prix";
ALTER TABLE "new_grand_prix" RENAME TO "grand_prix";
CREATE TABLE "new_team_drivers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "team_id" TEXT NOT NULL,
    "driver_id" TEXT NOT NULL,
    "season_id" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "team_drivers_team_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "team_drivers_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "team_drivers_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "seasons" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_team_drivers" ("created_at", "driver_id", "id", "team_id", "updated_at") SELECT "created_at", "driver_id", "id", "team_id", "updated_at" FROM "team_drivers";
DROP TABLE "team_drivers";
ALTER TABLE "new_team_drivers" RENAME TO "team_drivers";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
