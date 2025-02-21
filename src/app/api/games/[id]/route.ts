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
        const game = await prisma.game.findUnique({
            where: { id },
            select: {
                id: true,
                recordedDate: true,
                ruleId: true,
            },
        });
        if (!game) {
            return NextResponse.json(
                { error: "該当する試合が見つかりません" },
                { status: 404 },
            );
        }
        const rule = await prisma.rule.findUnique({
            where: { id: game.ruleId },
            select: {
                name: true,
                length: true,
                startScore: true,
                returnScore: true,
            },
        });

        return NextResponse.json({ ...game, ...rule });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "試合の取得に失敗しました" },
            { status: 500 },
        );
    }
};
