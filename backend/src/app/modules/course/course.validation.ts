import { z } from "zod";

const createCourseValidation = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        thumbnail: z.string(),
        milestones: z.array(z.object({
            title: z.string(),
            description: z.string(),
            modules: z.array(z.object({
                title: z.string(),
                description: z.string(),
                videos: z.array(z.object({
                    title: z.string(),
                    url: z.string(),
                    length: z.number()
                })),
                quizes: z.array(z.object({
                    questions: z.array(z.object({
                        question: z.string(),
                        options: z.array(z.string()),
                        answer: z.string(),
                        points: z.number()

                    })),
                }))

            }))
        }))
    })
})

const getCourseValidataion = z.object({
    body: z.object({
        items: z.object({
            instructors: z.boolean(),
            milestones: z.boolean(),
            modules: z.boolean(),
            quizes: z.boolean(),
            videos: z.boolean()
        }),
        filters: z.object({
            instructorId: z.string().optional(),
            title: z.string().optional(),
            category: z.string().optional(),
        }).optional(),
        sortBy: z.object({
            price: z.enum(['asc', 'desc']).optional(),
            rating: z.enum(['asc', 'desc']).optional(),
        }).optional()
    })
})

export const courseZodSchema = {
    createCourseValidation,
    getCourseValidataion
};

