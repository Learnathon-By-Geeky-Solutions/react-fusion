import { JwtPayload } from '../../../interfaces/common'
import prisma from "../../../shared/prisma"
import { ICreateNote, IGetNote } from "./note.interface"
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

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
    const courseId = (video?.module.milestone.course.id)
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

const getNote = async (user: JwtPayload, payload: IGetNote) => {
    const isAuthorized = await checkAccess(user, payload.videoId)
    if (!isAuthorized) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')

    }
    const result = await prisma.note.findFirst({
        where: {
            AND: [
                {
                    userId: {
                        equals: user.userId
                    }
                },
                {
                    videoId: {
                        equals: payload.videoId
                    }
                },
            ]


        }
    })
    return result
}

const createNote = async (user: JwtPayload, payload: ICreateNote) => {
    const isAuthorized = await checkAccess(user, payload.videoId)
    if (!isAuthorized) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')

    }
    const result = await prisma.note.create({
        data: {
            ...payload,
            userId: user.userId

        }
    })
    return result
}

const updateNote = async (user: JwtPayload, payload: ICreateNote) => {
    const isAuthorized = await checkAccess(user, payload.videoId)
    if (!isAuthorized) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')

    }
    const result = await prisma.note.updateMany({
        where: {
            AND: [
                {
                    videoId: {
                        equals: payload.videoId
                    }
                },
                {
                    userId: {
                        equals: user.userId
                    }
                }
            ]
        },
        data: {
            note: payload.note

        }
    })
    return result
}

const deleteNote = async (user: JwtPayload, payload: IGetNote) => {
    const isAuthorized = await checkAccess(user, payload.videoId)
    if (!isAuthorized) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')

    }
    const result = await prisma.note.deleteMany({
        where: {
            AND: [
                {
                    videoId: {
                        equals: payload.videoId
                    }
                },
                {
                    userId: {
                        equals: user.userId
                    }
                }
            ]
        }
    })
    return result
}

export const noteService = { getNote, createNote, updateNote, deleteNote }
