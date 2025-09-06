import { cookies } from 'next/headers';
import { jwtVerify, SignJWT } from 'jose';
import { PrismaClient } from '@prisma/client';
import { compare, hash } from 'bcryptjs';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'your-secret-key');
const COOKIE_NAME = 'ecofinds-auth';

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await compare(password, hashedPassword);
}

export function signJWT(payload: { sub: string; email: string }): string {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7; // 1 week

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(JWT_SECRET);
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { payload, valid: true };
  } catch (error) {
    return { payload: null, valid: false };
  }
}

export function setAuthCookie(token: string) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  });
}

export function clearAuthCookie() {
  cookies().delete(COOKIE_NAME);
}

export async function getCurrentUser() {
  const cookie = cookies().get(COOKIE_NAME)?.value;
  if (!cookie) return null;

  const { payload, valid } = await verifyJWT(cookie);
  if (!valid || !payload?.sub) return null;

  const prisma = new PrismaClient();
  return await prisma.user.findUnique({
    where: { id: payload.sub },
    select: { id: true, email: true, username: true },
  });
}
