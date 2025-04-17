import prisma from "../../../shared/prisma";
import { ICreateMilestone, IUpdateMilestone } from "./milestone.interface";

const createMilestone = async (payload: ICreateMilestone) => {
	const result = await prisma.milestone.create({
		data: {
			courseId: payload.courseId,
			...payload.milestone
		},
	})
	return result
}


const updateMilestone = async (milestoneId: string, payload: IUpdateMilestone) => {
	const result = await prisma.milestone.update({
		where: {
			id: milestoneId
		},
		data: {
			...payload
		},
	})
	return result
}


const deleteMilestone = async (milestoneId: string) => {
	const result = await prisma.milestone.delete({
		where: {
			id: milestoneId
		}
	})
	return result
}


const getMilestone = async (milestoneId: string) => {
	const result = await prisma.milestone.findUnique({
		where: {
			id: milestoneId
		}
	})
	return result
}


export const milestoneService = { createMilestone, updateMilestone, deleteMilestone, getMilestone }
