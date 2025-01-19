/*
  Warnings:

  - You are about to drop the `BorrowHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BorrowHistory" DROP CONSTRAINT "BorrowHistory_bookId_fkey";

-- DropForeignKey
ALTER TABLE "BorrowHistory" DROP CONSTRAINT "BorrowHistory_studentId_fkey";

-- DropTable
DROP TABLE "BorrowHistory";
