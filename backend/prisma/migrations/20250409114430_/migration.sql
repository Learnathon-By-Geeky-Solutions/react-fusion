-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'INSTRUCTOR', 'STUDENT');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('BLOCKED', 'ACTIVE', 'PENDING', 'DELETED');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "MaritalStatus" AS ENUM ('MARRIED', 'UNMARRIED');

-- CreateEnum
CREATE TYPE "QualificationLevel" AS ENUM ('HIGH_SCHOOL', 'BACHELORS', 'MASTERS', 'PHD');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "OTP" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "image" TEXT,
    "contactNumber" TEXT NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructors" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "experience" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "qualification" "QualificationLevel" NOT NULL,
    "currentWorkingPlace" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "image" TEXT,
    "contactNumber" TEXT NOT NULL,

    CONSTRAINT "instructors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,
    "qualification" "QualificationLevel" NOT NULL,
    "currentInstitution" TEXT NOT NULL,
    "image" TEXT,
    "contactNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "price" DOUBLE PRECISION NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Milestone" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "Milestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "milestoneId" TEXT NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "options" TEXT[],
    "answer" TEXT NOT NULL,
    "points" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "length" DOUBLE PRECISION NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "likeCount" INTEGER NOT NULL,
    "dislikeCount" INTEGER NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikeUser" (
    "videoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "LikeUser_pkey" PRIMARY KEY ("videoId","userId")
);

-- CreateTable
CREATE TABLE "DislikeUser" (
    "videoId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "DislikeUser_pkey" PRIMARY KEY ("videoId","userId")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "note" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseStudent" (
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "CourseStudent_pkey" PRIMARY KEY ("courseId","studentId")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "txnId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student_analytics" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseCompleted" INTEGER NOT NULL,
    "totalTimeSpent" DOUBLE PRECISION NOT NULL,
    "progress" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "student_analytics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "course_progress" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,
    "progress" DOUBLE PRECISION NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "course_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "video_progress" (
    "id" TEXT NOT NULL,
    "courseProgressId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "timeWatched" DOUBLE PRECISION NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "video_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quiz_progress" (
    "id" TEXT NOT NULL,
    "courseProgressId" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quiz_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "module_progress" (
    "id" TEXT NOT NULL,
    "courseProgressId" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "module_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "milestone_progress" (
    "id" TEXT NOT NULL,
    "courseProgressId" TEXT NOT NULL,
    "milestoneId" TEXT NOT NULL,
    "isCompleted" BOOLEAN NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "milestone_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "instructor_feedback" (
    "id" TEXT NOT NULL,
    "instructorId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "feedback" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "instructor_feedback_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admins_userId_key" ON "admins"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_email_key" ON "admins"("email");

-- CreateIndex
CREATE UNIQUE INDEX "instructors_userId_key" ON "instructors"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "instructors_email_key" ON "instructors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_userId_key" ON "students"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "students_email_key" ON "students"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Note_userId_videoId_key" ON "Note"("userId", "videoId");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_txnId_key" ON "Transactions"("txnId");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_courseId_studentId_key" ON "Transactions"("courseId", "studentId");

-- CreateIndex
CREATE UNIQUE INDEX "student_analytics_studentId_key" ON "student_analytics"("studentId");

-- CreateIndex
CREATE UNIQUE INDEX "course_progress_studentId_courseId_key" ON "course_progress"("studentId", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "video_progress_courseProgressId_videoId_key" ON "video_progress"("courseProgressId", "videoId");

-- CreateIndex
CREATE UNIQUE INDEX "quiz_progress_courseProgressId_quizId_key" ON "quiz_progress"("courseProgressId", "quizId");

-- CreateIndex
CREATE UNIQUE INDEX "module_progress_courseProgressId_moduleId_key" ON "module_progress"("courseProgressId", "moduleId");

-- CreateIndex
CREATE UNIQUE INDEX "milestone_progress_courseProgressId_milestoneId_key" ON "milestone_progress"("courseProgressId", "milestoneId");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructors" ADD CONSTRAINT "instructors_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructors"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Module" ADD CONSTRAINT "Module_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeUser" ADD CONSTRAINT "LikeUser_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeUser" ADD CONSTRAINT "LikeUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "students"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DislikeUser" ADD CONSTRAINT "DislikeUser_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DislikeUser" ADD CONSTRAINT "DislikeUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "students"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStudent" ADD CONSTRAINT "CourseStudent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStudent" ADD CONSTRAINT "CourseStudent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_analytics" ADD CONSTRAINT "student_analytics_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "course_progress" ADD CONSTRAINT "course_progress_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_progress" ADD CONSTRAINT "video_progress_courseProgressId_fkey" FOREIGN KEY ("courseProgressId") REFERENCES "course_progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "video_progress" ADD CONSTRAINT "video_progress_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_progress" ADD CONSTRAINT "quiz_progress_courseProgressId_fkey" FOREIGN KEY ("courseProgressId") REFERENCES "course_progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quiz_progress" ADD CONSTRAINT "quiz_progress_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_progress" ADD CONSTRAINT "module_progress_courseProgressId_fkey" FOREIGN KEY ("courseProgressId") REFERENCES "course_progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "module_progress" ADD CONSTRAINT "module_progress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestone_progress" ADD CONSTRAINT "milestone_progress_courseProgressId_fkey" FOREIGN KEY ("courseProgressId") REFERENCES "course_progress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "milestone_progress" ADD CONSTRAINT "milestone_progress_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructor_feedback" ADD CONSTRAINT "instructor_feedback_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "instructor_feedback" ADD CONSTRAINT "instructor_feedback_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
