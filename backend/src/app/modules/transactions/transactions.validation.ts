import { z } from 'zod'

const buyCourseSchema = z.object({
    body: z.object({
        courseId: z.string(),
        txnId: z.string()
    })
})

export const transactionValidationSchema = { buyCourseSchema }
