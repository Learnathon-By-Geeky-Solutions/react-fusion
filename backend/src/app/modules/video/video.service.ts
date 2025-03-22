import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const getVideo = async (user: JwtPayload, videoId: string) => {
    const video = await prisma.video.findUnique({
        where: {
            id: videoId
        },
        include: {
            module: {
                include: {
                    milestone: true
                }
            },
            notes: true,
            comments: true
        }


    })
    const courseId = video?.module.milestone.courseId
    const transaction = await prisma.transactions.findFirst({
        where: {
            AND: [
                {
                    courseId: {
                        equals: courseId
                    },
                    studentId: {
                        equals: user.uesrId
                    }
                }
            ]
        }
    })
    if (transaction === null) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Course Not Purchased!');
    }
    return video
}

export const videoService = { getVideo }
