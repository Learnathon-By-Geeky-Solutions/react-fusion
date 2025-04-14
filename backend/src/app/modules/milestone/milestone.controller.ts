import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { milestoneService } from "./milestone.service";

const createMilestone = catchAsync(async (req, res, next) => {
	const result = await milestoneService.createMilestone(req.body)
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: "Milestone Created Successfully!",
		data: result
	})
})

const updateMilestone = catchAsync(async (req, res, next) => {
	const result = await milestoneService.updateMilestone(req.params.milestoneId, req.body)
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Milestone Updated Successfully!",
		data: result
	})
})

const deleteMilestone = catchAsync(async (req, res, next) => {
	const result = await milestoneService.deleteMilestone(req.params.milestoneId)
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.OK,
		message: "Milestone Deleted Successfully!",
		data: result
	})
})

export const milestoneController = { createMilestone, updateMilestone, deleteMilestone }
