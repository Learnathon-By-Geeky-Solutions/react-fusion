import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { courseZodSchema } from './course.validation'
import { courseController } from './course.controller'


const router = express.Router()

router.post('/create', validateRequest(courseZodSchema.createCourseValidation), courseController.createCourse)
//router.post('/', courseController.createCourse)
router.post("/get-courses", validateRequest(courseZodSchema.getCourseValidataion), courseController.getAllCourses)
router.get("/:id", courseController.getSingleCourse)
export const courseRoutes = router
