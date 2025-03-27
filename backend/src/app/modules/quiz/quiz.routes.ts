import express from 'express';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { quizValidationSchema } from './quiz.validation';
import { quizController } from './quiz.controller';
import accessValidation from '../../middlewares/accessValidation';


const router = express.Router();
router.get("/:quizId", auth(UserRole.INSTRUCTOR, UserRole.STUDENT), accessValidation('quiz'), quizController.getQuiz)
router.post("/create", auth(UserRole.INSTRUCTOR), validateRequest(quizValidationSchema.quizCreateSchema), accessValidation('module'), quizController.createQuiz)
router.put("/update/:quizId", auth(UserRole.INSTRUCTOR), validateRequest(quizValidationSchema.quizCreateSchema), quizController.updateQuiz)
router.delete("/delete/:quizId", auth(UserRole.INSTRUCTOR), quizController.deleteQuiz)
//TODO:
//  complete above routes
//  add route to check quiz -> return marks


export const quizRoutes = router;
