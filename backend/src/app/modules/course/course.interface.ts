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


export interface IIncludeTerms {
    instructor: boolean;
    milestones: {
        include: {
            modules: {
                include: {
                    quizes?: {
                        select: {
                            id: boolean,
                        }
                    }
                    videos?: {
                        where: { isDeleted: boolean },
                        select: {
                            id: boolean;
                            moduleId: boolean;
                            title: boolean;
                        }
                    };
                };
            } | boolean;
        };
    } | boolean;
}
