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
    // validate with bank in real world

    const isDuplicate = await prisma.transactions.findUnique({
        where: {
            txnId: payload.txnId
        }
    })
    if (isDuplicate) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Course Already Purchased!')
    }

    const course = await prisma.course.findUnique({
        where: { id: payload.courseId }
    })
    if (!course || course.isDeleted) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Course Not Available!')
    }


    const result = await prisma.$transaction(async (prisma) => {

        const txn = await prisma.transactions.create({
            data: {
                studentId: user.userId,
                courseId: payload.courseId,
                txnId: payload.txnId
            }
        })
        await prisma.courseProgress.create({
            data: {
                studentId: user.userId,
                courseId: payload.courseId,
                progress: 0.0
            }
        })
        return txn
    })

    return result
}

export const transactionService = { getHistory, buyCourse }
