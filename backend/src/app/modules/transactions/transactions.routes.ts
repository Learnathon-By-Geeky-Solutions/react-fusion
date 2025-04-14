import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { transactionValidationSchema } from './transactions.validation'
import { transactionController } from './transactions.controller'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'

const router = express.Router()

router.get('/history', auth(UserRole.STUDENT), transactionController.getHistory)

router.post('/buy-course', auth(UserRole.STUDENT), validateRequest(transactionValidationSchema.buyCourseSchema), transactionController.buyCourse)

export const transactionRoutes = router
