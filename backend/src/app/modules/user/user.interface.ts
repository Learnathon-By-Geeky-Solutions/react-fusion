import { Gender, QualificationLevel } from "@prisma/client"

export interface IAdmin {
    password: string;
    admin: {
        email: string;
        name: string;
        contactNumber: string;
        image: string;
    }
}
export interface IInstructor {
    password: string;
    instructor: {
        email: string;
        name: string;
        contactNumber: string;
        experience: number;
        gender: Gender;
        qualification: QualificationLevel;
        currentWorkingPlace: string;
        designation: string;
        image: string;
    }
}

export interface IStudent {
    password: string;
    student: {
        email: string;
        name: string;
        contactNumber: string;
        currentInstitution: string;
        gender: Gender;
        qualification: QualificationLevel;
        currentWorkingPlace: string;
        designation: string;
        address: string;
        image: string;
    }
}