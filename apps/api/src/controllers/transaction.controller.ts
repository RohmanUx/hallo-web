import { Request, Response } from 'express';
import prisma from '../prisma';

export class TransactionController {
  async createTransaction(req: Request, res: Response) {
    const { userId, eventId, qty, discountCode } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId, 10) },
      });
      const event = await prisma.event.findUnique({
        where: { id: parseInt(eventId, 10) },
      });
      const discount = discountCode
        ? await prisma.discountcode.findFirst({ where: { code: discountCode } })
        : null;

      if (!user || !event) {
        return res.status(404).send({ message: 'User or event not found.' });
      }

      // Check if there enough seats available
      if (event.totalSeats < qty) {
        return res.status(400).send({ message: 'Not enough seats available.' });
      }

      let totalPrice = event.price * qty;

      if (discount) {
        totalPrice -= discount.amount;
      }

      // Check balance only if the user role is 'USER'
      if (user.role === 'USER') {
        if (user.balance! < totalPrice) {
          return res.status(400).send({ message: 'Insufficient balance.' });
        }
      }

      // Update user balance
      await prisma.user.update({
        where: { id: parseInt(userId, 10) },
        data: { balance: user.balance - totalPrice },
      });

      // Update the number of available seats for the event
      await prisma.event.update({
        where: { id: parseInt(eventId, 10) },
        data: { totalSeats: event.totalSeats - qty },
      });

      // Create the transaction
      const transaction = await prisma.ticket.create({
        data: {
          userId: parseInt(userId, 10),
          eventId: parseInt(eventId, 10),
          qty,
          total: totalPrice,
          status: 'PAID',
        },
      });

      res.send(transaction);
    } catch (error) {
      res
        .status(500)
        .send({ message: 'Failed to process transaction.', error });
    }
  }

  async readTransaction(req: Request, res: Response) {
    const userId = res.locals.decrypt.id;

    try {
      // Fetch the user's transaction records
      const transactions = await prisma.ticket.findMany({
        where: {
          userId: parseInt(userId, 10),
        },
        select: {
          id: true,
          userId: true,
          qty: true,
          eventId: true,
          total: true,
          status: true,
          transactionDate: true,
        },
      });

      // Return the transactions if found
      return res.status(200).send({
        data: transactions,
      });
    } catch (error) {
      // Handle any errors during the query
      return res.status(500).send({
        message: 'Error checking purchase status.',
        error,
      });
    }
  }
  async updateTransaction(req: Request, res: Response) {
    const { id } = req.params;
    const { qty, discountCode, transactionDate } = req.body;

    try {
      const transaction = await prisma.ticket.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (!transaction) {
        return res.status(404).send({ message: 'Transaction not found.' });
      }

      const event = await prisma.event.findUnique({
        where: { id: transaction.eventId },
      });
      const discount = discountCode
        ? await prisma.discountcode.findFirst({ where: { code: discountCode } })
        : null;

      let totalPrice = event!.price * qty;

      if (discount) {
        totalPrice -= discount.amount;
      }
      const transactionChange = new Date(); // Set to the current date

      const updatedTransaction = await prisma.ticket.update({
        where: { id: parseInt(id, 10) },
        data: { qty, total: totalPrice, transactionDate, },
      });

      res.send(updatedTransaction);
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  async deleteTransaction(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.ticket.delete({
        where: { id: parseInt(id, 10) },
      });

      res.send({ message: 'Transaction deleted successfully.' });
    } catch (error) {
      res.status(500).send({ message: 'Failed to delete transaction.', error });
    }
  }
}
