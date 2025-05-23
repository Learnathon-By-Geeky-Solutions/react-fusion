import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { JwtPayload } from "../../../interfaces/common";
import { courseService } from "./course.service";
import { verifyToken } from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const createCourse = catchAsync(async (req, res, next) => {
    const result = await courseService.createCourse(req.user as JwtPayload, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Course Created Successfully!",
        data: result
    })
})

const updateCourse = catchAsync(async (req, res, next) => {
    const result = await courseService.updateCourse(req.params.courseId, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Course Updated Successfully!",
        data: result
    })
})


const deleteCourse = catchAsync(async (req, res, next) => {
    const result = await courseService.deleteCourse(req.params.courseId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Course Deleted Successfully!",
        data: result
    })
})

const getAllCourses = catchAsync(async (req, res, next) => {
    let result = null
    const filterEnroll = req.body.filters?.enrolled ?? null
    if (filterEnroll !== null) {
        const user = await verifyToken(req, [UserRole.STUDENT])
        result = await courseService.getAllCourses(req.body, user as JwtPayload)
    } else {
        result = await courseService.getAllCourses(req.body, null)
    }
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

const checkEnrollment = catchAsync(async (req, res, next) => {
    const result = await courseService.checkEnrollment(req.params.courseId, req.user as JwtPayload)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Course Retrieved Successfully!",
        data: result
    })

})


const continueCourse = catchAsync(async (req, res, next) => {
    const result = await courseService.continueCourse(req.user as JwtPayload, req.params.courseId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Course Retrieved Successfully!",
        data: result
    })

})
export const courseController = {
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourses,
    getSingleCourse,
    checkEnrollment,
    continueCourse
}
