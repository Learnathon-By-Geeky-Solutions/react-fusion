import { JwtPayload } from "jsonwebtoken"
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

export const noteService = { getNote, createNote }
