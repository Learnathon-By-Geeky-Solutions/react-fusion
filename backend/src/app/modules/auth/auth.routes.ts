import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { authController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
    '/login',
    validateRequest(AuthValidation.loginZodSchema),
    authController.loginUser
);

router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenZodSchema),
    authController.refreshToken
);

router.post(
    '/change-password',
    validateRequest(AuthValidation.changePasswordZodSchema),
    auth(
        UserRole.ADMIN,
        UserRole.STUDENT,
        UserRole.INSTRUCTOR
    ),
    authController.changePassword
);
router.post(
    '/forgot-password',
    validateRequest(AuthValidation.forgotPasswordZodSchema),
    authController.forgotPass
);

router.post(
    '/reset-password',
    validateRequest(AuthValidation.resetPasswordZodSchema),
    authController.resetPassword
);

export const authRoutes = router;