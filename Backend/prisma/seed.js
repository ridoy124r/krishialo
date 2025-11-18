import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.service.createMany({
    data: [
      { name: 'Smart Home Monitoring', type: 'SMART', duration: 30, priceCents: 5000, currency: 'usd' },
      { name: 'IoT Device Management', type: 'IOT', duration: 365, priceCents: 12000, currency: 'usd' }
    ],
    skipDuplicates: true
  });
  console.log('Seeded services');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());