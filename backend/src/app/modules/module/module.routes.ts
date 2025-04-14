import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import accessValidation from '../../middlewares/accessValidation'
import { moduleZodSchema } from './module.validation'
import { moduleController } from './module.controller'


const router = express.Router()

router.post("/", auth(UserRole.INSTRUCTOR), validateRequest(moduleZodSchema.createModuleValidation), accessValidation("milestone"), moduleController.createModule)

router.put("/:moduleId", auth(UserRole.INSTRUCTOR), validateRequest(moduleZodSchema.updateModuleValidation), accessValidation("module"), moduleController.updateModule)

router.delete("/:moduleId", auth(UserRole.INSTRUCTOR), accessValidation("module"), moduleController.deleteModule)

router.get("/:moduleId", moduleController.getModule)

export const moduleRoutes = router
