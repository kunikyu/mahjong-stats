"use client";
import React from "react";

import GameSummary from "@/app/_components/GameSummary";

import { Game, Rule } from "@/app/_types/APIresponse";

const Page: React.FC = () => {
    // /api/gamesで取得したデータを表示する
    const [games, setGames] = React.useState<Game[]>([]);
    const [rules, setRules] = React.useState<Rule[]>([]);
    React.useEffect(() => {
        fetch("/api/games")
            .then((res) => res.json())
            .then((data) => setGames(data));
        fetch("/api/rules")
            .then((res) => res.json())
            .then((data) => setRules(data));
    }, []);
    return (
        <main>
            <div className="text-2xl font-bold">Main</div>
            <div className="text-xl font-bold">Games</div>
            <div>
                {games.map((game) => (
                    <GameSummary key={game.id} game={game} />
                ))}
            </div>
        </main>
    );
};

export default Page;
