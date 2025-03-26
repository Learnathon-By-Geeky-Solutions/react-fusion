import { updateSourceFile } from "typescript";
import { JwtPayload } from "../../../interfaces/common"
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { noteService } from "./note.service";
import httpStatus from "http-status";


const getNote = catchAsync(async (req, res, next) => {
    const result = await noteService.getNote(req.user as JwtPayload, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Note Retrieved Successfully',
        data: result
    })
})


const createNote = catchAsync(async (req, res, next) => {
    const result = await noteService.createNote(req.user as JwtPayload, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Note Created Successfully',
        data: result
    })
})

const updateNote = catchAsync(async (req, res, next) => {
    const result = await noteService.updateNote(req.user as JwtPayload, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Note Update Successfully',
        data: result
    })
})

const deleteNote = catchAsync(async (req, res, next) => {
    const result = await noteService.deleteNote(req.user as JwtPayload, req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Note Update Successfully',
        data: result
    })
})


export const noteController = { getNote, createNote, updateNote, deleteNote }
