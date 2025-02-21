import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Round } from "@/app/_types/APIresponse";
import PlayerData from "@/app/_types/PlayerData";

type RequestBody = {
    gameId: string;
    roundNumber: number;
    honba: number;
    kyoutaku: number;
    oyaId: string;
    playerData: PlayerData[];
};

export const POST = async (req: NextRequest) => {
    try {
        const { gameId, roundNumber, honba, kyoutaku, oyaId, playerData }: RequestBody =
            await req.json();
        const round: Round = await prisma.round.create({
            data: {
                roundNumber,
                honba,
                kyoutaku,
                gameId,
                oyaId,
            },
        });
        const roundId = round.id;
        const playerDataWithRoundId = playerData.map((data) => {
            return { ...data, roundId };
        });
        await prisma.data.createMany({
            data: playerDataWithRoundId,
        });

        return NextResponse.json(round);
    } catch (error) {
        console.error("Error creating round:", error);
        return NextResponse.json({ error: "ラウンドの作成に失敗しました" }, { status: 500 });
    }
};
