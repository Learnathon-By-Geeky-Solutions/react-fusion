import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import prisma from '../../shared/prisma';


const accessValidation = (resourceType: string) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const quizId = req.params.quizId || req.body.quizId || null;
    const videoId = req.params.videoId || req.body.videoId || null;
    console.log('quiz ', quizId)
    console.log('vid ', videoId)
    console.log(req.user, resourceType)
    let resource = null
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
    }
    if (!resource) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
    }

    const instructorId = resource?.module?.milestone?.course?.instructorId
    const courseId = resource?.module?.milestone?.courseId
    if (req?.user?.role === 'INSTRUCTOR' && req.user.id === instructorId) {
      return next()
    }
    if (req?.user?.role === 'STUDENT') {
      const studentId = req.user.id
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
