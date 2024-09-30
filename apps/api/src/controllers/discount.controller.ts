import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../prisma';

export class DiscountController {
  async createDiscount(req: Request, res: Response) {
    const { code, amount, validFrom, validTo, limit, codeStatus } = req.body;

    try {
      const newDiscount = await prisma.discountcode.create({
        data: {
          code,
          amount,
          validFrom: new Date(validFrom),
          validTo: new Date(validTo),
          limit,
          codeStatus,
        },
      });

      res.send(newDiscount);
    } catch (error) {
      res.status(500).send({ message: 'Failed create discount code.', error });
    }
  }

  async readDiscount(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const discount = await prisma.discountcode.findUnique({
        where: { id: parseInt(id, 10) },
      });

      if (!discount) {
        return res.status(404).send({ message: 'Discount not found.' });
      }

      res.send(discount);
    } catch (error) {
      res.status(500).send({ message: 'Failed discount code.', error });
    }
  }

  async updateDiscount(req: Request, res: Response) {
    const { id } = req.params;
    const { code, amount, validFrom, validTo, limit, codeStatus } = req.body;

    try {
      const discount = await prisma.discountcode.update({
        where: { id: parseInt(id, 10) },
        data: {
          code,
          amount,
          validFrom: new Date(validFrom),
          validTo: new Date(validTo),
          limit,
          codeStatus,
        },
      });

      res.send(discount);
    } catch (error) {
      res.status(500).send({ message: 'Failed update discount code.', error });
    }
  }

  async deleteDiscount(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.discountcode.delete({
        where: { id: parseInt(id, 10) },
      });
      // mencari & hapus . entri = 10  decimal di prisama
      res.send({ message: 'Discount code deleted successfully.' });
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Failed to delete discount code.', error });
    }
  }
}
