import { JwtPayload } from "../../../interfaces/common"
import prisma from "../../../shared/prisma"
const createQuiz = async (user: JwtPayload, payload) => {
    const result = 'hi'
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
