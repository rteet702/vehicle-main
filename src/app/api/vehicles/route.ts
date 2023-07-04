import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const vehicles = await prisma.vehicle.findMany({});
    return NextResponse.json({ vehicles: vehicles });
}
