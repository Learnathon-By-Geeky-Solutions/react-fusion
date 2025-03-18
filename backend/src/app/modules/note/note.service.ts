import prisma from "../../../shared/prisma"
import { ICreateNote, IGetNote } from "./note.interface"

const getNote = async (payload: IGetNote) => {
    const result = await prisma.note.findFirst({
        where: {
            AND: [
                {
                    userId: {
                        equals: payload.userId
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

const createNote = async (payload: ICreateNote) => {
    const result = await prisma.note.create({ data: payload })
    return result
}

export const noteService = { getNote, createNote }
