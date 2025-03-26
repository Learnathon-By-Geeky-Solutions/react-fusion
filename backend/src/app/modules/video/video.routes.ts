import express from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { videoController } from './video.controller'
import validateRequest from '../../middlewares/validateRequest'
import { videoValidationSchema } from './video.validation'

const router = express.Router()

router.get('/:id', auth(UserRole.STUDENT), videoController.getVideo)
router.post('/update/:id', auth(UserRole.INSTRUCTOR), validateRequest(videoValidationSchema.videoValidation), videoController.updateVideo)
router.delete('/delete/:id', auth(UserRole.INSTRUCTOR), videoController.deleteVideo)

export const videoRoutes = router
