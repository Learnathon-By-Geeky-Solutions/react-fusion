import { Prisma } from "@prisma/client";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { JwtPayload } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { asyncForEach } from "../../../shared/utils";
import { ICreateCourse, IIncludeTerms, IMilestones } from "./course.interface";

//TODO: change paylod type
const createCourse = async (payload: ICreateCourse) => {
    const courseData = {
        title: payload.title,
        description: payload.description,
        instructors: {
            connect: payload.instructors.map((x: string) => ({
                id: x
            })),
        },
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
            instructors: true
        }
    });

    return result;

}


const getAllCourses = async (filters: any) => {

    const includeTerms: IIncludeTerms = {
        instructors: false,
        milestones: false,
    };
    if (filters.instructors) {
        includeTerms.instructors = true
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
                        quizes: true
                    }
                }
            }
            if (filters.videos) {
                includeTerms.milestones.include.modules = {
                    include: {
                        videos: true
                    }
                }
            }
            if (filters.videos && filters.quizes) {
                includeTerms.milestones.include.modules = {
                    include: {
                        quizes: true,
                        videos: true
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
            instructors: true
        }

    })
    return result
}

export const courseService = {
    createCourse,
    getAllCourses,
    getSingleCourse
}


