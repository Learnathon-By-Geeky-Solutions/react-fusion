import { JwtPayload } from "../../../interfaces/common";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IVideo } from "./video.interface";
import { isAutoAccessorPropertyDeclaration } from "typescript";
import { videoValidationSchema } from "./video.validation";

const checkAccess = async (user: JwtPayload, videoId: string) => {
    const video = await prisma.video.findUnique({
        where: {
            id: videoId
        },
        include: {
            module: {
                include: {
                    milestone: {
                        include: {
                            course: true
                        }
                    }
                }
            }
        }


    })
    const instructorId = video?.module.milestone.course.instructorId
    if (instructorId === user.userId) {
        return true
    }
    return false

}

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
    const courseId = video?.module.milestone.courseId
    const transaction = await prisma.transactions.findFirst({
        where: {
            AND: [
                {
                    courseId: {
                        equals: courseId
                    },
                    studentId: {
                        equals: user.userId
                    }
                }
            ]
        }
    })
    if (transaction === null) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Course Not Purchased!');
    }
    if (video?.isDeleted) {
        video.url = ""
        video.comments = []
    }
    return video
}


const updateVideo = async (user: JwtPayload, videoId: string, payload: IVideo) => {
    const isAuthorized = await checkAccess(user, videoId)
    if (!isAuthorized) {
        return new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
    }
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

const deleteVideo = async (user: JwtPayload, videoId: string) => {
    const isAuthorized = await checkAccess(user, videoId)
    if (!isAuthorized) {
        return new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized Access!');
    }
    const result = await prisma.video.update({
        where: {
            id: videoId
        }, data: {
            isDeleted: true
        }
    })
    return result
}

export const videoService = { getVideo, updateVideo, deleteVideo }
