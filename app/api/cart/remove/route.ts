import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ✅ use prisma.ts singleton
import { getCurrentUser } from "@/lib/auth-server";

interface RequestBody {
  productId: string;
}

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const { productId }: RequestBody = await req.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // ✅ Find user's cart with matching item
    const cart = await prisma.cart.findFirst({
      where: { userId: user.id },
      include: {
        items: {
          where: { productId },
          select: { id: true },
        },
      },
    });

    if (!cart) {
      return NextResponse.json(
        { error: "Cart not found" },
        { status: 404 }
      );
    }

    if (cart.items.length === 0) {
      return NextResponse.json(
        { error: "Item not found in cart" },
        { status: 404 }
      );
    }

    // ✅ Remove the item from cart
    await prisma.cartItem.deleteMany({
      where: {
        cartId: cart.id,
        productId,
      },
    });

    // ✅ Get updated cart with populated items
    const updatedCart = await prisma.cart.findUnique({
      where: { id: cart.id },
      include: {
        items: {
          include: {
            product: {
              include: {
                owner: {
                  select: { id: true, username: true },
                },
                category: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      cart: updatedCart,
    });
  } catch (error) {
    console.error("❌ Error removing from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove item from cart" },
      { status: 500 }
    );
  }
}
