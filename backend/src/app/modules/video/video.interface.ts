export interface IVideo {
    title: string;
    url: string;
    length: number;
}

export interface ICreateVideo {
    moduleId: string;
    video: IVideo
}

export type IUpdateVideo = Partial<IVideo>
