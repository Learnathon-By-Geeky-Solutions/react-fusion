import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { courseZodSchema } from './course.validation'
import { courseController } from './course.controller'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'
import accessValidation from '../../middlewares/accessValidation'


const router = express.Router()

router.post('/', auth(UserRole.INSTRUCTOR), validateRequest(courseZodSchema.createCourseValidation), courseController.createCourse)

router.put('/:courseId', auth(UserRole.INSTRUCTOR), accessValidation('course'), validateRequest(courseZodSchema.updateCourseValidation), courseController.updateCourse)

router.delete("/:courseId", auth(UserRole.INSTRUCTOR), accessValidation('course'), courseController.deleteCourse)

router.post("/get-courses", validateRequest(courseZodSchema.getCourseValidataion), courseController.getAllCourses)

router.get("/:id", courseController.getSingleCourse)

router.get('/checkenroll/:courseId', auth(UserRole.STUDENT), courseController.checkEnrollment)

export const courseRoutes = router
