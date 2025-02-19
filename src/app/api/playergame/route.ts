import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
export const revalidate = 0;
export const GET = async (req: NextRequest) => {
    try {
        const playerGame = await prisma.playerGame.findMany({});
        //seetでソート
        return NextResponse.json(playerGame);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "試合の取得に失敗しました" },
            { status: 500 },
        );
    }
};
