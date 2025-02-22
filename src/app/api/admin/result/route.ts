import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Player, Result } from "@/app/_types/APIresponse";

type RequestBody = {
    playerId: string;
    gameId: string;
    rank: number;
    rawScore: number;
    scaledScore: number;
}[];

export const POST = async (req: NextRequest) => {
    try {
        const body: RequestBody = await req.json();
        const response = await prisma.result.createMany({
            data: body,
        });
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "カテゴリの作成に失敗しました" }, { status: 500 });
    }
};
