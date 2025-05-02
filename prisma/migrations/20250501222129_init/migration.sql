/*
  Warnings:

  - You are about to drop the `HobbyProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('work', 'WORk', 'hobby', 'HOBBY');

-- DropTable
DROP TABLE "HobbyProject";

-- DropTable
DROP TABLE "WorkProject";

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "type" "ProjectType" NOT NULL,
    "image" TEXT,
    "iosLink" TEXT,
    "androidLink" TEXT,
    "webLink" TEXT,
    "githubLink" TEXT,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_title_key" ON "Project"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Project_subTitle_key" ON "Project"("subTitle");
