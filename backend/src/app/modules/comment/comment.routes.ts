import express from 'express'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import validateRequest from '../../middlewares/validateRequest'
import { commentValidationSchema } from './comment.validation'
import { commentController } from './comment.controller'
import accessValidation from '../../middlewares/accessValidation'

const router = express.Router()
router.post("/get-comments", auth(UserRole.STUDENT, UserRole.INSTRUCTOR), validateRequest(commentValidationSchema.getCommentsSchema), accessValidation('video'), commentController.getCommentsByVideoId)
router.post("/create-comment", auth(UserRole.STUDENT, UserRole.INSTRUCTOR), validateRequest(commentValidationSchema.createCommentsSchema), accessValidation('video'), commentController.createComment)

router.put("/update-comment", auth(UserRole.STUDENT, UserRole.INSTRUCTOR), validateRequest(commentValidationSchema.updateCommentsSchema), accessValidation('comment'), commentController.updateComment)

router.delete("/delete-comment/:commentId", auth(UserRole.STUDENT, UserRole.INSTRUCTOR), accessValidation('comment'), commentController.deleteComment)

export const commentRoutes = router

