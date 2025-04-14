import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { moduleService } from "./module.service";

const createModule = catchAsync(async (req, res, next) => {
	const result = await moduleService.createModule(req.body)
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: "Module Created Successfully!",
		data: result
	})
})

const updateModule = catchAsync(async (req, res, next) => {
	const result = await moduleService.updateModule(req.params.moduleId, req.body)
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: "Module Updated Successfully!",
		data: result
	})
})


const deleteModule = catchAsync(async (req, res, next) => {
	const result = await moduleService.deleteModule(req.params.moduleId)
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: "Module Deleted Successfully!",
		data: result
	})
})

const getModule = catchAsync(async (req, res, next) => {
	const result = await moduleService.getModule(req.params.moduleId)
	sendResponse(res, {
		success: true,
		statusCode: httpStatus.CREATED,
		message: "Module Retrieved Successfully!",
		data: result
	})
})

export const moduleController = { createModule, updateModule, deleteModule, getModule }
