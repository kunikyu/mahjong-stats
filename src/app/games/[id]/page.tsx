"use client";
import React from "react";
import RoundSummary from "@/app/_components/RoundSummary";
import { useParams } from "next/navigation";
import { Game, Player, PlayerGame, Round } from "@/app/_types/APIresponse";
import dayjs from "dayjs";

type GameApiResponse = {
    id: string;
    ruleId: string;
    recordedDate: string;
    name: string;
    length: number;
};
const Page: React.FC = () => {
    const [game, setGame] = React.useState<GameApiResponse | null>(null);
    const [rounds, setRounds] = React.useState<Round[]>([]);
    const [players, setPlayers] = React.useState<PlayerGame[]>([]);
    const { id } = useParams() as { id: string };
    React.useEffect(() => {
        fetch(`/api/games/${id}`)
            .then((res) => res.json())
            .then((data) => setGame(data));
        fetch("/api/rounds")
            .then((res) => res.json())
            .then((data) => setRounds(data));
        fetch("/api/playergame")
            .then((res) => res.json())
            .then((data) => setPlayers(data));
    }, [id]);
    //   idが一致するgameを表示
    return (
        <main>
            {game && (
                <div>
                    <div className="">
                        {
                            <div className="">
                                <div className="text-lg font-bold">{game.name}</div>
                                <div className="text-lg font-bold">
                                    記録：{dayjs(game.recordedDate).format("YYYY/MM/DD HH:mm")}
                                </div>
                                <div className="">
                                    <div className="inline">プレイヤー</div>
                                    {players.map((player) =>
                                        player.gameId === game.id ? (
                                            <div key={player.id} className="inline">
                                                {` ${player.playerName}`}
                                            </div>
                                        ) : null,
                                    )}
                                </div>
                            </div>
                        }
                    </div>
                    <div>
                        {rounds.map((round) =>
                            round.gameId === game.id ? (
                                <RoundSummary key={round.id} round={round} players={players} />
                            ) : null,
                        )}
                    </div>
                </div>
            )}
        </main>
    );
};

export default Page;
