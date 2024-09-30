import { sign } from 'jsonwebtoken';

export const createToken = (data: any, expiresIn: string) => {
  return sign(data, process.env.TOKEN_KEY || 'secretKey', {
    expiresIn: expiresIn || '1h',
  });
 } ;     
