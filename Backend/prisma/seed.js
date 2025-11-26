// simple seeder to create an admin and a sample service
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = 'admin@example.com';
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existing) {
    const hashed = await bcrypt.hash('password123', 10);
    await prisma.user.create({
      data: {
        fullName: 'Admin User',
        email: adminEmail,
        password: hashed,
        isAdmin: true
      }
    });
    console.log('Seeded admin user:', adminEmail);
  } else {
    console.log('Admin exists, skipping.');
  }

  const svc = await prisma.service.findFirst({ where: { name: 'Standard Consultation' }});
  if (!svc) {
    await prisma.service.create({
      data: {
        name: 'Standard Consultation',
        type: 'consultation',
        duration: 30,
        price: 29.99
      }
    });
    console.log('Seeded service: Standard Consultation');
  } else {
    console.log('Service exists, skipping.');
  }
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
