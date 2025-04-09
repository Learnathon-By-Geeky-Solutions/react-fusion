import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { UserValidation } from './user.validations';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get(
  '/',
  UserController.getAllUser,
);

router.post(
  '/verify-user',
  validateRequest(UserValidation.verifyUserZodSchema),
  UserController.verifyUser,
);

router.post(
  '/create-admin',
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(UserValidation.AdminZodSchema),
  UserController.createAdmin
);

router.post(
  '/create-instructor',
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(UserValidation.InstructorZodSchema),
  UserController.createInstructor
);

router.post(
  '/create-student',
  FileUploadHelper.upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data)
    next()
  },
  validateRequest(UserValidation.StudentZodSchema),
  UserController.createStudent
);

router.get("/profile", auth(UserRole.STUDENT, UserRole.INSTRUCTOR), UserController.getProfile);

export const userRoutes = router;
