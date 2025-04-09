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
