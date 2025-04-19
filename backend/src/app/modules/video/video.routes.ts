import express from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { videoController } from './video.controller'
import validateRequest from '../../middlewares/validateRequest'
import { videoValidationSchema } from './video.validation'
import accessValidation from '../../middlewares/accessValidation'

const router = express.Router()

router.get('/:videoId', auth(UserRole.STUDENT, UserRole.INSTRUCTOR), accessValidation('video'), videoController.getVideo)

router.post("/", auth(UserRole.INSTRUCTOR), validateRequest(videoValidationSchema.createVideoValidation), accessValidation('module'), videoController.createVideo)

router.put('/:videoId', auth(UserRole.INSTRUCTOR), validateRequest(videoValidationSchema.updateVideoValidation), accessValidation('video'), videoController.updateVideo)

router.delete('/:videoId', auth(UserRole.INSTRUCTOR), accessValidation('video'), videoController.deleteVideo)

export const videoRoutes = router
