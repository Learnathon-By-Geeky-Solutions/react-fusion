import { z } from 'zod'

const noteGetSchema = z.object({
    body: z.object({
        videoId: z.string(),
    })
})
const noteCreateSchema = z.object({
    body: z.object({
        videoId: z.string(),
        note: z.string()
    })
})



export const noteValidataionSchema = { noteGetSchema, noteCreateSchema }
