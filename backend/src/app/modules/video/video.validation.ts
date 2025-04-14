import { z } from 'zod';

const createVideoValidation = z.object({
    body: z.object({
        moduleId: z.string(),
        video: z.object({
            title: z.string(),
            url: z.string(),
            length: z.number()
        }),
    })
})

const updateVideoValidation = z.object({
    body: createVideoValidation.shape.body.shape.video.partial()
})

export const videoValidationSchema = { createVideoValidation, updateVideoValidation }
