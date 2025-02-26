import * as jwt from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: jwt.Secret,
  expireTime: any
): string => {
  const options: jwt.SignOptions = {
    algorithm: 'HS256',
    expiresIn: expireTime,
  };

  return jwt.sign(payload, secret, options);
};



const verifyToken = (token: string, secret: jwt.Secret): jwt.JwtPayload => {
  return jwt.verify(token, secret) as jwt.JwtPayload;
};

export const jwtHelpers = {
  createToken,
  verifyToken
};
