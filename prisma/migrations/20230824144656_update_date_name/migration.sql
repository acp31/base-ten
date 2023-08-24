/*
  Warnings:

  - You are about to drop the column `data_data` on the `Finances` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Finances" DROP CONSTRAINT "Finances_company_id_fkey";

-- AlterTable
ALTER TABLE "Finances" DROP COLUMN "data_data",
ADD COLUMN     "data_date" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Finances" ADD CONSTRAINT "Finances_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER INDEX "User.email_unique" RENAME TO "User_email_key";
