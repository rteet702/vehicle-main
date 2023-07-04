import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const workOrders = await prisma.workOrder.findMany({
        include: { vehicle: true },
    });
    return NextResponse.json({ workOrders: workOrders });
}
