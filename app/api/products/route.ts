// app/api/products/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// POST add new product
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, category, description, condition, image, seller, location, userId } = body;

    if (!name || !price || !category) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // First, ensure the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true }
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: Number(price),
        category,
        description: description || "",
        condition: condition || "good",
        image,
        location: location || "",
        sellerId: userId
      },
      include: {
        seller: true
      } as any
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}

// DELETE product
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
