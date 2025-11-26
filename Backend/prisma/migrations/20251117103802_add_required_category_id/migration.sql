/*
  Warnings:

  - The `status` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `type` on the `Service` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[serviceId,startTime]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `endTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('UNPAID', 'PAID', 'REFUNDED', 'FAILED');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "clientNotes" TEXT,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'UNPAID',
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "BookingStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "type",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "image" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "ServiceCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCategory_name_key" ON "ServiceCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCategory_slug_key" ON "ServiceCategory"("slug");

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "Booking"("userId");

-- CreateIndex
CREATE INDEX "Booking_serviceId_idx" ON "Booking"("serviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_serviceId_startTime_key" ON "Booking"("serviceId", "startTime");

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "ServiceCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
