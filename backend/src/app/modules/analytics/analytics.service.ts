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
	const result = {
		studentAnalytics: {
			...studentAnalytics,
			totalEnrollments: enrolledCourses.length,
		},
		enrolledCourses
	}
	return result
}


const getStudentOne = async (user: JwtPayload, courseId: string) => {
	const courseProgress = await prisma.courseProgress.findUnique({
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
			MilestoneProgress: true,
			course : true
		},

	})


	const progressId = courseProgress?.id ?? ""

	const totalVideos = await prisma.video.count({
		where: {
			module: {
				milestone: {
					courseId: courseId
				}
			}
		}
	})

	const completedVideos = await prisma.videoProgress.count({
		where: {
			AND: [
				{
					courseProgressId: {
						equals: progressId
					}
				},
				{
					isCompleted: {
						equals: true
					}
				}
			]
		}
	})

	const totalQuizzes = await prisma.quiz.count({
		where: {
			module: {
				milestone: {
					courseId: courseId
				}
			}
		}
	})

	const completedQuizzes = await prisma.quizProgress.count({
		where: {
			AND: [
				{
					courseProgressId: {
						equals: progressId
					}
				},
				{
					isCompleted: {
						equals: true
					}
				}
			]
		}
	})
	const totalModules = await prisma.module.count({
		where: {
			milestone: {
				courseId: courseId
			}
		}
	})
	const completedModules = await prisma.moduleProgress.count({
		where: {
			AND: [
				{
					courseProgressId: {
						equals: progressId
					}
				},
				{
					isCompleted: {
						equals: true
					}
				}
			]
		}
	})

	const totalMilestones = await prisma.milestone.count({
		where: {
			courseId: courseId
		}
	})
	const completedMilestones = await prisma.milestoneProgress.count({
		where: {
			AND: [
				{
					courseProgressId: {
						equals: progressId
					}
				},
				{
					isCompleted: {
						equals: true
					}
				}
			]
		}
	})

	const totalScore = await prisma.question.aggregate({
		where: {
			quiz: {
				module: {
					milestone: {
						courseId: courseId
					}
				}
			}
		},
		_sum: {
			points: true
		}
	})
	const userScore = await prisma.quizProgress.aggregate({
		where: {
			courseProgressId: progressId
		},
		_sum: {
			score: true
		}
	})

	const totalWatchTime = await prisma.video.aggregate({
		where: {
			module: {
				milestone: {
					courseId: courseId
				}
			}
		},
		_sum: {
			length: true

		}
	})

	const userWatchTime = await prisma.videoProgress.aggregate({
		where: {
			courseProgressId: progressId
		},
		_sum: {
			timeWatched: true
		}
	})

	const result = {
		courseProgress,
		summary: {
			totalVideos: totalVideos,
			completedVideos: completedVideos,
			totalWatchTime: totalWatchTime._sum.length ?? 0,
			userWatchTime: userWatchTime._sum.timeWatched ?? 0,
			totalQuizzes: totalQuizzes,
			completedQuizzes: completedQuizzes,
			totalScore: totalScore._sum.points ?? 0,
			userScore: userScore._sum.score ?? 0,
			totalModules: totalModules,
			completedModules: completedModules,
			totalMilestones: totalMilestones,
			completedMilestones: completedMilestones,
		}
	}
	return result
}

const getInstructorAll = async (user: JwtPayload) => {
	const allCourses = await prisma.course.findMany({
		where: { instructorId: user.userId },
		select: {
			id: true,
			title: true,
			rating: true
		}
	})
	const totalStudents = await prisma.transactions.count({
		where: {
			courseId: {
				in: allCourses.map((course) => course.id)
			}
		}
	})

	const avgRating = await prisma.course.aggregate({
		where: {
			instructorId: user.userId
		},
		_avg: {
			rating: true
		}
	})

	const instructorFeedback = await prisma.instructorFeedback.findMany({
		where: {
			instructorId: user.userId
		}
	})
	const result = {
		totalCourses: allCourses.length,
		totalStudents,
		avgRating: avgRating._avg.rating ?? 0,
		indtructorFeedback: instructorFeedback,
		courses: allCourses
	}

	return result
}

const getInstructorOne = async (user: JwtPayload, courseId: string) => {
	const totalEnrollments = await prisma.transactions.count({
		where: {
			courseId: courseId
		}
	})
	const course = await prisma.course.findUnique({
		where: {
			id: courseId
		},
		select: {
			title: true,
			thumbnail: true,
			rating: true,
			description: true,
			price: true,
		}
	})
	const totalLikes = await prisma.video.aggregate({
		where: {
			module: {
				milestone: {
					courseId: courseId
				}
			}
		},
		_sum: {
			likeCount: true
		}

	})


	const totalDisLikes = await prisma.video.aggregate({
		where: {
			module: {
				milestone: {
					courseId: courseId
				}
			}
		},
		_sum: {
			dislikeCount: true
		}

	})

	const result = {
		...course,
		totalEnrollments,
		totalLikes: totalLikes._sum.likeCount ?? 0,
		totalDisLikes: totalDisLikes._sum.dislikeCount ?? 0
	}
	return result
}

export const analyticsService = { getStudentAll, getStudentOne, getInstructorAll, getInstructorOne }
