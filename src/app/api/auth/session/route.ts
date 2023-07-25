import { UserData } from '@/types/auth/interface';
import { authCookieName, verifyJwtToken } from '@/utils/jwt';
import { NextRequest, NextResponse } from 'next/server'
 
export async function GET(req: NextRequest, res: NextResponse) {     
    const { cookies } = req;
    const { value: token } = cookies.get(authCookieName) ?? { value: null };

    if (token) {
        const res = await verifyJwtToken(token);
        if (res) {
            const data = res.user as UserData;
            return NextResponse.json({ status: "Authenticated", data: data})
        }
    }
    return NextResponse.json({ status: "Unauthenticated", data: null })
}

export async function PATCH(req: NextRequest, res: NextResponse) {
    //TODO: refresh session
}

export async function DELETE(req: NextRequest, res: NextResponse) {
    const response = NextResponse.json(
        { success: true },
        { status: 200, headers: { "content-type": "application/json" } }
    );
    response.cookies.delete(authCookieName)
    return response;
}