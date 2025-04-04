import { JwtPayload } from "../../../interfaces/common";
import prisma from "../../../shared/prisma";
import { ICreateCourse, IIncludeTerms, IMilestones } from "./course.interface";

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


const getAllCourses = async (payload: any) => {
    const items = payload.items
    const includeTerms: IIncludeTerms = {
        instructor: false,
        milestones: false,
    };
    if (items.instructors) {
        includeTerms.instructor = true
    }
    if (items.milestones) {
        includeTerms.milestones = true
        if (items.modules) {
            includeTerms.milestones = {
                include: {
                    modules: true
                }
            }
            if (items.quizes) {
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
            if (items.videos) {
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
            if (items.videos && items.quizes) {
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
    const whereTerms = {
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

export const courseService = {
    createCourse,
    getAllCourses,
    getSingleCourse
}


