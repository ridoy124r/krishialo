// services/serviceService.js
import prisma from '../config/db.js';
import fs from 'fs';
import path from 'path';

/**
 * List all services with category info
 */
export const listServices = async () => {
  return await prisma.service.findMany({
    include: { category: true },
    orderBy: { createdAt: 'desc' },
  });
};

/**
 * Get a single service by ID
 */
export const getService = async (id) => {
  return await prisma.service.findUnique({
    where: { id },
    include: { category: true },
  });
};

/**
 * Create a new service (Category is optional)
 */
export const createService = async (data) => {
  const { name, description, type, duration, price, categoryId, image } = data;
  
  return await prisma.service.create({
    data: {
      name,
      description,
      type,
      duration: Number(duration),
      price: Number(price),
      image,
      
      // Conditional connection for optional category
      ...(categoryId && {
        category: {
          connect: {
            id: categoryId, 
          },
        },
      }),
    },
  });
};

/**
 * Update a service (Category is optional)
 */
export const updateService = async (id, data) => {
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) throw new Error('Service not found');

  // If a new image uploaded, delete old image
  if (data.image && service.image) {
    const oldImagePath = path.join('uploads', service.image);
    if (fs.existsSync(oldImagePath)) {
      try {
        fs.unlinkSync(oldImagePath);
      } catch (e) {
        console.error(`Failed to delete old image ${oldImagePath}:`, e);
      }
    }
  }

  // Separate categoryId from the data object to handle it separately
  const { categoryId, ...updateData } = data;
  
  const updatePayload = {
    ...updateData,
    duration: data.duration !== undefined ? Number(data.duration) : undefined,
    price: data.price !== undefined ? Number(data.price) : undefined,
  };
  
  // Handle category update/removal
  if (categoryId) {
    // Connect to a new category
    updatePayload.category = { connect: { id: categoryId } };
  } else if (categoryId === null) {
    // Disconnect the category if explicitly set to null/empty string from controller
    updatePayload.category = { disconnect: true };
    // We explicitly need to set categoryId to null for update, 
    // even though the relation handles it.
    updatePayload.categoryId = null; 
  }

  return await prisma.service.update({
    where: { id },
    data: updatePayload,
  });
};

/**
 * Delete a service 
 */
export const deleteService = async (id) => {
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) throw new Error('Service not found');

  // Delete image if exists
  if (service.image) {
    const imagePath = path.join('uploads', service.image);
    if (fs.existsSync(imagePath)) {
      try {
        fs.unlinkSync(imagePath);
      } catch (e) {
        console.error(`Failed to delete service image ${imagePath}:`, e);
      }
    }
  }

  return await prisma.service.delete({ where: { id } });
};