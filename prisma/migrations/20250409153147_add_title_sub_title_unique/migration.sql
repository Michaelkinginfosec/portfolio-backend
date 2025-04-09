/*
  Warnings:

  - A unique constraint covering the columns `[title,subTitle]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Project_title_subTitle_key" ON "Project"("title", "subTitle");
