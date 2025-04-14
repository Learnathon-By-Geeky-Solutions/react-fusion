export interface ICreateCourse {
    title: string;
    description: string;
    price: number,
    thumbnail: string,
};

export type IUpdateCourse = Partial<ICreateCourse>

export interface ICreateVideo {
    moduleId: string;
    video: {
        title: string;
        url: string;
        length: number;
    };
}

export interface ICreateQuiz {
    moduleId: string;
    quize: {
        questions: {
            question: string;
            options: string[];
            answer: string;
            points: number;
        }[];
    };
}
