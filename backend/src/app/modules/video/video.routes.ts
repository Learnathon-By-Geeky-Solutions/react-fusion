import express from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import { videoController } from './video.controller'

const router = express.Router()

router.get('/:id', auth(UserRole.STUDENT), videoController.getVideo)

export const videoRoutes = router
