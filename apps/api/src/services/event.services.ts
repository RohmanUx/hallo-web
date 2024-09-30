import prisma from '../prisma';

export class EventService {
  async findUserById(userId: number) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  async findLocationByName(locName: string) {
    return await prisma.location.findFirst({
      where: {
        locationName: locName,
      },
    });
  }

  async findCategoryByName(catName: string) {
    return await prisma.category.findFirst({
      where: {
        categoryName: catName,
      },
    });
  }

  async createCategory(catName: string) {
    return await prisma.category.create({
      data: {
        categoryName: catName, 
      },
    });
  }

  async createLocation(locName: string) {
    return await prisma.location.create({
      data: {
        locationName: locName,
      },
    });
  }

  async createEvent(data: any) {
    return await prisma.event.create({
      data,
      include: { images: true },
    });
  }
  async findUserEvents(userId: number) {
    return await prisma.event.findMany({
      where: { userId },
      select: {
        title: true,
        description: true,
        price: true,
        images: true,
        startTime: true,
        endTime: true,
        location: { select: { locationName: true } },
        ticketType: true,
        category: { select: { categoryName: true } },
        eventstatistic: {
          select: {
            totalAttendance: true,
            totalRevenue: true,
            totalTicketsSold: true,
          },
        },
        seat: {
          select: {
            availableSeats: true,
            totalSeats: true,
          },
        },
        ticket: {
          select: {
            qty: true,
            transactionDate: true,
            total: true,
          },
        },
      },
    });
  }
}
