/*
  Warnings:

  - The values [quote] on the enum `ContactStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `quoteId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `quoteSentAt` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `contactId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Quote` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `projectId` to the `Note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ContactStatus_new" AS ENUM ('lead', 'proposal', 'won', 'lost');
ALTER TABLE "Contact" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Contact" ALTER COLUMN "status" TYPE "ContactStatus_new" USING ("status"::text::"ContactStatus_new");
ALTER TYPE "ContactStatus" RENAME TO "ContactStatus_old";
ALTER TYPE "ContactStatus_new" RENAME TO "ContactStatus";
DROP TYPE "ContactStatus_old";
ALTER TABLE "Contact" ALTER COLUMN "status" SET DEFAULT 'lead';
COMMIT;

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_quoteId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_contactId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_quoteId_fkey";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "quoteId",
DROP COLUMN "quoteSentAt",
ALTER COLUMN "companyId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "contactId",
ADD COLUMN     "projectId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "notionUrl" TEXT;

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Quote";

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
