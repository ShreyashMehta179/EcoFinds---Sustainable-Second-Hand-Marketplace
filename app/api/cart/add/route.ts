import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ✅ use prisma singleton
import { getCurrentUser } from "@/lib/auth-server";

interface RequestBody {
  productId: string;
  quantity?: number;
}

export async function POST(req: Request) {
  try {
    // ✅ Ensure user is authenticated
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    // ✅ Parse request body
    const { productId, quantity = 1 }: RequestBody = await req.json();

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    // ✅ Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // ✅ Find or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: user.id },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: { userId: user.id },
      });
    }

    // ✅ Add or update cart item
    const item = await prisma.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: {
        quantity: { increment: quantity },
      },
      create: {
        cartId: cart.id,
        productId,
        quantity,
      },
      include: {
        product: true, // return product details with the item
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}
