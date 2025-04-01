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

router.put("/update/:quizId", auth(UserRole.INSTRUCTOR), validateRequest(quizValidationSchema.quizUpdateSchema), accessValidation('quiz'), quizController.updateQuiz)

router.delete("/delete/:quizId", auth(UserRole.INSTRUCTOR), accessValidation('quiz'), quizController.deleteQuiz)

router.post("/check/:quizId", auth(UserRole.STUDENT), validateRequest(quizValidationSchema.quizCheckingSchema), accessValidation('quiz'), quizController.checkQuiz)

export const quizRoutes = router;
