import prisma from "../../../shared/prisma";
import { ICreateModule, IUpdateModule } from "./module.interface";

const createModule = async (payload: ICreateModule) => {
	const result = await prisma.$transaction(async (tx) => {
		const prevOrder = await tx.module.aggregate({
			where: {
				milestoneId: payload.milestoneId
			},
			_max: {
				order: true
			}
		})
		const nextOrder = (prevOrder._max.order ?? 0) + 1

		const createdModule = await tx.module.create({
			data: {
				milestoneId: payload.milestoneId,
				...payload.module,
				order: nextOrder
			}
		})
		return createdModule
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
			moduleItems: {
				include: {
					video: {
						select: {
							id: true,
						}
					},
					quiz: true
				},
			}
		}
	})
	return result
}


export const moduleService = { createModule, updateModule, deleteModule, getModule }
