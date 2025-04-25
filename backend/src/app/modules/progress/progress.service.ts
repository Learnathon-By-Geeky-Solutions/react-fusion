import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import { JwtPayload } from "../../../interfaces/common"
import prisma from "../../../shared/prisma"
import { ICourseUpdate, IMilestoneUpdate, IModuleUpdate, IQuizUpdate, IVideoUpdate } from "./progress.interface"


const checkPreviousItemCompletion = async (moduleId: string, order: number, progressId: string) => {
	const prevItem = await prisma.moduleItem.findUnique({
		where: {
			moduleId_order: {
				moduleId: moduleId,
				order: order - 1
			}
		}
	})

	const prevProgress = await prisma.moduleItemProgress.findUnique({
		where: {
			courseProgressId_moduleItemId: {
				courseProgressId: progressId,
				moduleItemId: prevItem?.id ?? ""
			}
		}
	})


	if (!prevProgress?.isCompleted) {
		throw new ApiError(httpStatus.FORBIDDEN, "Previous Item Not Completed")

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

	const result = await prisma.moduleItemProgress.upsert({
		where: {
			courseProgressId_moduleItemId: {
				moduleItemId: video.moduleItemId,
				courseProgressId: progressData.id
			}
		},
		update: {
			isCompleted: payload.isCompleted,
			VideoProgress: {
				update: {
					timeWatched: payload.timeWatched
				}
			}
		},
		create: {
			courseProgressId: progressData.id,
			moduleItemId: video.moduleItemId,
			isCompleted: payload.isCompleted,
			VideoProgress: {
				create: {
					videoId: payload.videoId,
					timeWatched: payload.timeWatched
				}
			}

		}

	})
	const lastItem = await prisma.moduleItem.findFirst({
		where: {
			moduleId: video?.moduleItem?.moduleId
		},
		orderBy: { order: 'desc' }
	})

	if (video?.moduleItem?.order === lastItem?.order) {
		await updateModule(user, {
			moduleId: video?.moduleItem?.moduleId ?? "",
			isCompleted: true,

		})
	}

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


	const result = await prisma.moduleItemProgress.upsert({
		where: {
			courseProgressId_moduleItemId: {
				moduleItemId: quiz.moduleItemId,
				courseProgressId: progressData.id
			}
		},
		update: {
			isCompleted: payload.isCompleted,
			QuizProgress: {
				update: {
					score: payload.score
				}
			}
		},
		create: {
			courseProgressId: progressData.id,
			moduleItemId: quiz.moduleItemId,
			isCompleted: payload.isCompleted,
			QuizProgress: {
				create: {
					score: payload.score,
					quizId: payload.quizId
				}

			}

		}

	})

	const lastItem = await prisma.moduleItem.findFirst({
		where: {
			moduleId: quiz?.moduleItem?.moduleId
		},
		orderBy: { order: 'desc' }
	})

	if (quiz?.moduleItem?.order === lastItem?.order) {
		await updateModule(user, {
			moduleId: quiz?.moduleItem?.moduleId ?? "",
			isCompleted: true,
		})
	}
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

	const lastItem = await prisma.module.findFirst({
		where: {
			milestoneId: module?.milestoneId
		},
		orderBy: { order: "desc" }
	})
	if (lastItem?.order === module?.order) {
		await updateMilestone(user, {
			milestoneId: module?.milestoneId ?? "",
			isCompleted: true
		})
	}

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
			isCompleted: true,
			module: {
				milestoneId: payload.milestoneId
			}
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

	const lastMilestone = await prisma.milestone.findFirst({
		where: {
			courseId: milestone?.courseId
		},
		orderBy: { order: "desc" }
	})

	if (lastMilestone?.order == milestone?.order) {
		await updateCourse(user, {
			courseId: milestone?.courseId ?? "",
			isCompleted: true,
			progress: 100
		})
	}
	return result
}


const updateCourse = async (user: JwtPayload, payload: ICourseUpdate) => {
	const totalMilestones = await prisma.milestone.count({
		where: {
			courseId: payload.courseId
		}
	})

	const progressData = await prisma.courseProgress.findUnique({
		where: {
			studentId_courseId: {
				studentId: user.userId,
				courseId: payload.courseId
			}
		},
	})
	if (!progressData) {
		throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
	}

	const completedMilestones = await prisma.milestoneProgress.count({
		where: {
			courseProgressId: progressData.id,
			isCompleted: true
		}
	})


	if (totalMilestones !== completedMilestones) {
		throw new ApiError(httpStatus.FORBIDDEN, "All Milestones Are Not Completed")

	}

	const result = await prisma.courseProgress.upsert({
		where: {
			studentId_courseId: {
				courseId: payload.courseId,
				studentId: user.userId
			}
		},
		update: {
			isCompleted: payload.isCompleted,
			progress: payload.progress
		},
		create: {
			studentId: user.userId,
			courseId: payload.courseId,
			isCompleted: payload.isCompleted,
			progress: payload.progress
		}
	})

	return result
}


export const progressService = { updateVideo, updateQuiz, updateModule, updateMilestone, updateCourse }
