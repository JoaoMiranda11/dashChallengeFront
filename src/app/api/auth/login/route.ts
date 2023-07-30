import { SignJWT } from "jose";
import { NextResponse, NextRequest } from "next/server";
import { authCookieName, getJwtSecretKey } from "@/utils/jwt";
import { v4 as uuidv4 } from 'uuid';
import { getUser } from "@/services/getSession";

const expiration = process.env.JWT_TOKEN_EXPIRATION || "300s";

export async function POST(req: NextRequest) {
  const body = await req.json()

  const user = await getUser({username: body.username, password: body.password})
  if (user !== null) {
    const token = await new SignJWT({user, key: uuidv4()})
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expiration) 
      .sign(getJwtSecretKey());

    const response = NextResponse.json(
      { success: true },
      { status: 200, headers: { "content-type": "application/json" } }
    );

    response.cookies.set({
      name: authCookieName,
      value: token,
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ success: false });
}