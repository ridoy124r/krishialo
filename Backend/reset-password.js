// reset-password.js
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const newPassword = process.argv[3];

  if (!email || !newPassword) {
    console.log('Usage: node reset-password.js user@example.com newPassword');
    process.exit(1);
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  const user = await prisma.user.update({
    where: { email },
    data: { password: hashed }
  });

  console.log('Password updated for', user.email);
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
