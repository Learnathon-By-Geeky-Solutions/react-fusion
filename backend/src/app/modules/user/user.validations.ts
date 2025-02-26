import { z } from "zod";
import { Gender, QualificationLevel } from "@prisma/client";


const AdminZodSchema = z.object({
  body: z.object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    admin: z.object({
      email: z.string().email("Invalid email format"),
      name: z.string().min(2, "Name must be at least 2 characters long"),
      contactNumber: z.string().min(10, "Invalid contact number"),
    }),
  })
});


const InstructorZodSchema = z.object({
  body: z.object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    instructor: z.object({
      email: z.string().email("Invalid email format"),
      name: z.string().min(2, "Name must be at least 2 characters long"),
      contactNumber: z.string().min(10, "Invalid contact number"),
      experience: z.number().min(0, "Experience must be a positive number"),
      gender: z.enum([Gender.MALE, Gender.FEMALE]),
      qualification: z.enum([QualificationLevel.BACHELORS, QualificationLevel.MASTERS, QualificationLevel.PHD, QualificationLevel.HIGH_SCHOOL]),
      currentWorkingPlace: z.string().min(2, "Current working place must be valid"),
      designation: z.string().min(2, "Designation must be valid"),
    }),
  })
});


const StudentZodSchema = z.object({
  body: z.object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    student: z.object({
      email: z.string().email("Invalid email format"),
      name: z.string().min(2, "Name must be at least 2 characters long"),
      contactNumber: z.string().min(10, "Invalid contact number"),
      currentInstitution: z.string().min(2, "Current institution must be valid"),
      gender: z.enum([Gender.MALE, Gender.FEMALE]),
      qualification: z.enum([QualificationLevel.BACHELORS, QualificationLevel.MASTERS, QualificationLevel.PHD, QualificationLevel.HIGH_SCHOOL]),
      address: z.string().min(5, "Address must be valid"),
    }),
  })
});

const verifyUserZodSchema = z.object({
  body: z.object({
    otp: z.number(),
  }),
});


export const UserValidation = {
  AdminZodSchema,
  InstructorZodSchema,
  StudentZodSchema,
  verifyUserZodSchema
}
