/*
  Warnings:

  - You are about to drop the `WordProject` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "WordProject";

-- CreateTable
CREATE TABLE "WorkProject" (
    "id" UUID NOT NULL,
    "image" TEXT,
    "iosLink" TEXT,
    "androidLink" TEXT,
    "webLink" TEXT,
    "githubLink" TEXT,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkProject_title_key" ON "WorkProject"("title");

-- CreateIndex
CREATE UNIQUE INDEX "WorkProject_subTitle_key" ON "WorkProject"("subTitle");
