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
            }[];
            quizes: {
                question: string;
                options: string[];
                answer: string;
                value: number;
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
        }[];
        quizes: {
            question: string;
            options: string[];
            answer: string;
            value: number;
        }[];
    }[];
};


export interface IIncludeTerms {
    instructor: boolean;
    milestones: {
        include: {
            modules: {
                include: {
                    quizes?: boolean;
                    videos?: boolean;
                };
            } | boolean;
        };
    } | boolean;
}
