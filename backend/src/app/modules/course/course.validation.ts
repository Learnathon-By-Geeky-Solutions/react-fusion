import { z } from "zod";

const createCourseValidation = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(),
        thumbnail: z.string(),
    })
})

const updateCourseValidation = z.object({
    body: createCourseValidation.shape.body.partial()
})

const getCourseValidataion = z.object({
    body: z.object({
        items: z.object({
            instructors: z.boolean(),
            milestones: z.boolean(),
            modules: z.boolean(),
            moduleItems: z.boolean()
        }),
        filters: z.object({
            instructorId: z.string().optional(),
            title: z.string().optional(),
            category: z.string().optional(),
            enrolled: z.boolean().optional(),
        }).optional(),
        sortBy: z.object({
            price: z.enum(['asc', 'desc']).optional(),
            rating: z.enum(['asc', 'desc']).optional(),
        }).optional()
    })
})

const createQuizValidation = z.object({
    body: z.object({
        moduleId: z.string(),
        quize: z.object({
            questions: z.array(z.object({
                question: z.string(),
                options: z.array(z.string()),
                answer: z.string(),
                points: z.number()

            }))
        })
    })
})


export const courseZodSchema = {
    createCourseValidation,
    updateCourseValidation,
    getCourseValidataion,
    createQuizValidation
};
