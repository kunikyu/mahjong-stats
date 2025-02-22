import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
type RouteParams = {
    params: {
        id: string;
    };
};

export const GET = async (req: NextRequest, routeParams: RouteParams) => {
    try {
        // rulesからidで絞り込む
        const id = routeParams.params.id;

        const rules = await prisma.rule.findUnique({
            where: {
                id,
            },
        });
        return NextResponse.json(rules);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "試合の取得に失敗しました" }, { status: 500 });
    }
};
