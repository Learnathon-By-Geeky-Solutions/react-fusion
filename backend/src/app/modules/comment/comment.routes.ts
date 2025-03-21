import express from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import validateRequest from '../../middlewares/validateRequest'
import { commentValidationSchema } from './comment.validation'
import { commentController } from './comment.controller'

const router = express.Router()
router.post("/get-comments", auth(UserRole.STUDENT), validateRequest(commentValidationSchema.getCommentsSchema), commentController.getCommentsByVideoId)
router.post("/create-comment", auth(UserRole.STUDENT), validateRequest(commentValidationSchema.createCommentsSchema), commentController.createComment)

router.put("/update-comment", auth(UserRole.STUDENT), validateRequest(commentValidationSchema.updateCommentsSchema), commentController.updateComment)

router.delete("/delete-comment/:id", auth(UserRole.STUDENT), commentController.deleteComment)

export const commentRoutes = router

