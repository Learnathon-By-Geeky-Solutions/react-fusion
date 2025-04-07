import { JwtPayload } from "../../../interfaces/common"
import { ICommentsByVideoId, ICreateComment, IUpdateComment } from "./comment.interface"
import prisma from "../../../shared/prisma"


const getCommentsByVideoId = async (payload: ICommentsByVideoId) => {
    const result = await prisma.comment.findMany({
        where: {
            ...payload,
        },
        include: {
            user: {
                select: {
                    Student: {
                        select: {
                            name: true,
                            userId: true,
                            image: true,
                        }
                    }

                },
            },
        },
    })

    const flattenedResult = result.map(comment => ({
        ...comment,
        user: comment.user.Student,
    }));
    return flattenedResult
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

const updateComment = async (payload: IUpdateComment) => {
    const result = await prisma.comment.update({
        where: { id: payload.commentId },
        data: {
            comment: payload.comment
        }
    })
    return result
}

const deleteComment = async (commentId: string) => {
    const result = await prisma.comment.deleteMany({
        where: {
            id: commentId
        },
    })
    return result
}

export const commentService = { getCommentsByVideoId, createComment, updateComment, deleteComment }
