import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../prisma';

export class PointBalanceController {
  async updateBalance(req: Request, res: Response) {
    const { userId } = req.params;
    const { balance, points } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: parseInt(userId, 10) },
        data: { balance, points },
      });

      res.send(updatedUser);
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Failed to update balance or points.', error });
    }
  }

  async createBalance(req: Request, res: Response) {
    // const { userId } = req.params;
    const { points, balance } = req.body;
    const userId = res.locals.decrypt.id;
    if (!userId || isNaN(parseInt(userId, 10))) {
      return res.status(400).send({ message: 'Invalid or missing userId.' });
    }
    try {
      // First, check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { id: parseInt(userId, 10) },
      });

      if (existingUser) {
        // Update the existing user's balance
        const updatedUser = await prisma.user.update({
          where: { id: parseInt(userId, 10) },
          data: {
            balance: existingUser.balance + (balance || 0), // Update balance
            points: (existingUser.points || 0) + (points || 0), // Update points
          },
        });

        res.status(200).send(updatedUser);
      } else {
        res.status(500).send('fix it again');
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Failed to create or update user balance.', error });
    }
  }
  async getBalance(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId, 10) },
        select: { balance: true, points: true },
      });

      if (!user) {
        return res.status(404).send({ message: 'User not found.' });
      }

      res.send(user);
    } catch (error) {
      res.status(500).send({ message: 'Failed balance and points.', error });
    }
  }
}
