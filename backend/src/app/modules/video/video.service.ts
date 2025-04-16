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
    const result = await prisma.video.update({
        where: {
            id: videoId
        }, data: {
            isDeleted: true
        }
    })
    return result
}


const createVideo = async (payload: ICreateVideo) => {
    const orderNo = await prisma.moduleItem.aggregate({
        where: {
            moduleId: payload.moduleId
        },
        _max: {
            order: true
        }
    })
    console.log(orderNo._max)
    let nextOrder = 1
    if (orderNo._max.order) {
        nextOrder += orderNo._max.order
    }

    const result = await prisma.video.create({
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

    return result
}


export const videoService = { getVideo, updateVideo, deleteVideo, createVideo }
