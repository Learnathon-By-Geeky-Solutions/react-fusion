import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { commentService } from "./comment.service";
import { JwtPayload } from "../../../interfaces/common";

const getCommentsByVideoId = catchAsync(async (req, res, next) => {
    const result = await commentService.getCommentsByVideoId(req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comments Retreieved Successfully!",
        data: result
    })
})

const createComment = catchAsync(async (req, res, next) => {
    const result = await commentService.createComment(req.user as JwtPayload, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Comments Created Successfully!",
        data: result
    })
})


const updateComment = catchAsync(async (req, res, next) => {
    const result = await commentService.updateComment(req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comments Updated Successfully!",
        data: result
    })
})


const deleteComment = catchAsync(async (req, res, next) => {
    const result = await commentService.deleteComment(req.params.commentId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comments Deleted Successfully!",
        data: result
    })
})

export const commentController = { getCommentsByVideoId, createComment, updateComment, deleteComment }
