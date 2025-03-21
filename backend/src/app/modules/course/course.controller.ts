import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { JwtPayload } from "../../../interfaces/common";
import { courseService } from "./course.service";

//const createCourse = catchAsync(async(req:Request, res:Response, next) => {
const createCourse = catchAsync(async (req, res, next) => {

    const result = await courseService.createCourse(req.user as JwtPayload, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Course Created Successfully!",
        data: result
    })
})
const getAllCourses = catchAsync(async (req, res, next) => {
    const filters = req.body.filters
    const result = await courseService.getAllCourses(filters)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All Course Retrieved Successfully!",
        data: result
    })

})
const getSingleCourse = catchAsync(async (req, res, next) => {
    const result = await courseService.getSingleCourse(req.params.id)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Course Retrieved Successfully!",
        data: result
    })

})
export const courseController = { createCourse, getAllCourses, getSingleCourse }
