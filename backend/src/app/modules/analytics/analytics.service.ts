import { truncate } from "fs";
import { JwtPayload } from "../../../interfaces/common";
import prisma from "../../../shared/prisma";

const getStudentAll = async (user: JwtPayload) => {
	const studentAnalytics = await prisma.studentAnalytics.findUnique({
		where: {
			studentId: user.userId
		}
	})
	const enrolledCourses = await prisma.transactions.findMany({
		where: {
			studentId: user.userId
		},
		select: {
			id: true,
			courseId: true,
		}
	})
	studentAnalytics
	const result = {
		studentAnalytics: {
			...studentAnalytics,
			totalEnrolles: enrolledCourses.length,
		},
		enrolledCourses
	}
	return result
}


const getStudentOne = async (user: JwtPayload, courseId: string) => {
	const result = await prisma.courseProgress.findUnique({
		where: {
			studentId_courseId: {
				studentId: user.userId,
				courseId: courseId
			}
		},
		include: {
			VideoProgress: true,
			QuizProgress: true,
			ModuleProgress: true,
			MilestoneProgress: true
		},

	})
	return result
}

export const analyticsService = { getStudentAll, getStudentOne }
