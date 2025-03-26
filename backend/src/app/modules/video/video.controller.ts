import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { videoService } from "./video.service";
import { JwtPayload } from "../../../interfaces/common";


const getVideo = catchAsync(async (req, res, next) => {
    const result = await videoService.getVideo(req.user as JwtPayload, req.params.id)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Video Retrieved Successfully',
        data: result
    })
})

const updateVideo = catchAsync(async (req, res, next) => {
    const result = await videoService.updateVideo(req.user as JwtPayload, req.params.id, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Video Updated Successfully',
        data: result
    })
})


const deleteVideo = catchAsync(async (req, res, next) => {
    const result = await videoService.deleteVideo(req.user as JwtPayload, req.params.id)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Video Deleted Successfully',
        data: result
    })
})

export const videoController = { getVideo, updateVideo, deleteVideo }
