import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import { MIDTRANS_SERVER_KEY } from 'src/config';

const prisma = new PrismaClient();

export class MidtransController {
  // Post method to handle Midtrans payments and save transaction details
  async post(req: Request, res: Response, next: NextFunction) {
    const { order_id, gross_amount } = req.body;

    try {
      // Make a request to Midtrans API
      const midtransResponse = await axios.post(
        'https://api.sandbox.midtrans.com/v2/charge',
        {
          payment_type: 'bank_transfer', // Change this if needed
          transaction_details: {
            order_id,
            gross_amount,
          },
          bank_transfer: {
            bank: 'bca', // Specify bank (e.g., 'bni', 'permata')
          },
          customer_details: {
            first_name: 'John',
            last_name: 'Doe',
            email: 'john.doe@example.com',
            phone: '08123456789',
          },
        },
        {
            headers: {
                'Content-Type': 'application/json',
                // Correct usage of Buffer.from for Base64 encoding
                Authorization: `Basic ${Buffer.from(MIDTRANS_SERVER_KEY, 'utf-8').toString('base64')}`,
              },        }
      );

      // Extract data from the Midtrans response
      const paymentData = midtransResponse.data;

      // Save the payment transaction details to the database using Prisma
      const payment = await prisma.payment.create({
        data: {
          orderId: paymentData.transaction_id,
          grossAmount: paymentData.gross_amount,
          paymentType: paymentData.payment_type,
          bank: paymentData.va_numbers ? paymentData.va_numbers[0].bank : 'unknown',
          status: paymentData.transaction_status,
        },
      });

      // Respond with the saved payment details
      res.status(200).json(payment);
    } catch (error) {
      console.error('Payment failed:', error);
      res.status(500).json({ error: 'Payment failed' });
    }
  }
}
