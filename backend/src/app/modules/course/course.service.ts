import { JwtPayload } from "../../../interfaces/common";
import prisma from "../../../shared/prisma";
import { ICreateCourse, IIncludeTerms, IMilestones } from "./course.interface";

const createCourse = async (user: JwtPayload, payload: ICreateCourse) => {
    console.log('jwt ', user.userId)
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
                                url: video.url
                            }))
                        },
                        quizes: {
                            create: module.quizes.map(quiz => ({
                                question: quiz.question,
                                options: quiz.options,
                                answer: quiz.answer,
                                value: quiz.value
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


const getAllCourses = async (filters: any) => {

    const includeTerms: IIncludeTerms = {
        instructor: false,
        milestones: false,
    };
    if (filters.instructors) {
        includeTerms.instructor = true
    }
    if (filters.milestones) {
        includeTerms.milestones = true
        if (filters.modules) {
            includeTerms.milestones = {
                include: {
                    modules: true
                }
            }
            if (filters.quizes) {
                includeTerms.milestones.include.modules = {
                    include: {
                        quizes: {
                            select: {
                                id: true,
                            }
                        }
                    }
                }
            }
            if (filters.videos) {
                includeTerms.milestones.include.modules = {
                    include: {
                        videos: {
                            where: { isDeleted: false },
                            select: {
                                id: true,
                                moduleId: true,
                                title: true,
                            }
                        }
                    }
                }
            }
            if (filters.videos && filters.quizes) {
                includeTerms.milestones.include.modules = {
                    include: {
                        quizes: {
                            select: {
                                id: true,
                            }
                        },
                        videos: {
                            where: { isDeleted: false },
                            select: {
                                id: true,
                                moduleId: true,
                                title: true,
                            }
                        },


                    }
                }
            }
        }
    }
    const result = await prisma.course.findMany({
        include: includeTerms


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

export const courseService = {
    createCourse,
    getAllCourses,
    getSingleCourse
}


