import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import {
    IChangePassword,
    ILoginUser,
    ILoginUserResponse,
    IRefreshTokenResponse,
} from './auth.interface';
import prisma from '../../../shared/prisma';
import { UserStatus } from '@prisma/client';
import { AuthUtils } from '../../../helpers/bcryptHelpers';
import { sendEmail } from '../../../helpers/sendEmail';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
    const { email, password } = payload;

    const isUserExist = await prisma.user.findUnique({
        where: {
            email,
            status: UserStatus.ACTIVE
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    if (
        isUserExist.password &&
        !(await AuthUtils.comparePasswords(password, isUserExist.password))
    ) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
    }

    const { id: userId, role } = isUserExist;
    const accessToken = jwtHelpers.createToken(
        { userId, role, email },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    const refreshToken = jwtHelpers.createToken(
        { userId, role },
        config.jwt.refresh_secret as Secret,
        config.jwt.refresh_expires_in as string
    );

    return {
        accessToken,
        refreshToken
    };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
    //verify token
    // invalid token - synchronous
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers.verifyToken(
            token,
            config.jwt.refresh_secret as Secret
        );
    } catch (err) {
        console.error('Error verifying token: ', err);
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
    }

    const { userId } = verifiedToken;

    const isUserExist = await prisma.user.findUnique({
        where: {
            id: userId,
            status: UserStatus.ACTIVE
        }
    });
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    const newAccessToken = jwtHelpers.createToken(
        {
            userId: isUserExist.id,
            role: isUserExist.role,
        },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken: newAccessToken,
    };
};

const changePassword = async (
    user: JwtPayload | null,
    payload: IChangePassword
): Promise<void> => {
    const { oldPassword, newPassword } = payload;

    const isUserExist = await prisma.user.findUnique({
        where: {
            id: user?.userId,
            status: UserStatus.ACTIVE
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
    }

    // checking old password
    if (
        isUserExist.password &&
        !(await AuthUtils.comparePasswords(oldPassword, isUserExist.password))
    ) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect');
    }

    const hashPassword = await AuthUtils.hashedPassword(newPassword);

    await prisma.user.update({
        where: {
            id: isUserExist.id
        },
        data: {
            password: hashPassword
        }
    })
};

const forgotPass = async (email: string) => {

    const isUserExist = await prisma.user.findUnique({
        where: {
            email,
            status: UserStatus.ACTIVE
        }
    });

    if (!isUserExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist!")
    }

    const passResetToken = jwtHelpers.createToken({ id: isUserExist.id }, config.jwt.refresh_secret as Secret,
        config.jwt.passwordResetTokenExpirationTime as string);

    const resetLink: string = config.reset_link + `?id=${isUserExist.id}&token=${passResetToken}`

    await sendEmail(email, "Password Reset", `
      <div>
        <p>Dear ${isUserExist.role},</p>
        <p>Your password reset link: <a href=${resetLink}><button>RESET PASSWORD<button/></a></p>
        <p>Thank you</p>
      </div>
  `);
}

const resetPassword = async (payload: { id: string, newPassword: string }, token: string) => {

    const isUserExist = await prisma.user.findUnique({
        where: {
            id: payload.id,
            status: UserStatus.ACTIVE
        }
    })


    if (!isUserExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, "User not found!")
    }

    const isVerified = jwtHelpers.verifyToken(token, config.jwt.refresh_secret as string);




    if (!isVerified) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Something went wrong!")
    }

    const password = await bcrypt.hash(payload.newPassword, Number(config.bcrypt_salt_rounds));

    await prisma.user.update({
        where: {
            id: payload.id
        },
        data: {
            password
        }
    })
}

export const authService = {
    loginUser,
    refreshToken,
    changePassword,
    forgotPass,
    resetPassword
};
