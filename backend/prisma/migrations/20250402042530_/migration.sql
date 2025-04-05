-- DropForeignKey
ALTER TABLE "CourseStudent" DROP CONSTRAINT "CourseStudent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "instructor_feedback" DROP CONSTRAINT "instructor_feedback_studentId_fkey";

-- AddForeignKey
ALTER TABLE "CourseStudent" ADD CONSTRAINT "CourseStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructor_feedback" ADD CONSTRAINT "instructor_feedback_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
