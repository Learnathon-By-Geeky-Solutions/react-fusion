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
			,
		}
	})

	const prevProgress = await prisma.moduelItemProgress.findUnique({
		where: {
			courseProgressId_moduleItemId: {
				courseProgressId: progressId,
				moduleItemId: prevItem?.id ?? ""
			}
		}
	})


	if (!prevProgress || !prevProgress.isCompleted) {
		throw new ApiError(httpStatus.FORBIDDEN, "Previous naim Not Completed")

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
	if (!progressData || !video) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
	}

	if (video?.moduleItem?.order && video?.moduleItem?.order > 1) {
		await checkPreviousItemCompletion(video?.moduleItem?.moduleId, video?.moduleItem?.order, progressData.id)

	}

	const result = await prisma.moduelItemProgress.upsert({
		where: {
			courseProgressId_moduleItemId: {
				moduleItemId: video.moudleItemId,
				courseProgressId: progressData.id
			}
		},
		update: {
			isCompleted: payload.isCompleted,
			VideoProgress: {
				create: {
					videoId: payload.videoId,
					timeWatched: payload.timeWatched
				},
				update: {
					timeWatched: payload.timeWatched
				}
			}
		},
		create: {
			courseProgressId: progressData.id,
			moduleItemId: video.moudleItemId,
			isCompleted: payload.isCompleted,
			VideoProgress: {
				create: {
					videoId: payload.videoId,
					timeWatched: payload.timeWatched
				}
			}

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
	if (!progressData || !quiz) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
	}


	if (quiz?.moduleItem?.order && quiz?.moduleItem?.order > 1) {
		await checkPreviousItemCompletion(quiz?.moduleItem?.moduleId, quiz?.moduleItem?.order, progressData.id)
	}


	const result = await prisma.moduelItemProgress.upsert({
		where: {
			courseProgressId_moduleItemId: {
				moduleItemId: quiz.moudleItemId,
				courseProgressId: progressData.id
			}
		},
		update: {
			isCompleted: payload.isCompleted,
			QuizProgress: {
				create: {
					score: payload.score,
					quizId: payload.quizId,

				},
				update: {
					score: payload.score
				}
			}
		},
		create: {
			courseProgressId: progressData.id,
			moduleItemId: quiz.moudleItemId,
			isCompleted: payload.isCompleted,
			QuizProgress: {
				create: {
					score: payload.score,
					quizId: payload.quizId
				}

			}

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

	const totalModuleItems = await prisma.moduleItem.count({
		where: {
			moduleId: payload.moduleId
		}

	})
	const completeModuleItems = await prisma.moduleItem.count({
		where: {
			moduleId: payload.moduleId,
			Progress: {
				some: {
					courseProgressId: progressData.id,
					isCompleted: true
				}
			}
		}
	})

	if (totalModuleItems !== completeModuleItems) {
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
