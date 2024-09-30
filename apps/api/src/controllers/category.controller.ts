import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../prisma';

export class CategoryController {
  // Create Category
  async createCategory(req: Request, res: Response) {
    try {
      const { categoryName } = req.body;

      // ke database
      const newCategory = await prisma.category.create({
        data: {
          categoryName, 
                  },
      });

      res.status(201).send(newCategory);
    } catch (error) {
      console.log('Error buat kategori', error);
      res.status(500).send({ error: 'Error creating category' });
    }
  }

  async getCategories(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany({
        select: {
          categoryName: true,
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
 
            res.status(200).send(categories);
    } catch (error) {
      // Log and send error response
      console.log('Error events by category:', error);
      res.status(500).send({ error: `Error events` });
    }
  }

  // Get by id

  async getCategoryById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await prisma.category.findUnique({
        where: { id: Number(id) },
        include: {
          event: true,
        },
      });
      if (!category) {
        return res.status(404).send({ error: 'Category not found' });
      }
      res.status(200).send(category);
    } catch (error) {
      res.status(500).send({ error: 'Error retrieving category' });
    }
  }

  // Update Category
  async updateCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { categoryName } = req.body;
      const updatedCategory = await prisma.category.update({
        where: { id: Number(id) },
        data: { categoryName },
      });
      res.status(200).send(updatedCategory);
    } catch (error) {
      res.status(500).send({ error: 'Error updating category' });
    }
  }
   
  // Delete Category
  async deleteCategory(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.category.delete({
        where: { id: Number(id) },
      });
      res.status(204).send(); // No content to send back
    } catch (error) {
      res.status(500).send({ error: 'Error deleting category' });
    }
  }
}
