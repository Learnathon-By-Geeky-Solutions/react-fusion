import { JwtPayload } from "../../../interfaces/common"
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { progressService } from "./progress.service";



const updateVideo = catchAsync(async (req, res, next) => {
	const result = await progressService.updateVideo(req.user as JwtPayload, req.body);
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Video Prgoress Updated Successfully',
		data: result
	})
})


const updateQuiz = catchAsync(async (req, res, next) => {
	const result = await progressService.updateQuiz(req.user as JwtPayload, req.body);
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Quiz Prgoress Updated Successfully',
		data: result
	})
})


const updateModule = catchAsync(async (req, res, next) => {
	const result = await progressService.updateModule(req.user as JwtPayload, req.body);
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Module Prgoress Updated Successfully',
		data: result
	})
})


const updateMilestone = catchAsync(async (req, res, next) => {
	const result = await progressService.updateMilestone(req.user as JwtPayload, req.body);
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Milestone Prgoress Updated Successfully',
		data: result
	})
})


export const progressController = { updateVideo, updateQuiz, updateModule, updateMilestone }
