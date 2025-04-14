export interface ICreateMilestone {
	courseId: string;
	milestone: IMilestone;
}
export interface IMilestone {
	title: string;
	description: string;
}

export type IUpdateMilestone = Partial<IMilestone>;
