/*
  Warnings:

  - You are about to drop the column `price` on the `cart_item` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `cart_item` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart_item` DROP COLUMN `price`,
    DROP COLUMN `quantity`;
