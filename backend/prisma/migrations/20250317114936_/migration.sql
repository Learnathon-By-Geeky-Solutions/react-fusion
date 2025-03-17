/*
  Warnings:

  - You are about to drop the `CourseTeacher` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseTeacher" DROP CONSTRAINT "CourseTeacher_coureId_fkey";

-- DropForeignKey
ALTER TABLE "CourseTeacher" DROP CONSTRAINT "CourseTeacher_instructorId_fkey";

-- DropTable
DROP TABLE "CourseTeacher";

-- CreateTable
CREATE TABLE "_CourseToInstructor" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToInstructor_AB_unique" ON "_CourseToInstructor"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToInstructor_B_index" ON "_CourseToInstructor"("B");

-- AddForeignKey
ALTER TABLE "_CourseToInstructor" ADD CONSTRAINT "_CourseToInstructor_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CourseToInstructor" ADD CONSTRAINT "_CourseToInstructor_B_fkey" FOREIGN KEY ("B") REFERENCES "instructors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
