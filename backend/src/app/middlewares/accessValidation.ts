import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import prisma from '../../shared/prisma';


const accessValidation = (resourceType: string) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizId = req.params.quizId ?? req.body.quizId ?? null;
    const videoId = req.params.videoId ?? req.body.videoId ?? null;
    const moduleId = req.params.moduleId ?? req.body.moduleId ?? null;
    const commentId = req.params.commentId ?? req.body.commentId ?? null
    const milestoneId = req.params.milestoneId ?? req.body.milestoneId ?? null
    let courseId = req.params.courseId ?? req.body.courseId ?? null


    let resource = null
    let instructorId = null

    if (resourceType === 'quiz') {
      resource = await prisma.quiz.findUnique({
        where: { id: quizId },
        include: {
          module: {
            include: {
              milestone: {
                include: {
                  course: true
                }
              }

            }
          }
        }
      })

      instructorId = resource?.module?.milestone?.course?.instructorId
      courseId = resource?.module.milestone.courseId ?? ""
    }

    else if (resourceType === 'video') {
      resource = await prisma.video.findUnique({
        where: { id: videoId },
        include: {
          module: {
            include: {
              milestone: {
                include: {
                  course: true
                }
              }
            }
          }
        }
      })
      instructorId = resource?.module?.milestone?.course?.instructorId
      courseId = resource?.module?.milestone?.courseId ?? ""
    }
    else if (resourceType === 'module') {
      resource = await prisma.module.findUnique({
        where: { id: moduleId },
        include: {
          milestone: {
            include: {
              course: true
            }
          }
        }
      })
      instructorId = resource?.milestone?.course?.instructorId
      courseId = resource?.milestone?.courseId ?? ""
    }
    else if (resourceType === 'comment') {
      const comment = await prisma.comment.findUnique({ where: { id: commentId } })
      if (comment?.userId !== req?.user?.userId) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Unauthorized')
      }
      return next()
    }
    else if (resourceType === 'milestone') {
      resource = await prisma.milestone.findUnique({ where: { id: milestoneId }, include: { course: true } })
      instructorId = resource?.course?.instructorId
      courseId = resource?.courseId ?? ""

    }
    else if (resourceType === 'course') {
      resource = await prisma.course.findUnique({ where: { id: courseId } })
      instructorId = resource?.instructorId
    }

    if (!resource) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
    }


    if (req?.user?.role === 'INSTRUCTOR' && req.user.userId === instructorId) {
      return next()
    }
    if (req?.user?.role === 'STUDENT') {
      const studentId = req.user.userId
      const studentCourse = await prisma.transactions.findFirst({
        where: {
          courseId: courseId,
          studentId: studentId
        }
      })
      if (studentCourse) {
        return next()
      }
    }
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden');

  }
  catch (error) {
    next(error);
  }
}


export default accessValidation;
