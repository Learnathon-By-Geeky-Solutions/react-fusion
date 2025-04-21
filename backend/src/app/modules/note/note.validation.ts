import { z } from 'zod'

const noteCreateSchema = z.object({
    body: z.object({
        videoId: z.string(),
        note: z.string()
    })
})


export const noteValidataionSchema = { noteCreateSchema }
