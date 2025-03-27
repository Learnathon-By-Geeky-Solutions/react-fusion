import { z } from 'zod'

const quizCreateSchema = z.object({
    body: z.object({
        moduleId: z.string(),
        questions: z.array(z.object({
            question: z.string(),
            options: z.array(z.string()),
            answer: z.string(),
            points: z.number()

        }))
    })
})

export const quizValidationSchema = { quizCreateSchema }
