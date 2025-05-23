import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const rules = await prisma.rule.findMany({});
        return NextResponse.json(rules);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "試合の取得に失敗しました" }, { status: 500 });
    }
};
