export interface ICreateCourse {
    title: string;
    description: string;
    price: number,
    thumbnail: string,
    isPublished?: boolean;
};

export type IUpdateCourse = Partial<ICreateCourse>


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
