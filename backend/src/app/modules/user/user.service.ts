import { IUploadFile } from '../../../interfaces/file';
import { FileUploadHelper } from '../../../helpers/fileUploadHelper';
import { IAdmin, IInstructor, IStudent } from './user.interface';
import { AuthUtils } from '../../../helpers/bcryptHelpers';
import { UserRole, UserStatus } from '@prisma/client';
import prisma from '../../../shared/prisma';
import { generateOTP } from '../../../helpers/generateDigit';
import { sendEmail } from '../../../helpers/sendEmail';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';


const createAdmin = async (payload: IAdmin, file: IUploadFile) => {

  if (file) {
    const uploadedProfileImage = await FileUploadHelper.uploadToCloudinary(file);
    payload.admin.image = uploadedProfileImage?.secure_url as string;
  }

  const hashPassword = await AuthUtils.hashedPassword(payload.password);
  payload.password = hashPassword

  const userData = {
    email: payload.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE
  }

  const adminData = {
    email: payload.admin.email,
    name: payload.admin.name,
    contactNumber: payload.admin.contactNumber,
    image: payload.admin.image
  }

  const result = await prisma.user.create({
    data: {
      ...userData,
      Admin: {
        create: {
          ...adminData
        }
      }
    },
    select: {
      id: true,
      email: true,
      role: true,
      Admin: {
        select: {
          name: true,
          contactNumber: true,
          image: true
        }
      }
    }
  })

  return result;
};

const createInstructor = async (payload: IInstructor, file: IUploadFile) => {

  if (file) {
    const uploadedProfileImage = await FileUploadHelper.uploadToCloudinary(file);
    payload.instructor.image = uploadedProfileImage?.secure_url as string;
  }

  const hashPassword = await AuthUtils.hashedPassword(payload.password);
  payload.password = hashPassword
  const OTP = generateOTP(6)
  const hashedOTP = await AuthUtils.hashedPassword(String(OTP));


  const verificationToken = jwtHelpers.createToken({
    email: payload.instructor.email,
    role: UserRole.INSTRUCTOR
  }, config.jwt.secret as Secret, config.jwt.passwordResetTokenExpirationTime as string)

  const userData = {
    email: payload.instructor.email,
    password: hashPassword,
    role: UserRole.INSTRUCTOR
  }

  const instructorData = {
    email: payload.instructor.email,
    name: payload.instructor.name,
    contactNumber: payload.instructor.contactNumber,
    experience: payload.instructor.experience,
    gender: payload.instructor.gender,
    qualification: payload.instructor.qualification,
    currentWorkingPlace: payload.instructor.currentWorkingPlace,
    designation: payload.instructor.designation,
    image: payload.instructor.image,
    OTP: hashedOTP
  }

  const result = await prisma.user.create({
    data: {
      ...userData,
      Instructor: {
        create: {
          ...instructorData
        }
      }
    },
    select: {
      id: true,
      email: true,
      role: true,
      Instructor: {
        select: {
          name: true,
          contactNumber: true,
          experience: true,
          gender: true,
          qualification: true,
          currentWorkingPlace: true,
          designation: true,
          image: true
        }
      }
    }
  })

  console.log(result);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Instructor creation failed')
  }
  //WARN: disabled for dev
  //await sendEmail(payload.instructor.email, "Verification OTP", `Your verification OTP is ${OTP}`)

  return {
    data: result,
    otp: OTP,
    token: verificationToken
  };
};
const createStudent = async (payload: IStudent, file: IUploadFile) => {

  if (file) {
    const uploadedProfileImage = await FileUploadHelper.uploadToCloudinary(file);
    payload.student.image = uploadedProfileImage?.secure_url as string;
  }

  const hashPassword = await AuthUtils.hashedPassword(payload.password);
  payload.password = hashPassword
  const OTP = generateOTP(6)
  const hashedOTP = await AuthUtils.hashedPassword(String(OTP));


  const verificationToken = jwtHelpers.createToken({
    email: payload.student.email,
    role: UserRole.STUDENT
  }, config.jwt.secret as Secret, config.jwt.passwordResetTokenExpirationTime as string)

  const userData = {
    email: payload.student.email,
    password: hashPassword,
    role: UserRole.STUDENT
  }

  const studentData = {
    email: payload.student.email,
    name: payload.student.name,
    contactNumber: payload.student.contactNumber,
    currentInstitution: payload.student.currentInstitution,
    gender: payload.student.gender,
    qualification: payload.student.qualification,
    currentWorkingPlace: payload.student.currentWorkingPlace,
    designation: payload.student.designation,
    address: payload.student.address,
    image: payload.student.image,
    OTP: hashedOTP
  }

  const result = await prisma.user.create({
    data: {
      ...userData,
      Student: {
        create: {
          ...studentData
        }
      }
    },
    select: {
      id: true,
      email: true,
      role: true,
      Student: {
        select: {
          name: true,
          contactNumber: true,
          currentInstitution: true,
          gender: true,
          qualification: true,
          address: true,
          image: true
        }
      }
    }
  })

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student creation failed')
  }
  //WARN: disabled for dev
  //await sendEmail(payload.student.email, "Verification OTP", `Your verification OTP is ${OTP}`)

  return {
    data: result,
    otp: OTP,
    token: verificationToken
  };
};

const getAllUser = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      email: true,
      role: true,
      Admin: {
        select: {
          email: true,
          name: true,
          contactNumber: true,
          image: true
        }
      },
      Instructor: {
        select: {
          email: true,
          name: true,
          contactNumber: true,
          experience: true,
          gender: true,
          qualification: true,
          currentWorkingPlace: true,
          designation: true,
          image: true
        }
      },
      Student: {
        select: {
          email: true,
          name: true,
          contactNumber: true,
          currentInstitution: true,
          gender: true,
          qualification: true,
          address: true,
          image: true
        }
      }
    }
  }
  )
}

const verifyUser = async (token: string, otp: number) => {

  const isVerified = jwtHelpers.verifyToken(token, config.jwt.secret as string);

  if (!isVerified) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid token')
  }

  await prisma.user.findUniqueOrThrow({ where: { email: isVerified.email, role: isVerified.role, status: UserStatus.PENDING } })

  let OTP = ''

  if (isVerified.role === UserRole.STUDENT) {
    const student = await prisma.student.findUniqueOrThrow({
      where: {
        email: isVerified.email
      }
    })
    OTP = student.OTP
  } else if (isVerified.role === UserRole.INSTRUCTOR) {
    const instructor = await prisma.instructor.findUniqueOrThrow({
      where: {
        email: isVerified.email
      }

    })
    console.log(instructor);
    OTP = instructor.OTP
  }

  const hashedOTP = await AuthUtils.comparePasswords(otp.toString(), OTP);

  if (!hashedOTP) { throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid OTP') }

  await prisma.user.update({
    where: {
      email: isVerified.email,
      role: isVerified.role,
      status: UserStatus.PENDING
    },
    data: {
      status: UserStatus.ACTIVE
    }
  })

  return {
    message: 'User verified successfully'
  }

}
export const UserServices = {
  createAdmin,
  createInstructor,
  createStudent,
  getAllUser,
  verifyUser
};
