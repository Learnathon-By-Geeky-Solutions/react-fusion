export interface IVideoUpdate {
	videoId: string,
	isCompleted: boolean,
	timeWatched: number

}

export interface IQuizUpdate {
	quizId: string,
	isCompleted: boolean,
	score: number
}


export interface IModuleUpdate {
	moduleId: string,
	isCompleted: boolean,
}


export interface IMilestoneUpdate {
	milestoneId: string,
	isCompleted: boolean,
}
