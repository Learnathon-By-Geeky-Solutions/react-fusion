import { z } from "zod";

const createCourseValidation = z.object({
    body: z.object({
        title: z.string(),
        description: z.string(),
        instructors: z.array(z.string()),
        milestones: z.array(z.object({
            title: z.string(),
            description: z.string(),
            modules: z.array(z.object({
                title: z.string(),
                description: z.string(),
                videos: z.array(z.object({
                    title: z.string(),
                    url: z.string(),
                })),
                quizes: z.array(z.object({
                    question: z.string(),
                    options: z.array(z.string()),
                    answer: z.string(),
                    value: z.number()
                }))

            }))
        }))
    })
})

const getCourseValidataion = z.object({

    body: z.object({
        filters: z.object({
            instructors: z.boolean(),
            milestones: z.boolean(),
            modules: z.boolean(),
            quizes: z.boolean(),
            videos: z.boolean()
        })
    })

})

export const courseZodSchema = {
    createCourseValidation,
    getCourseValidataion
};


/*
{
    "title": "Introduction to Programming",
    "description": "A beginner-friendly course to learn programming.",
    "instructors": [
        "bf7d961f-30fe-46a8-9821-33654de41921"
    ],
    "milestones": [
        {
            "title": "Milestone 1: Basics of Programming",
            "description": "Understanding the fundamentals of programming.",
            "modules": [
                {
                    "title": "Module 1: Introduction to Variables",
                    "description": "Learn about variables and data types.",
                    "videos": [
                        {
                            "title": "What is a Variable?",
                            "url": "https://example.com/what-is-a-variable"
                        },
                        {
                            "title": "Data Types in Programming",
                            "url": "https://example.com/data-types"
                        }
                    ],
                    "quizes": [
                        {
                            "question": "What is a variable in programming?",
                            "options": [
                                "A container for data",
                                "A type of function",
                                "A kind of loop",
                                "None of the above"
                            ],
                            "answer": "A container for data",
                            "value": 10
                        },
                        {
                            "question": "Which of these is a primitive data type?",
                            "options": [
                                "String",
                                "Array",
                                "Object",
                                "Function"
                            ],
                            "answer": "String",
                            "value": 10
                        }
                    ]
                },
                {
                    "title": "Module 2: Conditional Statements",
                    "description": "Learn about conditional statements like if-else.",
                    "videos": [
                        {
                            "title": "If-Else Statements",
                            "url": "https://example.com/if-else"
                        }
                    ],
                    "quizes": [
                        {
                            "question": "Which of these is used for conditional branching?",
                            "options": [
                                "If-else",
                                "Loop",
                                "Function",
                                "Variable"
                            ],
                            "answer": "If-else",
                            "value": 15
                        }
                    ]
                }
            ]
        },
        {
            "title": "Milestone 2: Advanced Programming Concepts",
            "description": "Dive deeper into more advanced programming topics.",
            "modules": [
                {
                    "title": "Module 1: Object-Oriented Programming",
                    "description": "Learn about classes and objects in programming.",
                    "videos": [
                        {
                            "title": "Introduction to OOP",
                            "url": "https://example.com/oop-introduction"
                        }
                    ],
                    "quizes": [
                        {
                            "question": "What is a class in programming?",
                            "options": [
                                "A blueprint for objects",
                                "A type of function",
                                "A data structure",
                                "None of the above"
                            ],
                            "answer": "A blueprint for objects",
                            "value": 20
                        }
                    ]
                }
            ]
        }
    ]
}
*/
