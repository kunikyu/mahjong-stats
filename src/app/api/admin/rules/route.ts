import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Rule } from "@prisma/client";

type RequestBody = {
    name: string;
    length: number;
    startScore: number;
    returnScore: number;
    uma1: number;
    uma2: number;
};

export const POST = async (req: NextRequest) => {
    try {
        const {
            name,
            length,
            startScore,
            returnScore,
            uma1,
            uma2,
        }: RequestBody = await req.json();
        const rule: Rule = await prisma.rule.create({
            data: {
                name,
                length,
                startScore,
                returnScore,
                uma1,
                uma2,
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
