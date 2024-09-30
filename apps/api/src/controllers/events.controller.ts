import { Prisma } from '@prisma/client';
import prisma from '../prisma';
import { EventService } from '../services/event.services';
import { NextFunction, Request, Response } from 'express';

export class EventController {
  private eventService: EventService;
  constructor() {
    this.eventService = new EventService();
  }

  // // get event from admin
  // async getUserEvent(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     if (!res.locals.decrypt.id) {
  //       return res.status(404).send({
  //         success: false,
  //         message: 'not find token',
  //       });
  //     }

  //     return res.status(200).send({
  //       success: true,
  //       massage: 'there is read event',
  //     });
  //   } catch (error) {
  //     console.log(res.locals.decrypt.d);
  //     next({ success: false, message: ' event found' });
  //   }
  // }

  // untuk tampilan eventId di halaman home
  async getAllEvents(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { eventId } = req.params;
      // const { userId } = res.locals.decrypt.id;
      const offset = (page - 1) * limit;
      //       const whereCondition: Prisma.eventWhereInput | undefined =
      // role === 'ADMIN' ? undefined : { userId };
      const control = await prisma.event.findUnique({
        where: {
          id: Number(eventId),
          // userId:userId,
        },
      });
      const events = await prisma.event.findFirst({
        skip: offset,
        take: limit,
        //  where: whereCondition,
        select: {
          id: true,
          title: true,
          description: true,
          startTime: true,
          endTime: true,
          statusEvent: true,
          price: true,
          totalSeats: true,
          isDeleted: true,
          images: {
            select: {
              path: true,
            },
          },
          category: {
            select: {
              categoryName: true,
            },
          },
          location: {
            select: {
              locationName: true,
            },
          },
        },
      });
      console.log(events, 'hallo hai');
      const totalEvents = await prisma.event.count({
        // where: whereCondition,
      });

      return res.status(200).send({
        success: true,
        message: 'Events successfully',
        data: events,
        pagination: {
          total: totalEvents,
          page,
          limit,
          totalPages: Math.ceil(totalEvents / limit),
        },
      });
    } catch (error) {
      console.log(error);
      next({
        error,
      });
    }
  }

  // melihat event berdasarkan milik admin (userId)
  async getEventByAdmin(req: Request, res: Response, next: NextFunction) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 8;
      const offset = (page - 1) * limit;

      const userId = parseInt(res.locals.decrypt.id); // Assuming the event ID is passed as a route parameter
      if (isNaN(userId)) {
        return res.status(400).send({
          success: false,
          message: 'Invalid event ID',
        });
      }

      const event = await prisma.event.findMany({
        skip: offset,
        take: limit,

        where: {
          userId: userId, // Use event ID for the query
          isDeleted: false, // Optional: only fetch non-deleted events tanpa ini error
        },
        select: {
          id: true,
          title: true,
          userId: true,
          description: true,
          startTime: true,
          endTime: true,
          statusEvent: true,
          price: true,
          totalSeats: true,
          ticketType: true,
          images: {
            select: {
              path: true,
            },
          },
          category: {
            select: {
              categoryName: true,
            },
          },
          location: {
            select: {
              locationName: true,
            },
          },
        },
      });
      const totalEvents = await prisma.event.count({
        where: {
          userId: userId,
        },
      });

      // Check if the event was found
      if (!event) {
        return res.status(404).send({
          success: false,
          message: 'Event not found',
        });
      }
      return res.status(200).send({
        success: true,
        message: 'Events successfully',
        data: event,
        pagination: {
          total: totalEvents,
          page,
          limit,
          totalPages: Math.ceil(totalEvents / limit),
        },
      });
    } catch (error) {
      console.error(error);
      return next({
        status: 500,
        message: 'An error occurred while retrieving the event',
        // Provide the error message for debugging
      });
    }
  }

  // userId
  async getEvent(req: Request, res: Response, next: NextFunction) {
    try {
      //  const userId = parseInt(res.locals.decrypt.id); // Assuming the event ID is passed as a route parameter
      const { eventId } = req.params;
      if (!eventId) {
        return res.status(400).send({
          success: false,
          message: 'event ID error',
        });
      }

      const connect = await prisma.event.findUnique({
        where: {
          id: Number(eventId),
          //    userId: userId,
        },
      });
      const event = await prisma.event.findFirst({
        select: {
          id: true,
          title: true,
          userId: true,
          description: true,
          startTime: true,
          endTime: true,
          statusEvent: true,
          price: true,
          totalSeats: true,
          ticketType: true,
          images: {
            select: {
              path: true,
            },
          },
          category: {
            select: {
              categoryName: true,
            },
          },
          location: {
            select: {
              locationName: true,
            },
          },
        },
      });

      // Check if the event was found
      if (!event) {
        return res.status(404).send({
          success: false,
          message: 'Event not found',
        });
      }

      // Return the event data
      return res.status(200).send({
        success: true,
        message: 'Event retrieved successfully',
        data: event,
      });
    } catch (error) {
      console.error(error);
      return next({
        status: 500,
        message: 'An error occurred while retrieving the event',
        // Provide the error message for debugging
      });
    }
  }
  async addEvent (req: Request, res: Response, next: NextFunction) {
    try {
      const {
        title,
        description,
        category,
        price,
        totalSeats,
        location,
        ticketType,
        startTime,
        endTime,
      } = req.body;

      if (
        !title ||
        !description ||
        !category ||
        !price ||
        !location ||
        !ticketType ||
        !startTime ||
        !endTime ||
        !totalSeats
      ) {
        return res
          .status(400)
          .send({ success: false, message: 'Missing required fields' });
      }

      // Check user existence
      const user = await this.eventService.findUserById(res.locals.decrypt.id);
      if (!user) {
        return res
          .status(404)
          .send({ success: false, message: 'User not found' });
      }

      // handle file uploads
      const files = req.files as Express.Multer.File[];
      const imagePaths = files
        ? files.map((file) => `/assets/product/${file.filename}`)
        : [];

      // Check its create
      let categoryData = await this.eventService.findCategoryByName(category);
      let locationData = await this.eventService.findLocationByName(location);

      if (!categoryData) {
        categoryData = await this.eventService.createCategory(category);
      }

      if (!locationData) {
        locationData = await this.eventService.createLocation(location);
      }

      // to create event
      const eventPrice = ticketType === 'PAID' ? Number(price) : 0;

      // Create event list should there is
      const newEvent = await prisma.event.create({
        data: {
          title,
          description,
          totalSeats: Number(totalSeats),
          price: eventPrice,
          ticketType,
          startTime: new Date(startTime),
          endTime: new Date(endTime),
          userId: user.id,
          categoryId: categoryData.id,
          locationId: locationData.id,
          images: { create: imagePaths.map((path) => ({ path })) },
          isDeleted: false,
        },
        include: { images: true },
      });

      console.log('Event created successfully', newEvent);
      return res.status(201).send({ success: true, result: newEvent });
    } catch (error) {
      console.log(error);
      next({ success: false, message: 'Failed to add event', error });
    }
  }

  async updateEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const { eventId } = req.params;
      const {
        title,
        description,
        category,
        totalSeats,
        price,
        location,
        ticketType,
        startTime,
        endTime,
      } = req.body;

      const findUser = await prisma.user.findUnique({
        where: {
          id: res.locals.decrypt.id,
        },
      });

      if (title) {
        console.log('succest title found');
      }
      if (findUser) {
        console.log('succest user found');
      }

      if (!findUser) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
        });
      }

      const findUserEvent = await prisma.event.findFirst({
        where: {
          id: Number(eventId),
          userId: findUser.id,
        },
      });

      const findEventCategory = await prisma.category.findFirst({
        where: {
          id: findUserEvent?.categoryId,
        },
      });

      const findEventLocation = await prisma.location.findFirst({
        where: {
          id: findUserEvent?.locationId,
        },
      });

      if (!findUserEvent) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
        });
      }

      // Handle file uploads
      const files = req.files as Express.Multer.File[];
      const imagePath =
        files?.map((file) => `/assets/product/${file.filename}`) || [];

      // Update the event
      const updateEvent = await prisma.event.update({
        data: {
          price: price ? Number(price) : findUserEvent.price,
          title: title ? title : findUserEvent.title,
          startTime: startTime
            ? new Date(startTime).toISOString()
            : findUserEvent.startTime,
          endTime: endTime
            ? new Date(endTime).toISOString()
            : findUserEvent.endTime,
          ticketType: ticketType ? ticketType : findUserEvent.ticketType,
          description: description ? description : findUserEvent.description,
          location: {
            update: {
              locationName: location
                ? location
                : findEventLocation?.locationName,
            },
          },
          category: {
            update: {
              categoryName: category
                ? category
                : findEventCategory?.categoryName,
            },
          },
          images: {
            create: imagePath.length
              ? imagePath.map((path) => ({ path }))
              : undefined,
          },
        },
        where: {
          id: findUserEvent.id,
        },
        include: {
          images: true,
        },
      });
      if (updateEvent) {
        console.log('succest hallo');
      }

      return res.status(200).send({
        success: true,
        message: 'Event updated successfull',
      });
    } catch (error) {
      next({
        success: false,
        message: 'Cannot update event',
        error,
      });
    }
  }

  // Delete event controller
  async deleteEvent(req: Request, res: Response) {
    try {
      const { eventId } = req.params;
      const { userId } = res.locals.decrypt.id;
      // First, find the event by its ID
      const event = await prisma.event.findFirst({
        where: {
          id: parseInt(eventId),
          userId: userId,
        },
      });

      if (!event) {
        return res.status(404).json({
          message: 'Event not found',
        });
      }

      // Soft delete the event if it's not deleted yet
      if (!event.isDeleted) {
        await prisma.event.update({
          where: { id: parseInt(eventId) },
          data: { isDeleted: true },
        });
        return res.status(200).json({
          message: 'Event soft deleted successfully',
        });
      }

      // If the event is already soft deleted, handle hard deletion
      if (event.isDeleted) {
        try {
          await prisma.event.delete({
            where: { id: parseInt(eventId) },
          });
          await prisma.image.deleteMany({
            where: { eventId: parseInt(eventId) },
          });

          return res.status(200).json({
            message: 'Event hard deleted successfully',
          });
        } catch (error) {
          console.error('Error during hard delete:', error);
          return res.status(500).json({
            message:
              'Failed to hard delete event due to foreign key constraints',
          });
        }
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      return res.status(500).json({
        message: 'An error occurred while deleting the event',
      });
    }
  }
}
