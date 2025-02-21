import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { PlayerGame } from "@/app/_types/APIresponse";

type RequestBody = {
    seet: number;
    playerId: string;
    gameId: string;
};

export const POST = async (req: NextRequest) => {
    try {
        const { seet, playerId, gameId }: RequestBody = await req.json();
        const playergame: PlayerGame = await prisma.playerGame.create({
            data: {
                seet,
                playerId,
                gameId,
            },
        });
        return NextResponse.json(playergame);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "カテゴリの作成に失敗しました" }, { status: 500 });
    }
};
