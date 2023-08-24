/*
  Warnings:

  - Made the column `data_date` on table `Finances` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Finances" ALTER COLUMN "data_date" SET NOT NULL;
