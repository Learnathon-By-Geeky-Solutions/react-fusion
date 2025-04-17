import { z } from 'zod'
const videoUpdateSchema = z.object({
	body: z.object({
		videoId: z.string(),
		isCompleted: z.boolean(),
		timeWatched: z.number().nonnegative()
	})
})


const quizUpdateSchema = z.object({
	body: z.object({
		quizId: z.string(),
		isCompleted: z.boolean(),
		score: z.number()
	})
})

const moduleUpdateSchema = z.object({
	body: z.object({
		moduleId: z.string(),
		isCompleted: z.boolean(),
	})
})


const milestoneUpdateSchema = z.object({
	body: z.object({
		milestoneId: z.string(),
		isCompleted: z.boolean(),
	})
})

const courseUpdateSchema = z.object({
	body: z.object({
		courseId: z.string(),
		isCompleted: z.boolean(),
		progress: z.number().nonnegative()
	})
})
export const progressValidationSchema = { videoUpdateSchema, quizUpdateSchema, moduleUpdateSchema, milestoneUpdateSchema, courseUpdateSchema }
