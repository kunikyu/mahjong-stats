"use client";
import React from "react";

import GameSummary from "@/app/_components/GameSummary";

import { Game, PlayerGamewithName, Rule } from "@/app/_types/APIresponse";

const Page: React.FC = () => {
    // /api/gamesで取得したデータを表示する
    const [games, setGames] = React.useState<Game[]>([]);
    const [rules, setRules] = React.useState<Rule[]>([]);
    const [playerGames, setPlayerGames] = React.useState<PlayerGamewithName[]>([]);
    React.useEffect(() => {
        fetch("/api/games")
            .then((res) => res.json())
            .then((data) => setGames(data));
        fetch("/api/rules")
            .then((res) => res.json())
            .then((data) => setRules(data));
        fetch("/api/playergame")
            .then((res) => res.json())
            .then((data) => setPlayerGames(data));
    }, []);
    return (
        <main>
            <div className="text-2xl font-bold">Main</div>
            <div className="text-xl font-bold">Games</div>
            <div>
                {games.map(
                    (game) =>
                        rules.find((rule) => rule.id === game.ruleId) &&
                        playerGames.filter((pd) => pd.gameId === game.id).length === 4 && (
                            <GameSummary
                                key={game.id}
                                game={game}
                                rule={rules.find((rule) => rule.id === game.ruleId) as Rule}
                                players={playerGames.filter((pd) => pd.gameId === game.id)}
                            />
                        ),
                )}
            </div>
        </main>
    );
};

export default Page;
