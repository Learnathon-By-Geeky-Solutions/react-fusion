import { JwtPayload } from "../../../interfaces/common";
import { IBuyCourseSchema } from "./transactions.interface";
import prisma from "../../../shared/prisma";

const getHistory = async (user: JwtPayload) => {
    const result = await prisma.transactions.findMany({
        where: {
            studentId: user.userId
        },
        include: {
            course: true
        }

    })
    return result
}
const buyCourse = async (user: JwtPayload, payload: IBuyCourseSchema) => {
    const result = await prisma.transactions.create({
        data: {
            studentId: user.userId,
            courseId: payload.courseId,
            txnId: payload.txnId
        }
    })
    return result
}

export const transactionService = { getHistory, buyCourse }
