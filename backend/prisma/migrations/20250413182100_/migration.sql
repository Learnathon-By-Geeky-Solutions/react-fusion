-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "isPublished" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "likeCount" SET DEFAULT 0,
ALTER COLUMN "dislikeCount" SET DEFAULT 0;
