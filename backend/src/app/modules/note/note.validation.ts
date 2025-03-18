import { z } from 'zod'

const noteGetSchema = z.object({
    body: z.object({
        videoId: z.string(),
        userId: z.string(),
    })
})
const noteCreateSchema = z.object({
    body: z.object({
        videoId: z.string(),
        userId: z.string(),
        note: z.string()
    })
})



export const noteValidataionSchema = { noteGetSchema, noteCreateSchema }
