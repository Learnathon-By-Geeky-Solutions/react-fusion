
import { JwtPayload } from "../../../interfaces/common";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { transactionService } from "./transactions.service";


const getHistory = catchAsync(async (req, res, next) => {
    const result = await transactionService.getHistory(req.user as JwtPayload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Transaction History Retrieved Successfully',
        data: result
    })
})

const buyCourse = catchAsync(async (req, res, next) => {
    const result = await transactionService.buyCourse(req.user as JwtPayload, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Course Purchase Successful',
        data: result
    })
})

export const transactionController = { getHistory, buyCourse }
