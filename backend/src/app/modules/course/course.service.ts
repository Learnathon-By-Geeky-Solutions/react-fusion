import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { JwtPayload } from "../../../interfaces/common";
import prisma from "../../../shared/prisma";
import { ICreateCourse, IUpdateCourse } from "./course.interface";
import { courseController } from "./course.controller";

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

    let whereTerms: any = {
        instructorId: payload.filters?.instructorId,
        title: {
            search: payload.filters?.title
        },
        isDeleted: false,
        isPublished: true
    }

    if (process.env.NODE_ENV === 'development') {
        delete whereTerms.isPublished
    }
    let sortBy = [
        {
            title: "asc"
        }
    ] as any
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


const continueCourse = async (user: JwtPayload, courseId: string) => {
    const course = await prisma.course.findUnique({
        where: {
            id: courseId,
        },
        include: {
            milestones: {
                include: {
                    modules: {
                        include: {
                            moduleItems: {
                                include: {
                                    video: true,
                                    quiz: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    const progress = await prisma.courseProgress.findUnique({
        where: {
            studentId_courseId: {
                courseId: courseId,
                studentId: user.userId
            }
        }
    })

    let result: any = course

    let lastMilestone = await prisma.milestone.findFirst({
        where: {
            courseId: courseId,
            MilestoneProgress: {
                some: {
                    courseProgressId: progress?.id ?? "",
                    isCompleted: false
                }
            }
        },
        orderBy: { order: 'asc' }
    })

    if (!lastMilestone) {
        lastMilestone = await prisma.milestone.findFirst({
            where: {
                courseId,
                MilestoneProgress: {
                    none: {
                        courseProgressId: progress?.id
                    },
                },
            },
            orderBy: { order: 'asc' },
        });
    }

    const lastMilestoneId = lastMilestone?.id

    let module = await prisma.module.findFirst({
        where: {
            milestoneId: lastMilestoneId,
            ModuleProgress: {
                some: {
                    courseProgressId: progress?.id,
                    isCompleted: false,
                },
            },
        },
        orderBy: {
            order: 'asc',
        },
    });

    if (!module) {
        module = await prisma.module.findFirst({
            where: {
                milestoneId: lastMilestoneId,
                ModuleProgress: {
                    none: {
                        courseProgressId: progress?.id,
                    },
                },
            },
            orderBy: {
                order: 'asc',
            },
        });
    }

    const lastModuleId = module?.id

    let moduleItem = await prisma.moduleItem.findFirst({
        where: {
            moduleId: lastModuleId,
            Progress: {
                some: {
                    courseProgressId: progress?.id,
                    isCompleted: false,
                },
            },
        },
        orderBy: {
            order: 'asc',
        },
    });

    if (!moduleItem) {
        moduleItem = await prisma.moduleItem.findFirst({
            where: {
                moduleId: lastModuleId,
                Progress: {
                    none: {
                        courseProgressId: progress?.id,
                    },
                },
            },
            orderBy: {
                order: 'asc',
            },
        });
    }

    const lastModuleItemId = moduleItem?.id

    result.progress = {
        nextMilestone: lastMilestoneId ?? null,
        nextModule: lastModuleId ?? null,
        nextModuleItem: lastModuleItemId ?? null
    }

    return result




}
export const courseService = {
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourses,
    getSingleCourse,
    checkEnrollment,
    continueCourse
}


