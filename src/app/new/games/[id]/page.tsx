"use client";

import IsLoading from "@/app/_components/IsLoading";
import PlayerData from "@/app/_types/PlayerData";
import RoundName from "@/app/utils/RoundName";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams, useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

type RoundData = {
    gameId: string;
    roundNumber: number;
    honba: number;
    kyoutaku: number;
    oyaId: string;
};

type PlayerGameResponse = {
    id: string;
    gameId: string;
    seet: number;
    playerId: string;
};

type PlayerApiResponse = {
    id: string;
    name: string;
};

type GameApiResponse = {
    id: string;
    ruleId: string;
    recordedDate: string;
    name: string;
    length: number;
    startScore: number;
    returnScore: number;
};
const Page: React.FC = () => {
    const { id } = useParams() as { id: string };
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [IsLoadingPlayer, setIsLoadingPlayer] = useState<boolean>(false);
    const [IsLoadingGame, setIsLoadingGame] = useState<boolean>(false);
    const [IsLoadingPlayerGame, setIsLoadingPlayerGame] =
        useState<boolean>(false);
    const [IsLoadingOyaId, setIsLoadingOyaId] = useState<boolean>(false);

    const [roundNumber, setRoundNumber] = useState<number>(0);
    const [honba, setHonba] = useState<number>(0);
    const [kyoutaku, setKyoutaku] = useState<number>(0);
    const [oyaId, setOyaId] = useState<string>("");
    const [playerIds, setPlayerIds] = useState<string[]>([]);
    const [allPlayer, setAllPlayer] = useState<PlayerApiResponse[]>([]);
    const [newPlayerData, setNewPlayerData] = useState<PlayerData[]>([]);
    const [Agari, setAgari] = useState<string>("");
    const [Houju, setHouju] = useState<string>("");

    const [game, setGame] = useState<GameApiResponse>();
    const [nowScore, setNowScore] = useState<number[]>([0, 0, 0, 0]);
    const [nowScoreChange, setNowScoreChange] = useState<number[]>([
        0, 0, 0, 0,
    ]);

    const [nowHan, setNowHan] = useState<number>(1);
    const [nowFu, setNowFu] = useState<number>(30);
    const router = useRouter();
    useEffect(() => {
        const fetchPlayerGame = async () => {
            try {
                setIsLoadingPlayerGame(true);
                const requestUrl = "/api/playergame";
                const response = await fetch(requestUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = (await response.json()) as PlayerGameResponse[];
                const sortedPlayerIds = data
                    .filter((pg) => pg.gameId === id)
                    .sort((a, b) => a.seet - b.seet)
                    .map((pg) => pg.playerId);
                setPlayerIds(sortedPlayerIds);
                setOyaId(sortedPlayerIds[roundNumber % 4]);
                setNewPlayerData(
                    sortedPlayerIds.map((playerId, index) => ({
                        playerId,
                        roundId: "",
                        scoreChange: nowScoreChange[index],
                        state: "concealed",
                        result: "none",
                    })),
                );
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingPlayerGame(false);
            }
        };
        fetchPlayerGame();
        const fetchPlayer = async () => {
            try {
                setIsLoadingPlayer(true);
                const requestUrl = "/api/players";
                const response = await fetch(requestUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = (await response.json()) as PlayerApiResponse[];
                setAllPlayer(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingPlayer(false);
            }
        };
        fetchPlayer();
    }, [id]);
    useEffect(() => {
        const fetchGame = async () => {
            try {
                setIsLoadingGame(true);
                const requestUrl = `/api/games/${id}`;
                const response = await fetch(requestUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = (await response.json()) as GameApiResponse;
                setGame(data);
                setNowScore(nowScore.map(() => data.startScore));
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingGame(false);
            }
        };
        fetchGame();
    }, [id]);
    const handleRadioChange = (row: number, col: number) => {
        const newPlayerDataCopy = [...newPlayerData];
        newPlayerDataCopy[row].state = ["riichi", "meld", "concealed"][col];
        if (col === 0 && Agari === "") {
            newPlayerDataCopy[row].result = "tenpai";
        }
        setNewPlayerData(newPlayerDataCopy);
    };

    const handleCheckboxChange = (row: number) => {
        const newPlayerDataCopy = [...newPlayerData];
        newPlayerDataCopy[row].result =
            newPlayerDataCopy[row].result !== "tenpai" ? "tenpai" : "noten";
        setNewPlayerData(newPlayerDataCopy);
    };

    const updateAgari = (agari: string) => {
        setAgari(agari);
        const newPlayerDataCopy = [...newPlayerData];
        newPlayerDataCopy.forEach((pd) => {
            if (agari === "") {
                pd.result = "noten";
                if (pd.state === "riichi") {
                    pd.result = "tenpai";
                }
            } else if (Houju === "") {
                if (pd.playerId === agari) {
                    pd.result = "tsumo";
                } else {
                    pd.result = "lose";
                }
            } else {
                if (pd.playerId === agari) {
                    pd.result = "ron";
                } else if (pd.playerId === Houju) {
                    pd.result = "dealin";
                } else {
                    pd.result = "none";
                }
            }
        });
        setNewPlayerData(newPlayerDataCopy);
        console.log(newPlayerDataCopy);
    };

    const updateHouju = (houju: string) => {
        setHouju(houju);
        const newPlayerDataCopy = [...newPlayerData];
        newPlayerDataCopy.forEach((pd) => {
            if (pd.playerId === houju) {
                pd.result = "dealin";
            } else if (pd.playerId === Agari) {
                pd.result = "none";
            }
        });
        setNewPlayerData(newPlayerDataCopy);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event?.preventDefault();
        try {
            setIsSubmitting(true);
            const requestUrl = "/api/admin/rounds";
            const requestBody = {
                gameId: id,
                roundNumber: roundNumber,
                honba: honba,
                kyoutaku: kyoutaku,
                oyaId,
                playerData: newPlayerData,
            };
            console.log(requestBody);
            const response = await fetch(requestUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data);
            }
            console.log(data);
            if (Agari === oyaId) {
                setHonba(honba ? honba : 0 + 1);
                setKyoutaku(0);
            } else if (Agari === "") {
                setKyoutaku(
                    (kyoutaku ? kyoutaku : 0) +
                        newPlayerData.filter((pd) => pd.result === "tenpai")
                            .length,
                );
                setHonba((honba ? honba : 0) + 1);
                // oyaがtenpaiならroundNumberを変えない
                // そうでなければroundNumberを1増やす
                if (
                    newPlayerData.find((pd) => pd.playerId === oyaId)
                        ?.result !== "tenpai"
                ) {
                    if (roundNumber + 1 === game?.length) {
                        router.replace(`/games/${id}`);
                        console.log("game end");
                    }
                    setRoundNumber((roundNumber ? roundNumber : 0) + 1);
                }
            } else {
                if (roundNumber + 1 === game?.length) {
                    router.replace(`/games/${id}`);
                }
                setHonba(0);
                setRoundNumber((roundNumber ? roundNumber : 0) + 1);
                setKyoutaku(0);
            }
            setOyaId(playerIds[roundNumber % 4]);
            setAgari("");
            setHouju("");
            setNowScore(
                nowScore.map((score, index) => score + nowScoreChange[index]),
            );
            setNowScoreChange([0, 0, 0, 0]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };
    if (
        IsLoadingPlayer ||
        IsLoadingGame ||
        IsLoadingPlayerGame ||
        IsLoadingOyaId
    ) {
        return <IsLoading />;
    }
    if (isSubmitting) {
        return (
            <main>
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="flex items-center rounded-lg bg-white px-8 py-4 shadow-lg">
                        <FontAwesomeIcon
                            icon={faSpinner}
                            className="mr-2 animate-spin text-gray-500"
                        />
                        <div className="flex items-center text-gray-500">
                            処理中...
                        </div>
                    </div>
                </div>
            </main>
        );
    }
    return (
        <main>
            <h1>新規局面</h1>
            <div className="">{`${RoundName[roundNumber ? roundNumber : 0]}${honba ? honba : 0}本場,供託${(kyoutaku ? kyoutaku : 0) * 1000}点`}</div>
            <div className="">{`${id}`} </div>
            <div className="">{`${game?.name}`} </div>
            <div className="">{`${game?.recordedDate}`} </div>
            <div className="">{`${oyaId}`} </div>
            <form onSubmit={handleSubmit}>
                <div className="flex ">
                    <div className="m-1">
                        <label htmlFor="agari">和了者</label>
                        <select
                            name="agari"
                            id="agari"
                            value={Agari}
                            onChange={(e) => updateAgari(e.target.value)}
                        >
                            <option value="">流局</option>
                            {playerIds.map((playerId, index) => (
                                <option key={index} value={playerId}>
                                    {
                                        allPlayer.find((p) => p.id === playerId)
                                            ?.name
                                    }
                                </option>
                            ))}
                        </select>
                    </div>
                    {Agari !== "" && (
                        <div className="m-1">
                            <label htmlFor="houju">放銃者</label>
                            <select
                                name="houju"
                                id="houju"
                                value={Houju}
                                onChange={(e) => updateHouju(e.target.value)}
                            >
                                <option value="">ツモ</option>
                                {playerIds.map((playerId, index) => (
                                    <option key={index} value={playerId}>
                                        {
                                            allPlayer.find(
                                                (p) => p.id === playerId,
                                            )?.name
                                        }
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {Agari !== "" && (
                        <div className="m-1">
                            <label htmlFor="">和了点数</label>
                            <select
                                name="han"
                                id="han"
                                onChange={(e) =>
                                    setNowHan(Number(e.target.value))
                                }
                            >
                                {[
                                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
                                ].map((han) => (
                                    <option key={han} value={han}>
                                        {han}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="han" className="m-1">
                                翻
                            </label>
                            <select name="fu" id="fu">
                                {[
                                    20, 25, 30, 40, 50, 60, 70, 80, 90, 100,
                                    110, 120, 130, 140, 150, 160, 170, 180, 200,
                                ]
                                    // .filter((fu) =>
                                    //     nowHan > 1
                                    //         ? fu
                                    //         : Houju === ""
                                    //           ? fu > 20
                                    //           : fu >= 30,
                                    // )
                                    .map((fu) => (
                                        <option key={fu} value={fu}>
                                            {fu}
                                        </option>
                                    ))}
                            </select>
                            <label htmlFor="hu" className="m-1">
                                符
                            </label>
                        </div>
                    )}
                </div>
                <table className="border-collapse border-2 border-black">
                    <thead>
                        <tr>
                            <th
                                rowSpan={2}
                                className="border border-gray-400 px-3 py-2"
                            >
                                プレイヤー
                            </th>
                            <th
                                rowSpan={2}
                                className="border border-gray-400 px-3 py-2"
                            >
                                スコア
                            </th>
                            <th colSpan={3} className="border border-gray-400">
                                状態
                            </th>
                            <th
                                rowSpan={2}
                                className="border border-gray-400 px-3 py-2"
                            >
                                スコア変動
                            </th>
                            {Agari === "" && (
                                <th
                                    rowSpan={2}
                                    className="border border-gray-400 px-3 py-2"
                                >
                                    聴牌
                                </th>
                            )}
                        </tr>
                        <tr>
                            <th className="w-14 border border-gray-400">
                                リーチ
                            </th>
                            <th className="w-14 border border-gray-400">
                                鳴き
                            </th>
                            <th className="w-14 border border-gray-400">
                                面前
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {newPlayerData.length > 0 &&
                            newPlayerData.map((player, row) => (
                                <tr key={row}>
                                    <th className="border border-gray-400 px-3 py-2">{`${
                                        allPlayer.find(
                                            (p) => p.id === player.playerId,
                                        )?.name
                                    }`}</th>
                                    <td className="border border-gray-400 px-3 py-2 text-right">
                                        {nowScore[row]}
                                    </td>
                                    {[0, 1, 2].map((col) => (
                                        <td className="text-center" key={col}>
                                            <input
                                                type="radio"
                                                name={`player-${row}`}
                                                onChange={() =>
                                                    handleRadioChange(row, col)
                                                }
                                                checked={
                                                    player.state ===
                                                    [
                                                        "riichi",
                                                        "meld",
                                                        "concealed",
                                                    ][col]
                                                }
                                            />
                                        </td>
                                    ))}
                                    <td className="border border-gray-400 px-3 py-2 text-right">
                                        {nowScoreChange[row] +
                                            (player.state === "riichi"
                                                ? -1000
                                                : 0)}
                                    </td>

                                    {Agari === "" && (
                                        <td className="border border-gray-400 px-3 py-2">
                                            <input
                                                type="checkbox"
                                                name={`checkbox-${row}`}
                                                onChange={() =>
                                                    handleCheckboxChange(row)
                                                }
                                                checked={
                                                    player.result === "tenpai"
                                                }
                                                disabled={
                                                    player.state === "riichi"
                                                }
                                            />
                                        </td>
                                    )}
                                </tr>
                            ))}
                    </tbody>
                </table>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={Agari === Houju && Agari !== ""}
                        className="rounded-lg  bg-blue-300 px-3 py-1 hover:bg-blue-400 disabled:cursor-not-allowed"
                    >
                        次へ
                    </button>
                </div>
            </form>
        </main>
    );
};

export default Page;
