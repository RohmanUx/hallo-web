import { Request, Response, NextFunction } from "express";
import prisma from "../prisma"; // Adjust this path as necessary based on your project structure

export class LocationsController {
  async get(req: Request, res: Response, next: NextFunction) {
    try {
      const locations = await prisma.location.findMany({
        select: {
          locationName: true,
          id: true,
          event: {
            select: {
              categoryId: true,
              id: true,
              title: true,
              location: { 
                select: { 
                  id: true, 
                  locationName: true,
                }
              },  
              category: {
                select: { 
                  id: true, 
                  categoryName: true
                }
              }, 
              images: {
                select: {
                  id: true,
                  path: true,
                  eventId: true,
                },
              },
              description: true,
              totalSeats: true,
              price: true, 
              ticketType: true, 
              startTime: true,
              endTime: true,
              isDeleted: true,
            },
          },
        },
      });

      // Send the retrieved locations with status 200
      res.status(200).json(locations); 
    } catch (error) {
      console.error('Error fetching locations:', error);
      // Send a 500 response if an error occurs
      res.status(500).json({ error: 'Error fetching locations' });
      // Optionally, pass the error to the next middleware
      next(error);
    }
  }
}
