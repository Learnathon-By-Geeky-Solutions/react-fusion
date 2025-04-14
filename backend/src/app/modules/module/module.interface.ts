export interface ICreateModule {
	milestoneId: string;
	module: IModule
}

export interface IModule {
	title: string;
	description: string;
}

export type IUpdateModule = Partial<IModule>
