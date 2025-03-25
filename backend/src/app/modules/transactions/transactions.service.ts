import { JwtPayload } from "../../../interfaces/common";
import { IBuyCourseSchema } from "./transactions.interface";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

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
    //TODO: validate with bank

    const isDuplicate = await prisma.transactions.findUnique({
        where: {
            txnId: payload.courseId
        }
    })
    if (isDuplicate) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Course Already Purchased!')
    }

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
