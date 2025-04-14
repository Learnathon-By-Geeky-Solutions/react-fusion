import { truncate } from "fs";
import prisma from "../../../shared/prisma";
import { ICreateModule, IUpdateModule } from "./module.interface";

const createModule = async (payload: ICreateModule) => {
	const result = await prisma.module.create({
		data: {
			milestoneId: payload.milestoneId,
			...payload.module
		}
	})
	return result
}


const updateModule = async (moduleId: string, payload: IUpdateModule) => {
	const result = await prisma.module.update({
		where: {
			id: moduleId
		},
		data: payload
	})
	return result
}


const deleteModule = async (moduleId: string) => {
	const result = await prisma.module.delete({
		where: {
			id: moduleId
		}
	})
	return result
}


const getModule = async (moduleId: string) => {
	const result = await prisma.module.findUnique({
		where: {
			id: moduleId
		},
		include: {
			videos: {
				select: {
					id: true,
				}
			},
			quizes: true
		}
	})
	return result
}



export const moduleService = { createModule, updateModule, deleteModule, getModule }
