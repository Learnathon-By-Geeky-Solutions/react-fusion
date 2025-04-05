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
			totalEnrolles: enrolledCourses.length,
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
			MilestoneProgress: true
		},

	})


	const progressId = courseProgress?.id || ""

	const totalVideos = await prisma.video.count({
		where: {
			module: {
				milestone: {
					courseId: courseId
				}
			}
		}
	})

	const completedVidoes = await prisma.videoProgress.count({
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

	const totalQuizes = await prisma.quiz.count({
		where: {
			module: {
				milestone: {
					courseId: courseId
				}
			}
		}
	})

	const completedQuizes = await prisma.quizProgress.count({
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
			completedVidoes: completedVidoes,
			totalwatchTime: totalWatchTime._sum.length,
			userWatchTime: userWatchTime._sum.timeWatched,
			totalQuizes: totalQuizes,
			completedQuizes: completedQuizes,
			totalScore: totalScore._sum.points,
			userScore: userScore._sum.score,
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
			id: true
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
		avgRating: avgRating._avg.rating,
		indtructorFeedback: instructorFeedback,
	}

	return result
}

const getInstructorOne = async (user: JwtPayload, courseId: string) => {
	const totalEnrollments = await prisma.transactions.count({
		where: {
			courseId: courseId
		}
	})
	const avgRating = await prisma.course.aggregate({
		where: {
			id: courseId
		},
		_avg: {
			rating: true
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
		totalEnrollments,
		avgRating: avgRating._avg.rating,
		totalLikes: totalLikes._sum.likeCount,
		totalDisLikes: totalDisLikes._sum.dislikeCount
	}
	return result
}

export const analyticsService = { getStudentAll, getStudentOne, getInstructorAll, getInstructorOne }
