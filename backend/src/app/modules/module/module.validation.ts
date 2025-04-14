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

const updateModuleValidation = z.object({
	body: createModuleValidation.shape.body.shape.module.partial()

})
export const moduleZodSchema = { createModuleValidation, updateModuleValidation }
