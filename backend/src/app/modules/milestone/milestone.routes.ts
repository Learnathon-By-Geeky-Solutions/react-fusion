import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import accessValidation from '../../middlewares/accessValidation'
import { milestoneZodSchema } from './milestone.validation'
import { milestoneController } from './milestone.controller'


const router = express.Router()

router.post("/", auth(UserRole.INSTRUCTOR), validateRequest(milestoneZodSchema.createMilestoneValidation), accessValidation("milestone"), milestoneController.createMilestone)

export const milestoneRoutes = router
