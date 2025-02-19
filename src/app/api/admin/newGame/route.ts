import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Game } from "@prisma/client";

type RequestBody = {
    ruleId: string;
    toncha: string;
    nancha: string;
    shacha: string;
    peicha: string;
};

export const POST = async (req: NextRequest) => {
    try {
        const { ruleId, toncha, nancha, shacha, peicha }: RequestBody =
            await req.json();
        const game: Game = await prisma.game.create({
            data: {
                ruleId,
            },
        });

        await prisma.playerGame.createMany({
            data: [
                { gameId: game.id, playerId: toncha, seet: 0 },
                { gameId: game.id, playerId: nancha, seet: 1 },
                { gameId: game.id, playerId: shacha, seet: 2 },
                { gameId: game.id, playerId: peicha, seet: 3 },
            ],
        });

        return NextResponse.json(game);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "新規の作成に失敗しました" },
            { status: 500 },
        );
    }
};
