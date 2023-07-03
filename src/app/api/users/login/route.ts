import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { compare } from "bcrypt";

export async function POST(request: Request) {
    const data = await request.json();

    if (!data.username || !data.password) {
        return NextResponse.json(
            {
                error: "Please include both username and password.",
            },
            { status: 400 }
        );
    }

    const user = await prisma.user.findFirst({
        where: { username: data.username },
    });

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const pwCheck = await compare(data.password, user.password);

    if (!pwCheck) {
        return NextResponse.json(
            { error: "Invalid Password" },
            { status: 401 }
        );
    }

    return NextResponse.json({ userId: user.id });
}
