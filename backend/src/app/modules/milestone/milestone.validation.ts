import { z } from "zod";

const createMilestoneValidation = z.object({
	body: z.object({
		courseId: z.string(),
		milestone: z.object({
			title: z.string(),
			description: z.string(),
		})
	})
})

const updateMilestoneValidation = z.object({
	body: createMilestoneValidation.shape.body.shape.milestone.partial()
})

export const milestoneZodSchema = { createMilestoneValidation, updateMilestoneValidation }
