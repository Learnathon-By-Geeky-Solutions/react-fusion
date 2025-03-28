import { JwtPayload } from '../../../interfaces/common'
import prisma from "../../../shared/prisma"
import { ICreateNote, IGetNote } from "./note.interface"

const getNote = async (user: JwtPayload, payload: IGetNote) => {
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
    const result = await prisma.note.create({
        data: {
            ...payload,
            userId: user.userId

        }
    })
    return result
}

const updateNote = async (user: JwtPayload, payload: ICreateNote) => {
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
