import { JwtPayload } from "../../../interfaces/common";
import prisma from "../../../shared/prisma";
import { ICreateVideo, IUpdateVideo } from "./video.interface";


const getVideo = async (user: JwtPayload, videoId: string) => {
    const video = await prisma.video.findUnique({
        where: {
            id: videoId
        },
        include: {
            module: {
                include: {
                    milestone: true
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
    const result = await prisma.video.create({
        data: {
            moduleId: payload.moduleId,
            ...payload.video
        }
    })
    return result
}


export const videoService = { getVideo, updateVideo, deleteVideo, createVideo }
