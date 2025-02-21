import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
    params: {
        id: string;
    };
};
export const revalidate = 0;
export const GET = async (req: NextRequest, routeParams: RouteParams) => {
    try {
        const id = routeParams.params.id;
        const playerIds = await prisma.playerGame.findMany({
            where: { gameId: id },
        });
        const players = await prisma.player.findMany({
            where: {
                id: {
                    in: playerIds.map((player) => player.playerId),
                },
            },
        });
        if (!players) {
            return NextResponse.json({ error: "該当する試合が見つかりません" }, { status: 404 });
        }
        return NextResponse.json({ players });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "試合の取得に失敗しました" }, { status: 500 });
    }
};
