-- AlterTable
ALTER TABLE "teams" ADD COLUMN "season" INTEGER DEFAULT 2024;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "grand_prix_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "events_grand_prix_id_fkey" FOREIGN KEY ("grand_prix_id") REFERENCES "grand_prix" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_events" ("created_at", "grand_prix_id", "id", "name", "start_at", "updated_at") SELECT "created_at", "grand_prix_id", "id", "name", "start_at", "updated_at" FROM "events";
DROP TABLE "events";
ALTER TABLE "new_events" RENAME TO "events";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
