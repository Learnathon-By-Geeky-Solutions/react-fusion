import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { JwtPayload } from "../../../interfaces/common";
import { quizService } from "./quiz.service";

const createQuiz = catchAsync(async (req, res, next) => {
    const result = await quizService.createQuiz(req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Quiz Created Successfully',
        data: result
    })
})
const getQuiz = catchAsync(async (req, res, next) => {
    const result = await quizService.getQuiz(req.user as JwtPayload, req.params.quizId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Quiz Retrieved Successfully',
        data: result
    })
})

const updateQuiz = catchAsync(async (req, res, next) => {
    const result = await quizService.updateQuiz(req.params.quizId, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Quiz Updated Successfully',
        data: result
    })
})

const deleteQuiz = catchAsync(async (req, res, next) => {
    const result = await quizService.deleteQuiz(req.params.quizId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Quiz Deleted Successfully',
        data: result
    })
})

const checkQuiz = catchAsync(async (req, res, next) => {
    const result = await quizService.checkQuiz(req.params.quizId, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Marks Calculated Successfully',
        data: result
    })
})

export const quizController = { createQuiz, getQuiz, updateQuiz, deleteQuiz, checkQuiz }
