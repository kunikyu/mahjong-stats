// 試合の結果を表示するためのコンポーネント Game を作成します。
"use client";
import React from "react";

import Link from "next/link";
import { Game, PlayerGamewithName, Rule } from "@/app/_types/APIresponse";
import dayjs from "dayjs";

type Props = {
    game: Game;
    rule: Rule;
    players: PlayerGamewithName[];
};

const GameSummary: React.FC<Props> = ({ game, rule, players }) => {
    const dtFmt = "YYYY-MM-DD HH:mm";
    return (
        <Link href={`/games/${game.id}`}>
            <div className="my-2 border-2 border-gray-500 p-4">
                <div>Recorded Date: {dayjs(game.recordedDate).format(dtFmt)}</div>
                <div>Rule: {rule.name}</div>
                {players.map((player) => {
                    return <div key={player.id}>{player.playerName}</div>;
                })}
            </div>
        </Link>
    );
};

export default GameSummary;
