import { resourceUsage } from "process";
import { JwtPayload } from "../../../interfaces/common";
import prisma from "../../../shared/prisma";
import { ICreateVideo, IUpdateVideo } from "./video.interface";
import { profile } from "console";


const getVideo = async (user: JwtPayload, videoId: string) => {
    const video = await prisma.video.findUnique({
        where: {
            id: videoId
        },
        include: {
            notes: {
                where: {
                    userId: user.userId
                }
            },
            comments: true,
            moduleItem: {
                include: {
                    module: {
                        include: {
                            milestone: true
                        }
                    }
                }
            }
        }
    })
    let result: any = video
    if (user.role === "STUDENT") {
        const courseId = video?.moduleItem?.module.milestone.courseId
        const progress = await prisma.courseProgress.findUnique({
            where: {
                studentId_courseId: {
                    studentId: user.userId,
                    courseId: courseId ?? ""
                }
            }
        })
        const videoProgress = await prisma.moduleItemProgress.findUnique({
            where: {
                courseProgressId_moduleItemId: {
                    courseProgressId: progress?.id ?? "",
                    moduleItemId: video?.moudleItemId ?? ""
                }
            },
            include: {
                VideoProgress: true
            }

        })

        result.progress = videoProgress?.VideoProgress ?? null
    }
    delete result.moduleItem.module
    return result
}


const updateVideo = async (videoId: string, payload: IUpdateVideo) => {
    const result = await prisma.video.update({
        where: {
            id: videoId
        },
        data: {
            ...payload
        }
    })
    return result
}


const deleteVideo = async (videoId: string) => {
    const result = await prisma.$transaction(async (tx) => {
        const video = await tx.video.delete({
            where: {
                id: videoId
            }
        })

        const deletedModuleItem = await tx.moduleItem.delete({
            where: {
                id: video.moudleItemId
            }
        })
        return deletedModuleItem
    })
    return result
}


const createVideo = async (payload: ICreateVideo) => {
    const result = await prisma.$transaction(async (tx) => {
        const orderNo = await prisma.moduleItem.aggregate({
            where: {
                moduleId: payload.moduleId
            },
            _max: {
                order: true
            }
        })

        const nextOrder = (orderNo._max?.order ?? 0) + 1

        return tx.video.create({
            data: {
                ...payload.video,
                moduleItem: {
                    create: {
                        moduleId: payload.moduleId,
                        order: nextOrder
                    }
                }
            }
        })
    })

    return result
}


export const videoService = { getVideo, updateVideo, deleteVideo, createVideo }
