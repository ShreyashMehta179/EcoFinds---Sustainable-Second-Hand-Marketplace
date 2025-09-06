import { PrismaClient } from "@prisma/client";

// Extend the PrismaClient type to include our models
type ExtendedPrismaClient = PrismaClient & {
  cart: any;
  cartItem: any;
};

declare global {
  // eslint-disable-next-line no-var
  var prisma: ExtendedPrismaClient | undefined;
}

const prisma: ExtendedPrismaClient =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  }) as ExtendedPrismaClient;

// Add the cart and cartItem properties
prisma.cart = prisma.cart || ({} as any);
prisma.cartItem = prisma.cartItem || ({} as any);

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export default prisma;
