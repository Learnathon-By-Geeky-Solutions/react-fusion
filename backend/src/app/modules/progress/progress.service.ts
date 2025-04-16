import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import { JwtPayload } from "../../../interfaces/common"
import prisma from "../../../shared/prisma"
import { IMilestoneUpdate, IModuleUpdate, IQuizUpdate, IVideoUpdate } from "./progress.interface"


const checkPreviousItemCompletion = async (moduleId: string, order: number, progressId: string) => {
	const prevItem = await prisma.moduleItem.findUnique({
		where: {
			moduleId_order: {
				moduleId: moduleId,
				order: order - 1
			}
		},
		include: {
			quiz: true,
			video: true
		}
	})
	if (prevItem?.video) {
		const prevVideoProgress = await prisma.videoProgress.findUnique({
			where: {
				courseProgressId_videoId: {
					courseProgressId: progressId,
					videoId: prevItem?.video?.id ?? ""
				}
			}
		})
		if (!prevVideoProgress?.isCompleted) {
			throw new ApiError(httpStatus.FORBIDDEN, "Previous Video Not Completed")
		}

	}
	else if (prevItem?.quiz) {
		const prevQuizProgress = await prisma.quizProgress.findUnique({
			where: {
				courseProgressId_quizId: {
					courseProgressId: progressId,
					quizId: prevItem?.quiz?.id ?? ""
				}
			}
		})

		if (!prevQuizProgress?.isCompleted) {
			throw new ApiError(httpStatus.FORBIDDEN, "Previous Quiz Not Completed")
		}
	}
}
const updateVideo = async (user: JwtPayload, payload: IVideoUpdate) => {
	const video = await prisma.video.findUnique({
		where: {
			id: payload.videoId
		},
		include: {
			moduleItem: {
				include: {
					module: {
						include: {
							milestone: true
						}
					},
				}
			}
		}
	})
	const courseId = video?.moduleItem?.module.milestone.courseId ?? ""
	const progressData = await prisma.courseProgress.findUnique({
		where: {
			studentId_courseId: {
				studentId: user.userId,
				courseId: courseId
			}
		},
	})
	if (!progressData) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
	}

	if (video?.moduleItem?.order && video?.moduleItem?.order > 1) {
		await checkPreviousItemCompletion(video?.moduleItem?.moduleId, video?.moduleItem?.order, progressData.id)

	}

	const result = await prisma.videoProgress.upsert({
		where: {
			courseProgressId_videoId: {
				courseProgressId: progressData.id,
				videoId: payload.videoId
			}
		},
		create: {
			courseProgressId: progressData.id,
			videoId: payload.videoId,
			isCompleted: payload.isCompleted,
			timeWatched: payload.timeWatched
		},
		update: {
			isCompleted: payload.isCompleted,
			timeWatched: payload.timeWatched
		}
	})
	return result
}

const updateQuiz = async (user: JwtPayload, payload: IQuizUpdate) => {
	const quiz = await prisma.quiz.findUnique({
		where: {
			id: payload.quizId
		},
		include: {
			moduleItem: {
				include: {
					module: {
						include: {
							milestone: true
						}
					},

				}
			}
		}
	})

	const courseId = quiz?.moduleItem?.module.milestone.courseId ?? ""
	const progressData = await prisma.courseProgress.findUnique({
		where: {
			studentId_courseId: {
				studentId: user.userId,
				courseId: courseId
			}
		}
	})
	if (!progressData) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
	}


	if (quiz?.moduleItem?.order && quiz?.moduleItem?.order > 1) {
		await checkPreviousItemCompletion(quiz?.moduleItem?.moduleId, quiz?.moduleItem?.order, progressData.id)
	}

	const result = await prisma.quizProgress.upsert({
		where: {
			courseProgressId_quizId: {
				courseProgressId: progressData.id,
				quizId: payload.quizId
			}
		},
		create: {
			courseProgressId: progressData.id,
			quizId: payload.quizId,
			isCompleted: payload.isCompleted,
			score: payload.score
		},
		update: {
			isCompleted: payload.isCompleted,
			score: payload.score
		}
	})
	return result
}


const updateModule = async (user: JwtPayload, payload: IModuleUpdate) => {
	const module = await prisma.module.findUnique({
		where: {
			id: payload.moduleId
		},
		include: {
			milestone: true
		}
	})

	const courseId = module?.milestone.courseId ?? ""

	const progressData = await prisma.courseProgress.findUnique({
		where: {
			studentId_courseId: {
				studentId: user.userId,
				courseId: courseId
			}
		},
	})
	if (!progressData) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
	}


	const totalVideos = await prisma.video.count({
		where: {
			moduleItem: {
				moduleId: payload.moduleId
			},
			isDeleted: false
		}
	})
	const completedVideos = await prisma.videoProgress.count({
		where: {
			courseProgressId: progressData.id,
			isCompleted: true
		}
	})

	const totalQuizzes = await prisma.quiz.count({
		where: {
			moduleItem: {
				moduleId: payload.moduleId
			},
		}
	})
	const completedQuizzes = await prisma.quizProgress.count({
		where: {
			courseProgressId: progressData.id,
			isCompleted: true
		}
	})
	if (totalVideos !== completedVideos) {
		throw new ApiError(httpStatus.FORBIDDEN, "All Module Items Are Not Completed")
	}
	if (totalQuizzes !== completedQuizzes) {
		throw new ApiError(httpStatus.FORBIDDEN, "All Module Items Are Not Completed")
	}

	const result = await prisma.moduleProgress.upsert({
		where: {
			courseProgressId_moduleId: {
				courseProgressId: progressData.id,
				moduleId: payload.moduleId
			}
		},
		create: {
			courseProgressId: progressData.id,
			moduleId: payload.moduleId,
			isCompleted: payload.isCompleted
		},
		update: {
			isCompleted: payload.isCompleted
		}
	})

	return result
}


const updateMilestone = async (user: JwtPayload, payload: IMilestoneUpdate) => {
	const milestone = await prisma.milestone.findUnique({
		where: {
			id: payload.milestoneId
		},
	})

	const courseId = milestone?.courseId ?? ""

	const progressData = await prisma.courseProgress.findUnique({
		where: {
			studentId_courseId: {
				studentId: user.userId,
				courseId: courseId
			}
		},
	})
	if (!progressData) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
	}

	const totalModules = await prisma.module.count({
		where: {
			milestoneId: payload.milestoneId,
		}
	})

	const completedModules = await prisma.moduleProgress.count({
		where: {
			courseProgressId: progressData.id,
			isCompleted: true
		}
	})
	if (totalModules !== completedModules) {
		throw new ApiError(httpStatus.FORBIDDEN, "All Modules Are Not Completed")

	}

	const result = await prisma.milestoneProgress.upsert({
		where: {
			courseProgressId_milestoneId: {
				courseProgressId: progressData.id,
				milestoneId: payload.milestoneId
			}
		},
		create: {
			courseProgressId: progressData.id,
			milestoneId: payload.milestoneId,
			isCompleted: payload.isCompleted,
		},
		update: {
			isCompleted: payload.isCompleted,
		}
	})
	return result
}

export const progressService = { updateVideo, updateQuiz, updateModule, updateMilestone }
