import { JwtPayload } from "../../../interfaces/common";
import prisma from "../../../shared/prisma";
import { ICreateCourse, IMilestones } from "./course.interface";

const createCourse = async (user: JwtPayload, payload: ICreateCourse) => {
    const courseData = {
        title: payload.title,
        description: payload.description,
        price: payload.price,
        thumbnail: payload.thumbnail,
        instructorId: user.userId,
        milestones: {
            create: payload.milestones.map((milestone: IMilestones) => ({
                title: milestone.title,
                description: milestone.description,
                modules: {
                    create: milestone.modules.map(module => ({
                        title: module.title,
                        description: module.description,
                        videos: {
                            create: module.videos.map(video => ({
                                title: video.title,
                                likeCount: 0,
                                dislikeCount: 0,
                                url: video.url,
                                length: video.length,
                            }))
                        },
                        quizes: {
                            create: module.quizes.map(quiz => ({
                                questions: {
                                    create: quiz.questions.map(ques => ({
                                        question: ques.question,
                                        options: ques.options,
                                        answer: ques.answer,
                                        points: ques.points
                                    })),
                                }
                            }))
                        }
                    }))
                }
            }))
        }
    };

    // Create the course with all related data in a single transaction
    const result = await prisma.course.create({
        data: courseData,
        include: {
            milestones: {
                include: {
                    modules: {
                        include: {
                            videos: true,
                            quizes: true
                        }
                    },

                },
            },
            instructor: true

        }
    });

    return result;

}


const getAllCourses = async (payload: any, user: null | JwtPayload) => {
    const items = payload.items

    const includeTerms: any = {
        instructor: payload.items.instructors,
        milestones: items.milestones === true ? {
            include: {
                modules: items.modules === true ? {
                    include: {
                        quizes: items.quizes === true ? {
                            select: {
                                id: true
                            }
                        } : false,
                        videos: items.videos === true ? {
                            where: { isDeleted: false },
                            select: {
                                id: true,
                                moduleId: true,
                                title: true
                            }
                        } : false,
                    },
                } : false,
            },
        } : false,
    }
    let whereTerms = {
        instructorId: payload.filters?.instructorId,
        title: {
            contains: payload.filters?.title,
        }
    }
    let sortBy = [] as any
    if (payload?.sortBy) {
        const sortingEntries = Object.entries(payload.sortBy);
        sortingEntries.map(([key, value]) => (sortBy.push({ [key]: value })))
    }

    const enrollFilter = user && (payload.filters?.enrolled === true ? {
        transactions: {
            some: {
                studentId: {
                    equals: user.userId
                }
            }
        }
    } : {
        transactions: {
            none: {
                studentId: {
                    equals: user.userId
                }
            }
        }
    })
    whereTerms = {
        ...whereTerms,
        ...enrollFilter
    }

    const result = await prisma.course.findMany({
        where: whereTerms,
        include: includeTerms,
        orderBy: sortBy
    })
    return result

}

const getSingleCourse = async (id: string) => {
    const result = await prisma.course.findUnique({
        where: {
            id: id
        },
        include: {
            instructor: {
                select: {
                    id: true,
                    name: true,
                    image: true,
                    designation: true,
                    experience: true,
                    qualification: true,
                    currentWorkingPlace: true,
                }
            },
            milestones: {
                include: {
                    modules: {
                        include: {
                            videos: {
                                where: { isDeleted: false },
                                select: {
                                    id: true,
                                    moduleId: true,
                                    title: true,
                                }
                            },
                            quizes: {
                                select: {
                                    id: true,
                                }
                            }
                        }
                    },

                },
            },
        }
    })
    return result
}

const checkEnrollment = async (courseId: string, user: JwtPayload) => {
    const result = await prisma.transactions.findUnique({
        where: {
            courseId_studentId: {
                courseId: courseId,
                studentId: user.userId
            }
        }
    })
    return {
        isEnrolled: result ? true : false,
        courseId: courseId,
        transactionId: result?.id,
    }
}

export const courseService = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    checkEnrollment
}


