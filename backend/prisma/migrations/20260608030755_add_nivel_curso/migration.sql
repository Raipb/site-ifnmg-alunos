-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Curso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "modalidade" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "duracao" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "nivel" TEXT NOT NULL DEFAULT 'Técnico',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Curso" ("createdAt", "descricao", "duracao", "horario", "id", "modalidade", "titulo") SELECT "createdAt", "descricao", "duracao", "horario", "id", "modalidade", "titulo" FROM "Curso";
DROP TABLE "Curso";
ALTER TABLE "new_Curso" RENAME TO "Curso";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
