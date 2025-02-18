/*
  Warnings:

  - The values [TO_GO] on the enum `ConsumptionMethod` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `avatarImgUrl` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `coverImgUrl` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `avatarImageUrl` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverImageUrl` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ConsumptionMethod_new" AS ENUM ('TAKEAWAY', 'DINE_IN');
ALTER TABLE "Order" ALTER COLUMN "consumptionMethod" TYPE "ConsumptionMethod_new" USING ("consumptionMethod"::text::"ConsumptionMethod_new");
ALTER TYPE "ConsumptionMethod" RENAME TO "ConsumptionMethod_old";
ALTER TYPE "ConsumptionMethod_new" RENAME TO "ConsumptionMethod";
DROP TYPE "ConsumptionMethod_old";
COMMIT;

-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "avatarImgUrl",
DROP COLUMN "coverImgUrl",
ADD COLUMN     "avatarImageUrl" TEXT NOT NULL,
ADD COLUMN     "coverImageUrl" TEXT NOT NULL;
