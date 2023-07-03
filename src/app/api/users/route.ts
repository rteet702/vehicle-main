import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hash } from "bcrypt";

export async function GET(request: Request) {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
}

export async function POST(request: Request) {
    const data = await request.json();

    if (!data.username || !data.password || !data.confirmPassword) {
        return NextResponse.json({
            error: "Please include both username and password.",
        });
    }

    if (data.confirmPassword !== data.password) {
        return NextResponse.json(
            {
                error: "Passwords do not match.",
            },
            { status: 400 }
        );
    }

    const pwHash = await hash(data.password, 10);

    const newUser = await prisma.user.create({
        data: { username: data.username, password: pwHash },
    });
    return NextResponse.json({ user: newUser }, { status: 201 });
}
