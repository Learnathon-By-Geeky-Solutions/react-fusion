export interface ICreateQuiz {
    moduleId: string,
    questions: ({
        question: string,
        options: string[],
        answer: string,
        points: number
    })[]
}


export interface IUpdateQuiz {
    questions: ({
        question: string,
        options: string[],
        answer: string,
        points: number
    })[]
}
