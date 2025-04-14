import { z } from "zod";

const createModuleValidation = z.object({
	body: z.object({
		milestoneId: z.string(),
		module: z.object({
			title: z.string(),
			description: z.string(),
		})
	})

})

export const moduleZodSchema = { createModuleValidation }
