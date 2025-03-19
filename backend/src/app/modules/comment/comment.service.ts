import { JwtPayload } from "jsonwebtoken"
import { ICommentsByVideoId, ICreateComment, IUpdateComment } from "./comment.interface"
import prisma from "../../../shared/prisma"

const getCommentsByVideoId = async (user: JwtPayload, payload: ICommentsByVideoId) => {
    const result = await prisma.comment.findMany({
        where: {
            ...payload
        }
    })
    return result
}

const createComment = async (user: JwtPayload, payload: ICreateComment) => {
    const result = await prisma.comment.create({
        data: {
            userId: user.userId,
            ...payload

        }
    })
    return result
}

const updateComment = async (user: JwtPayload, payload: IUpdateComment) => {
    const result = await prisma.comment.updateMany({
        where: {
            AND: [
                {
                    id: {
                        equals: payload.id
                    }
                },

                {
                    userId: {
                        equals: user.userId
                    }
                },
            ]
        },
        data: {
            comment: payload.comment
        }
    })
    return result
}

const deleteComment = async (user: JwtPayload, id: string) => {
    const result = await prisma.comment.deleteMany({
        where: {
            AND: [
                {
                    id: {
                        equals: id
                    }
                },
                {
                    userId: {
                        equals: user.userId
                    }
                },
            ]
        },
    })
    return result
}

export const commentService = { getCommentsByVideoId, createComment, updateComment, deleteComment }
