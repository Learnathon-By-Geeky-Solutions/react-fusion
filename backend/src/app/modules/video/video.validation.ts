import { z } from 'zod';

const videoValidation = z.object({
    body: z.object({
        title: z.string().nonempty(),
        url: z.string().nonempty(),
    })
})


export const videoValidationSchema = { videoValidation }
