-- DropForeignKey
ALTER TABLE "course_progress" DROP CONSTRAINT "course_progress_studentId_fkey";

-- AddForeignKey
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
