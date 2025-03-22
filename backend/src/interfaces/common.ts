import { IGenericErrorMessage } from './error';
import { UserRole } from '@prisma/client';

export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export interface JwtPayload {
  userId: string;
  role: UserRole;
  iat: number;
  exp: number;
}

