import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { courseZodSchema } from './course.validation'
import { courseController } from './course.controller'
import auth from '../../middlewares/auth'
import { UserRole } from '@prisma/client'


const router = express.Router()

router.post('/create', auth(UserRole.INSTRUCTOR), validateRequest(courseZodSchema.createCourseValidation), courseController.createCourse)
//router.post('/', courseController.createCourse)
router.post("/get-courses", validateRequest(courseZodSchema.getCourseValidataion), courseController.getAllCourses)

router.get("/:id", courseController.getSingleCourse)

router.get('/checkenroll/:courseId', auth(UserRole.STUDENT), courseController.checkEnrollment)

//TODO:
//  update for instructor
//  add isActive for courses
//  delete for instructor
export const courseRoutes = router
