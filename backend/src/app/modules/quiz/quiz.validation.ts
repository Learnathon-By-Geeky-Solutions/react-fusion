import { z } from 'zod'

const quizCreateSchema = z.object({
    body: z.object({
        moduleId: z.string(),
        question: z.string(),
        options: z.array(z.string()),
        answer: z.string(),
        value: z.number()
    })
})

export const quizValidationSchema = { quizCreateSchema }
