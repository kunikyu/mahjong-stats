import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Player } from "@prisma/client";

type RequestBody = {
    name: string;
};

export const POST = async (req: NextRequest) => {
    try {
        const { name }: RequestBody = await req.json();
        const rule: Player = await prisma.player.create({
            data: {
                name,
            },
        });
        return NextResponse.json(rule);
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "カテゴリの作成に失敗しました" },
            { status: 500 },
        );
    }
};
