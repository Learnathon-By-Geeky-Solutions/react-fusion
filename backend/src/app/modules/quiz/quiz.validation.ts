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


const quizUpdateSchema = z.object({
    body: z.object({
        questions: z.array(z.object({
            question: z.string(),
            options: z.array(z.string()),
            answer: z.string(),
            points: z.number()

        }))
    })
})

const quizCheckingSchema = z.object({
    body: z.object({
        answers: z.array(z.object({
            id: z.string(),
            answer: z.string()
        }))
    })
})
export const quizValidationSchema = { quizCreateSchema, quizUpdateSchema, quizCheckingSchema }
