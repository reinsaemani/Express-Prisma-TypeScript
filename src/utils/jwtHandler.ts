import jwt, { SignOptions } from 'jsonwebtoken';

export type TPayload = { id: number };

export const generateToken = (
  payload: TPayload,
  expiresIn: SignOptions['expiresIn']  // ⬅️ langsung ambil dari SignOptions
): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });
};


export const verifyToken = (token: string): TPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TPayload;
};
