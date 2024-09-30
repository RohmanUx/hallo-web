import { Request, Response } from 'express';
import prisma from '../prisma';

export class TestimonialController {

  // // Middleware to check if the user is allowed to create a testimonial
  // private async canCreateTestimonial(userId: number, eventId: number): Promise<boolean> {
  //   // Check if the user has purchased the event
  //   const purchase = await prisma.ticket.findFirst({
  //     where: {
  //       userId: userId,
  //       eventId: eventId,
  //     },
  //   });

  //   if (!purchase) {
  //     return false;
  //   }

  //   // Check if the event is closed
  //   const event = await prisma.event.findUnique({
  //     where: { id: eventId },
  //   });

  //   if (!event || new Date() <= new Date(event.endTime)) {
  //     return false;
  //   }

  //   return true;
  // }

  // Create a testimonial
  async createTestimonial(req: Request, res: Response) {
    const { userId, eventId, reviewDescription, rating } = req.body;

    try { 
  
      // // Check if the user can create a testimonial
      // const canCreate = await this.canCreateTestimonial(Number(userId), Number(eventId));
      
      // if (!canCreate) {
      //   return res.status(403).json({ message: 'You are not allowed to create a testimonial for this event.' });
      // }

      const testimonial = await prisma.testimonial.create({
        data: {
          userId: Number(userId),
          eventId: Number(eventId),
          reviewDescription,
          rating: Number(rating),
        },
      });
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(500).json({ message: 'Error creating testimonial', error });
    }
  }

  // Read testimonials for a specific event
  async readTestimonial (req: Request, res: Response) {
    const { eventId } = req.params;

    try {
      const testimonials = await prisma.testimonial.findMany({
        where: { eventId: Number(eventId) },
      });
      res.status(200).json(testimonials);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching testimonials', error });
    }
  }

  // Update a testimonial
  async updateTestimonial(req: Request, res: Response) {
    const { id } = req.params;
    const { reviewDescription, rating } = req.body;

    try {
      const testimonial = await prisma.testimonial.update({
        where: { id: Number(id) },
        data: { reviewDescription, rating: Number(rating) },
      });
      res.status(200).json(testimonial);
    } catch (error) {
      res.status(500).json({ message: 'Error updating testimonial', error });
    }
  }

  // Delete a testimonial
  async deleteTestimonial(req: Request, res: Response) {
    const { id } = req.params;

    try {
      await prisma.testimonial.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting testimonial', error });
    }
  }
} 
//  example post 
// {
//   "userId": 1,
//   "eventId": 2,
//   "reviewDescription": "The event was amazing, well-organized, and very informative!",
//   "rating": 5
// }

// example writte json.body to output from field form json.body 
// have effect if event closed status and done buy user can comment because is before done buy event 
// around comment user can Crud card event if user needed 
// dont forget .json change .send to term code standar 



