-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('hourly', 'daily');

-- CreateTable
CREATE TABLE "Subscription" (
    "email" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_email_key" ON "Subscription"("email");
