import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { JwtPayload } from "../../../interfaces/common";
import prisma from "../../../shared/prisma";
import { ICreateCourse, IUpdateCourse } from "./course.interface";

const createCourse = async (user: JwtPayload, payload: ICreateCourse) => {
    const result = await prisma.course.create({
        data: {
            instructorId: user.userId,
            title: payload.title,
            description: payload.description,
            thumbnail: payload.thumbnail,
            price: payload.price
        }
    });
    return result;
}

const updateCourse = async (courseId: string, payload: IUpdateCourse) => {
    const result = await prisma.course.update({
        where: {
            id: courseId,
        },
        data: {
            ...payload
        }
    })
    return result;
}

const deleteCourse = async (courseId: string) => {
    const result = await prisma.course.update({
        where: {
            id: courseId,
        },
        data: {
            isDeleted: true,
            isPublished: false
        }
    })
    return result;
}


const getAllCourses = async (payload: any, user: null | JwtPayload) => {
    const items = payload.items

    const includeTerms: any = {
        instructor: payload.items.instructors,
        milestones: items.milestones === true ? {
            orderBy: { order: 'asc' },
            include: {
                modules: items.modules === true ? {
                    orderBy: { order: 'asc' },
                    include: {
                        moduleItems: items.moduleItems === true ? {
                            orderBy: { order: 'asc' },
                            include: {
                                video: {
                                    where: { isDeleted: false },
                                    select: {
                                        id: true,
                                        title: true,
                                    }
                                },
                                quiz: {
                                    select: {
                                        id: true,
                                    }
                                }
                            }

                        } : false
                    },
                } : false,
            },
        } : false,
    }

    let whereTerms = {
        instructorId: payload.filters?.instructorId,
        title: {
            contains: payload.filters?.title,
        },
        isDeleted: false,
        isPublished: (process.env.NODE_ENV !== 'development')
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
                    userId: true,
                    name: true,
                    image: true,
                    designation: true,
                    experience: true,
                    qualification: true,
                    currentWorkingPlace: true,
                }
            },
            milestones: {
                orderBy: { order: 'asc' },
                include: {
                    modules: {
                        orderBy: { order: 'asc' },
                        include: {
                            moduleItems: {
                                orderBy: { order: 'asc' },
                                include: {
                                    video: {
                                        select: {
                                            id: true,
                                            title: true,
                                        }
                                    },
                                    quiz: {
                                        select: {
                                            id: true,
                                        }
                                    }
                                }
                            }
                        }
                    },

                },
            },
        }
    })

    if (!result || result?.isDeleted) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
    }
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
    updateCourse,
    deleteCourse,
    getAllCourses,
    getSingleCourse,
    checkEnrollment,
}


