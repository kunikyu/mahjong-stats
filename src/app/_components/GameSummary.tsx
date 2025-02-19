// 試合の結果を表示するためのコンポーネント Game を作成します。
"use client";
import React from "react";

import Link from "next/link";
import { Game } from "@prisma/client";

type Props = {
    game: Game;
};

const GameSummary: React.FC<Props> = ({ game }) => {
    return (
        <Link href={`/games/${game.id}`}>
            <div className="my-2 border-2 border-gray-500 p-4">
                <div>Recorded Date: {game.recordedDate.toString()}</div>
                <div>Rule: {game.ruleId}</div>
            </div>
        </Link>
    );
};

export default GameSummary;
