import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { analyticsService } from "./analytics.service";
import { JwtPayload } from "../../../interfaces/common";

const getStudentAll = catchAsync(async (req, res, next) => {
	const result = await analyticsService.getStudentAll(req.user as JwtPayload)
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Analytics Retrieved Successfully',
		data: result
	})
})

const getStudentOne = catchAsync(async (req, res, next) => {
	const result = await analyticsService.getStudentOne(req.user as JwtPayload, req.params.courseId)
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Course Analytics Retrieved Successfully',
		data: result
	})
})

const getInstructorAll = catchAsync(async (req, res, next) => {
	const result = await analyticsService.getInstructorAll(req.user as JwtPayload)
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Analytics Retrieved Successfully',
		data: result
	})
})

const getInstructorOne = catchAsync(async (req, res, next) => {
	const result = await analyticsService.getInstructorOne(req.user as JwtPayload, req.params.courseId)
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: 'Course Analytics Retrieved Successfully',
		data: result
	})
})


export const analyticsController = { getStudentAll, getStudentOne, getInstructorAll, getInstructorOne }
