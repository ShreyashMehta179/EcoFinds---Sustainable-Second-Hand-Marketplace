import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ✅ default export
import { getCurrentUser } from "@/lib/auth-server";

// Helper function to get the user's cart with items
async function getUserCart(userId: string) {
  return prisma.cart.findFirst({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            include: {
              owner: {
                select: {
                  id: true,
                  username: true,
                },
              },
              category: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const cart = await getUserCart(user.id);

    return NextResponse.json(cart || { items: [] });
  } catch (error) {
    console.error("❌ Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
