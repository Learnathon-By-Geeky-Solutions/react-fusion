import { PrismaClient } from '@prisma/client';

// Create a new Prisma Client instance for testing
const prisma = new PrismaClient();

// Global setup
beforeAll(async () => {
  // Add any global setup here
});

// Global teardown
afterAll(async () => {
  await prisma.$disconnect();
});

// Clean up after each test
afterEach(async () => {
  // Add any cleanup needed after each test
}); 