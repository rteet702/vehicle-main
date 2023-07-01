import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hash } from "bcrypt";

export async function GET(request: Request) {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users });
}

export async function POST(request: Request) {
    const data = await request.json();

    if (!data.username || !data.password) {
        return NextResponse.json({
            error: "Please include both username and password.",
        });
    }

    const pwHash = await hash(data.password, 10);

    const newUser = await prisma.user.create({
        data: { username: data.username, password: pwHash },
    });
    return NextResponse.json({ user: newUser });
}
