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
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // ✅ Find user with proper type assertion
    const user = await prisma.user.findUnique({
      where: { email },
    }) as User | null

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // ✅ Compare password
    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    // ✅ Create JWT (make sure JWT_SECRET is in .env)
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "7d" }
    )

    // ✅ Send safe user object
    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name || user.username || "Anonymous",
        email: user.email,
        location: user.location || "Unknown",
        joinedAt: user.createdAt, // Prisma field
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
