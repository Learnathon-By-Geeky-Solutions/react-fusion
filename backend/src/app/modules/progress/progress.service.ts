import httpStatus from "http-status"
import ApiError from "../../../errors/ApiError"
import { JwtPayload } from "../../../interfaces/common"
import prisma from "../../../shared/prisma"
import { IMilestoneUpdate, IModuleUpdate, IQuizUpdate, IVideoUpdate } from "./progress.interface"

const updateVideo = async (user: JwtPayload, payload: IVideoUpdate) => {
	const video = await prisma.video.findUnique({
		where: {
			id: payload.videoId
		},
		include: {
			ModuleItem: {
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
	const courseId = video?.ModuleItem?.module.milestone.courseId ?? ""
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
			ModuleItem: {
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

	const courseId = quiz?.ModuleItem?.module.milestone.courseId ?? ""
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
			isCompleted: payload.isCompleted,
		},
		update: {
			isCompleted: payload.isCompleted,
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
