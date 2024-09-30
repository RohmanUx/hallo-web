import prisma from '../prisma';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      throw {
        rc: 404,
        message: 'Token not exist',
      };
    }

    // const blacklisttoken = await prisma.blacklistToken.findFirst({
    //   where: {
    //     token: token,
    //   },
    // });

    // if (blacklisttoken) {
    //   return res.status(401).send({
    //     success: false,
    //     message: 'Token has been blacklisted',
    //   });
    // }

    const checkToken = verify(token, process.env.TOKEN_KEY || 'secretKey');
    res.locals.decrypt = checkToken;
    next();
  } catch (error) {
    next({ success: false, message: 'cannot verify your token', error });
  }
};
