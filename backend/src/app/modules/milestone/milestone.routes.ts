import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import accessValidation from '../../middlewares/accessValidation'
import { milestoneZodSchema } from './milestone.validation'
import { milestoneController } from './milestone.controller'


const router = express.Router()

router.post("/", auth(UserRole.INSTRUCTOR), validateRequest(milestoneZodSchema.createMilestoneValidation), accessValidation("course"), milestoneController.createMilestone)

router.put("/:milestoneId", auth(UserRole.INSTRUCTOR), validateRequest(milestoneZodSchema.updateMilestoneValidation), accessValidation("milestone"), milestoneController.updateMilestone)

router.delete("/:milestoneId", auth(UserRole.INSTRUCTOR), accessValidation("milestone"), milestoneController.deleteMilestone)


export const milestoneRoutes = router
