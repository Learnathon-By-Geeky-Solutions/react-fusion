import { JwtPayload } from "../../../interfaces/common"
import prisma from "../../../shared/prisma"
import { ICreateQuiz } from "./quiz.interface"
const createQuiz = async (payload: ICreateQuiz) => {
    const result = await prisma.quiz.create({
        data: {
            moduleId: payload.moduleId,
            questions: {
                create: payload.questions.map((ques) => ({
                    question: ques.question,
                    options: ques.options,
                    answer: ques.answer,
                    points: ques.points

                }))
            }
        }
    })
    return result

}

const getQuiz = async (user: JwtPayload, quizId: string) => {
    const result = await prisma.quiz.findUnique({
        where: { id: quizId },
        include: {
            questions: {
                select: {
                    id: true,
                    question: true,
                    options: true,
                    points: true
                }
            }
        }
    })
    return result
}

const updateQuiz = async (user: JwtPayload, payload) => {
    const result = 'hi'
    return result
}

const deleteQuiz = async (user: JwtPayload, payload) => {
    const result = 'hi'
    return result
}

export const quizService = { createQuiz, getQuiz, updateQuiz, deleteQuiz }
