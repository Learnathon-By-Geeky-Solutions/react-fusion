export interface ICreateCourse {
    title: string;
    description: string;
    price: number,
    thumbnail: string,
    milestones: {
        title: string;
        description: string;
        modules: {
            title: string;
            description: string;
            videos: {
                title: string;
                url: string;
                length: number;
            }[];
            quizes: {
                questions: {
                    question: string;
                    options: string[];
                    answer: string;
                    points: number;
                }[]
            }[];
        }[];
    }[];
};


export interface IMilestones {

    title: string;
    description: string;
    modules: {
        title: string;
        description: string;
        videos: {
            title: string;
            url: string;
            length: number;
        }[];

        quizes: {
            questions: {
                question: string;
                options: string[];
                answer: string;
                points: number;
            }[]
        }[];
    }[];
};


export interface ICreateMilestone {
    courseId: string;
    milestone: {
        title: string;
        description: string;
    };
}

export interface ICreateModule {
    milestoneId: string;
    module: {
        title: string;
        description: string;
    };
}

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
