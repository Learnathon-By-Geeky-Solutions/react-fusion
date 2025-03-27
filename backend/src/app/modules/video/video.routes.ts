import express from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { videoController } from './video.controller'
import validateRequest from '../../middlewares/validateRequest'
import { videoValidationSchema } from './video.validation'
import accessValidation from '../../middlewares/accessValidation'

const router = express.Router()

router.get('/:videoId', auth(UserRole.STUDENT), accessValidation('video'), videoController.getVideo)

router.post('/update/:videoId', auth(UserRole.INSTRUCTOR), validateRequest(videoValidationSchema.videoValidation), accessValidation('video'), videoController.updateVideo)

router.delete('/delete/:videoId', auth(UserRole.INSTRUCTOR), accessValidation('video'), videoController.deleteVideo)

export const videoRoutes = router
