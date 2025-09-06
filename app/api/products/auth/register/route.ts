import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

// Define the user type based on Prisma model
type User = {
  id: string
  email: string
  name: string | null
  username: string | null
  location: string | null
  password: string
  createdAt: Date
}

export async function POST(req: Request) {
  try {
    const { name, email, password, location } = await req.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // ✅ Check if email exists
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // ✅ Create user with proper type assertion
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username: name,  // Using name as username
      },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
      }
    }) as User

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    )

    return NextResponse.json(
      {
        success: true,
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          joinedAt: user.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Register error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
