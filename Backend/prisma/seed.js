// prisma/seed.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Step 1: Create categories
  console.log('📁 Creating service categories...');
  
  const categories = [
    { id: 'cat-monitoring', name: 'Monitoring', slug: 'monitoring' },
    { id: 'cat-technology', name: 'Technology', slug: 'technology' },
    { id: 'cat-analysis', name: 'Analysis', slug: 'analysis' },
    { id: 'cat-logistics', name: 'Logistics', slug: 'logistics' },
    { id: 'cat-surveying', name: 'Surveying', slug: 'surveying' },
  ];

  for (const cat of categories) {
    await prisma.serviceCategory.upsert({
      where: { id: cat.id },
      update: cat,
      create: cat,
    });
    console.log(`✅ Category: ${cat.name}`);
  }

  // Step 2: Create services
  console.log('\n📝 Creating services...');
  
  const services = [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Drone Surveillance',
      description: 'Advanced aerial surveillance for crop monitoring',
      price: 1.0,
      duration: 60,
      type: 'area',
      categoryId: 'cat-monitoring',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440002',
      name: 'IoT Implementation',
      description: 'Smart IoT sensors for agriculture',
      price: 1.0,
      duration: 120,
      type: 'area',
      categoryId: 'cat-technology',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440003',
      name: 'Soil Analysis',
      description: 'Comprehensive soil health assessment',
      price: 1.0,
      duration: 90,
      type: 'area',
      categoryId: 'cat-analysis',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440004',
      name: 'Crop Monitoring',
      description: 'Real-time crop health monitoring',
      price: 1.0,
      duration: 60,
      type: 'area',
      categoryId: 'cat-monitoring',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440005',
      name: 'Logistics Service',
      description: 'Farm-to-market logistics solutions',
      price: 2.0,
      duration: 240,
      type: 'logistics',
      categoryId: 'cat-logistics',
    },
    {
      id: '550e8400-e29b-41d4-a716-446655440006',
      name: 'Digital Surveying',
      description: 'Precision land surveying services',
      price: 1.0,
      duration: 180,
      type: 'area',
      categoryId: 'cat-surveying',
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.id },
      update: service,
      create: service,
    });
    console.log(`✅ Service: ${service.name} (${service.id})`);
  }

  // Step 3: Verify
  console.log('\n📊 Verification...');
  const serviceCount = await prisma.service.count();
  const categoryCount = await prisma.serviceCategory.count();
  
  console.log(`✅ Categories created: ${categoryCount}`);
  console.log(`✅ Services created: ${serviceCount}`);

  console.log('\n🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });