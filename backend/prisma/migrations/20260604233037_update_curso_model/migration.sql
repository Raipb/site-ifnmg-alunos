/*
  Warnings:

  - You are about to drop the column `description` on the `Curso` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Curso` table. All the data in the column will be lost.
  - Added the required column `descricao` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duracao` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `modalidade` to the `Curso` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Curso` table without a default value. This is not possible if the table is not empty.

*/
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Curso" ("createdAt", "id") SELECT "createdAt", "id" FROM "Curso";
DROP TABLE "Curso";
ALTER TABLE "new_Curso" RENAME TO "Curso";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
