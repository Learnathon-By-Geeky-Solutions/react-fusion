import { JwtPayload } from "../../../interfaces/common";
import prisma from "../../../shared/prisma";
import { ICreateVideo, IUpdateVideo } from "./video.interface";


const getVideo = async (user: JwtPayload, videoId: string) => {
    const video = await prisma.video.findUnique({
        where: {
            id: videoId
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
            },
            notes: {
                where: {
                    userId: user.userId
                }
            },
            comments: true
        }


    })
    if (video?.isDeleted) {
        video.url = ""
        video.comments = []
    }
    return video
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
