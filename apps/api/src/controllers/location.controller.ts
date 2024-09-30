import { Request, Response, NextFunction } from "express";
import prisma from "src/prisma";

export class LocationController { 
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
                select:{ 
                  id: true, 
                  categoryName:true
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
      
      res.status(200).send(locations); // Correctly sending the "locations" variable
    } catch (error) {
      // Log and send error response
      console.log('Error fetching locations:', error);
      res.status(500).send({ error: 'Error fetching locations' });
    }
  }
}
