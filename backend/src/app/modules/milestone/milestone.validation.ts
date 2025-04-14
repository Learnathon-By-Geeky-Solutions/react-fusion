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

export const milestoneZodSchema = { createMilestoneValidation }
