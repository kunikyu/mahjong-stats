import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const rounds = await prisma.round.findMany({});
        return NextResponse.json(rounds);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "試合の取得に失敗しました" },
            { status: 500 },
        );
    }
};
