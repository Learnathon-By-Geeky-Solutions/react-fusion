import express from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { analyticsController } from './analytics.controller'
import accessValidation from '../../middlewares/accessValidation'

const router = express.Router()

router.get('/student-all', auth(UserRole.STUDENT), analyticsController.getStudentAll)

router.get('/student/:courseId', auth(UserRole.STUDENT), accessValidation("course"), analyticsController.getStudentOne)



export const analyticsRoutes = router
