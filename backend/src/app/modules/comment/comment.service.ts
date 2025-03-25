import { JwtPayload } from "../../../interfaces/common"
import { ICommentsByVideoId, ICreateComment, IUpdateComment } from "./comment.interface"
import prisma from "../../../shared/prisma"
import ApiError from "../../../errors/ApiError"
import httpStatus from "http-status"

const checkAccess = async (user: JwtPayload, videoId: string) => {
    const video = await prisma.video.findUnique({
        where: { id: videoId },
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

    },)
    const instructorId = (video?.module.milestone.course.instructorId)
    const courseId = (video?.module.milestone.course.id)
    if (user.role === 'INSTRUCTOR' && user.userId === instructorId) {
        return true
    }

    const isCourseBought = await prisma.transactions.findFirst({
        where: {
            AND: [
                {
                    studentId: {
                        equals: user.userId
                    }
                },
                {
                    courseId: {
                        equals: courseId
                    }
                }
            ]


        }
    })
    if (isCourseBought) {
        return true
    }
    return false
}


const getCommentsByVideoId = async (user: JwtPayload, payload: ICommentsByVideoId) => {
    const isAuthorized = await checkAccess(user, payload.videoId)
    if (!isAuthorized) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')

    }

    const result = await prisma.comment.findMany({
        where: {
            ...payload,
        }
    })
    return result
}

const createComment = async (user: JwtPayload, payload: ICreateComment) => {
    const isAuthorized = await checkAccess(user, payload.videoId)
    if (!isAuthorized) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')

    }
    const result = await prisma.comment.create({
        data: {
            userId: user.userId,
            ...payload

        }
    })
    return result
}

const updateComment = async (user: JwtPayload, payload: IUpdateComment) => {
    const comment = await prisma.comment.findUnique({ where: { id: payload.id } })
    if (comment?.userId !== user.userId) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
    }

    const result = await prisma.comment.update({
        where: { id: payload.id },
        data: {
            comment: payload.comment
        }
    })
    return result
}

const deleteComment = async (user: JwtPayload, id: string) => {
    const comment = await prisma.comment.findUnique({ where: { id: id } })
    if (comment?.userId !== user.userId) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
    }
    const result = await prisma.comment.deleteMany({
        where: {
            id: id
        },
    })
    return result
}

export const commentService = { getCommentsByVideoId, createComment, updateComment, deleteComment }
