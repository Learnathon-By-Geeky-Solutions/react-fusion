import { JwtPayload } from "../../../interfaces/common"
import prisma from "../../../shared/prisma"
import { ICheckQuiz, ICreateQuiz, IUpdateQuiz } from "./quiz.interface"
const createQuiz = async (payload: ICreateQuiz) => {
    const orderNo = await prisma.moduleItem.aggregate({
        where: {
            moduleId: payload.moduleId
        },
        _max: {
            order: true
        }
    })
    let nextOrder = 1
    if (orderNo._max.order) {
        nextOrder += orderNo._max.order
    }
    const result = await prisma.quiz.create({
        data: {
            moduleItem: {
                create: {
                    moduleId: payload.moduleId,
                    order: nextOrder
                }
            },
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

const updateQuiz = async (quizId: string, payload: IUpdateQuiz) => {
    const result = await prisma.$transaction(async (prisma) => {
        await prisma.question.deleteMany({
            where: {
                quizId: quizId
            }
        })

        const updatedQuiz = await prisma.quiz.update({
            where: { id: quizId },
            data: {
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
        return updatedQuiz
    })
    return result
}

const deleteQuiz = async (quizId: string) => {
    const result = await prisma.$transaction(async (prisma) => {
        await prisma.question.deleteMany({
            where: {
                quizId: quizId
            }
        })
        const deletedQuiz = await prisma.quiz.delete({
            where: {
                id: quizId
            }
        })

        return deletedQuiz
    })
    return result
}


const checkQuiz = async (quizId: string, payload: ICheckQuiz) => {
    const quiz = await prisma.quiz.findUnique({
        where: { id: quizId },
        include: { questions: true }
    })
    let marks = 0
    payload.answers.forEach((item, index) => {
        const quesstion = quiz?.questions.find((ques) => ques.id === item.id)
        if (quesstion?.answer === item.answer) {
            marks += quesstion.points
        }
    })

    const result = { marks: marks, quiz: quiz }
    return result
}

export const quizService = { createQuiz, getQuiz, updateQuiz, deleteQuiz, checkQuiz }
