import { jwtVerify } from "jose";

export const authCookieName = process.env.JWT_TOKEN_NAME || "auth-token";

export function getJwtSecretKey() {
  const secret = process.env.JWT_SECRET_KEY;

  if (!secret) {
    throw new Error("JWT Secret key is not matched");
  }

  return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());

    return payload;
  } catch (error) {
    return null;
  }
}