import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { UserServices } from './user.service';
import { IUploadFile } from '../../../interfaces/file';
import ApiError from '../../../errors/ApiError';

const createAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const file = req?.file && req.file

  const result = await UserServices.createAdmin(req.body, file as IUploadFile);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Admin created successfully!',
    data: result,
  });
});

const createInstructor = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const file = req?.file && req.file

  const result = await UserServices.createInstructor(req.body, file as IUploadFile);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Instructor created successfully!',
    data: result,
  });
});

const createStudent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const file = req?.file && req.file

  const result = await UserServices.createStudent(req.body, file as IUploadFile);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Student created successfully!',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {

  const result = await UserServices.getAllUser();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieval successfully',
    data: result
  });
});

const verifyUser = catchAsync(async (req: Request, res: Response) => {

  const token = req.headers.authorization
  if (!token) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Token not found')
  }
  const result = await UserServices.verifyUser(token, req.body.otp);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: '',
    data: result
  });
});



export const UserController = {
  createAdmin,
  createInstructor,
  createStudent,
  getAllUser,
  verifyUser
};
