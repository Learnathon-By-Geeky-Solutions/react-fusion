import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { JwtPayload } from "../../../interfaces/common";

const createMilestone = catchAsync(async (req, res, next) => {
	const result = 'hi'
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: "Milestone Created Successfully!",
		data: result
	})
})

export const milestoneController = { createMilestone }
