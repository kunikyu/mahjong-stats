import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export const GET = async (req: NextRequest) => {
    try {
        const playerGame = await prisma.playerGame.findMany({});
        const players = await prisma.player.findMany({});

        const responseBody = playerGame.map((pg) => {
            const player = players.find((p) => p.id === pg.playerId);
            return {
                ...pg,
                playerName: player?.name || "Unknown",
            };
        });

        // seetでソート
        responseBody.sort((a, b) => a.seet - b.seet);

        return NextResponse.json(responseBody);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "試合の取得に失敗しました" }, { status: 500 });
    }
};
