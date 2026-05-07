-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Application" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "position" TEXT NOT NULL,
    "salaryFrom" INTEGER,
    "salaryTo" INTEGER,
    "internshipDuration" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'Sent',
    "link" TEXT,
    "format" TEXT NOT NULL DEFAULT 'Remote',
    "employmentType" TEXT NOT NULL DEFAULT 'Full-time',
    "experience" TEXT,
    "notes" TEXT,
    "priority" TEXT NOT NULL DEFAULT 'Medium',
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "companyId" INTEGER NOT NULL,
    CONSTRAINT "Application_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Application" ("companyId", "createdAt", "employmentType", "experience", "format", "id", "internshipDuration", "link", "notes", "position", "priority", "salaryFrom", "salaryTo", "status", "updatedAt") SELECT "companyId", "createdAt", "employmentType", "experience", "format", "id", "internshipDuration", "link", "notes", "position", "priority", "salaryFrom", "salaryTo", "status", "updatedAt" FROM "Application";
DROP TABLE "Application";
ALTER TABLE "new_Application" RENAME TO "Application";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
