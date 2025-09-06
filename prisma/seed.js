const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Clear existing data (optional, be careful in production!)
  if (process.env.NODE_ENV !== 'production') {
    await prisma.product.deleteMany({});
    await prisma.user.deleteMany({});
    await prisma.category.deleteMany({});
  }

  const categories = [
    "Clothing & Fashion",
    "Furniture & Home Decor",
    "Electronics & Gadgets",
    "Books & Stationery",
    "Kids & Baby Products",
    "Sports & Outdoor Gear",
    "Household Essentials",
    "Eco-Friendly Special Products"
  ];

  // Create categories
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

  // Create or get demo user
  const demoUser = await prisma.user.upsert({
    where: { email: "demo@ecofinds.com" },
    update: {},
    create: {
      email: "demo@ecofinds.com",
      password: "hashed-demo-password", // In production, use bcrypt
      username: "demoUser"
    }
  });

  // Create demo product if it doesn't exist
  const existingProduct = await prisma.product.findFirst({
    where: {
      title: "Pre-loved Ethnic Kurta",
      ownerId: demoUser.id
    }
  });

  if (!existingProduct) {
    await prisma.product.create({
      data: {
        title: "Pre-loved Ethnic Kurta",
        description: "Good condition, size M",
        price: 499,
        imageUrl: "/images/kurta.jpg",
        category: { connect: { name: "Clothing & Fashion" } },
        owner: { connect: { id: demoUser.id } }
      }
    });
  }

  console.log("✅ Database seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
