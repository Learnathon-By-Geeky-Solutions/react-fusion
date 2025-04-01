import { z } from 'zod'

const getCommentsSchema = z.object({
    body: z.object({
        videoId: z.string()
    })


})

const createCommentsSchema = z.object({
    body: z.object({
        videoId: z.string(),
        comment: z.string()
    })
})


const updateCommentsSchema = z.object({
    body: z.object({
        commentId: z.string(),
        comment: z.string()
    })
})

export const commentValidationSchema = { getCommentsSchema, createCommentsSchema, updateCommentsSchema }
