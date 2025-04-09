-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL,
    "image" TEXT,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
