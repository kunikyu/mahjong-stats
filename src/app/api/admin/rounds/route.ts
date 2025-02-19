import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Data, Round } from "@prisma/client";

type RequestBody = {
    gameId: string;
    roundNumber: number;
    honba: number;
    kyoutaku: number;
    oyaId: string;
    playerData: Data[];
};

export const POST = async (req: NextRequest) => {
    try {
        const {
            gameId,
            roundNumber,
            honba,
            kyoutaku,
            oyaId,
            playerData,
        }: RequestBody = await req.json();
        console.log(gameId, roundNumber, honba, kyoutaku, oyaId, playerData);
        const round: Round = await prisma.round.create({
            data: {
                gameId,
                roundNumber,
                honba,
                kyoutaku,
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
        return NextResponse.json(
            { error: "ラウンドの作成に失敗しました" },
            { status: 500 },
        );
    }
};
