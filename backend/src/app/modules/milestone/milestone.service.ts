import prisma from "../../../shared/prisma";
import { JwtPayload } from "../../../interfaces/common";
import { ICreateMilestone } from "./milestone.interface";

const createMilestone = async (payload: ICreateMilestone) => {
	const result = 'hi'
	return result
}


export const milestoneService = { createMilestone }
