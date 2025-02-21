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
        console.log(id);
        const player = await prisma.player.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
            },
        });
        if (!player) {
            return NextResponse.json(
                { error: "該当するプレイヤーが見つかりません" },
                { status: 404 },
            );
        }

        return NextResponse.json({ ...player });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "プレイヤーの取得に失敗しました" }, { status: 500 });
    }
};
