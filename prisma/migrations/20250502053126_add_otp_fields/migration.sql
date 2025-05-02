-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "otpCode" TEXT,
ADD COLUMN     "otpExpires" TIMESTAMP(3);
