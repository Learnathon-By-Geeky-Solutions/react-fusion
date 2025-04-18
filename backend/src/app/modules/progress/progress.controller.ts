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
		message: 'Video Progress Updated Successfully',
		data: result
	})
})


const updateQuiz = catchAsync(async (req, res, next) => {
	const result = await progressService.updateQuiz(req.user as JwtPayload, req.body);
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Quiz Progress Updated Successfully',
		data: result
	})
})


const updateModule = catchAsync(async (req, res, next) => {
	const result = await progressService.updateModule(req.user as JwtPayload, req.body);
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Module Progress Updated Successfully',
		data: result
	})
})


const updateMilestone = catchAsync(async (req, res, next) => {
	const result = await progressService.updateMilestone(req.user as JwtPayload, req.body);
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Milestone Progress Updated Successfully',
		data: result
	})
})


const updateCourse = catchAsync(async (req, res, next) => {
	const result = await progressService.updateCourse(req.user as JwtPayload, req.body);
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Course Progress Updated Successfully',
		data: result
	})
})
export const progressController = { updateVideo, updateQuiz, updateModule, updateMilestone, updateCourse }
