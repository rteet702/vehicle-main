import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: any }) {
    const data = context.params;

    if (!data.id) {
        return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }

    const user = await prisma.user.findFirst({ where: { id: data.userId } });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: user });
}
