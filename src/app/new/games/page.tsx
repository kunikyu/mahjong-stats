"use client";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import IsLoading from "@/app/_components/IsLoading";

type RuleApiResponse = {
    id: string;
    name: string;
};
type PlayerApiResponse = {
    id: string;
    name: string;
};
const Page: React.FC = () => {
    const [isLoadingRule, setIsLoadingRule] = useState(false);
    const [isLoadingPlayers, setIsLoadingPlayers] = useState(false);

    const router = useRouter();
    // api/ruleからルールの一覧を取得
    const [rules, setRules] = React.useState<RuleApiResponse[]>([]);
    const [newGameId, setNewGameId] = React.useState("");
    React.useEffect(() => {
        const fetchRules = async () => {
            try {
                setIsLoadingRule(true);
                const requestUrl = "/api/rules";
                const res = await fetch(requestUrl, {
                    method: "GET",
                    cache: "no-store",
                });
                if (!res.ok) {
                    setRules([]);
                    throw new Error(`${res.status}: ${res.statusText}`);
                }
                const apiResBody = (await res.json()) as RuleApiResponse[];
                setRules(apiResBody);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingRule(false);
            }
        };
        fetchRules();
    }, []);
    // api/playerからプレイヤーの一覧を取得
    const [players, setPlayers] = React.useState<PlayerApiResponse[]>([]);
    React.useEffect(() => {
        const fetchPlayers = async () => {
            try {
                setIsLoadingPlayers(true);
                const requestUrl = "/api/players";
                const res = await fetch(requestUrl, {
                    method: "GET",
                    cache: "no-store",
                });
                if (!res.ok) {
                    setPlayers([]);
                    throw new Error(`${res.status}: ${res.statusText}`);
                }
                const apiResBody = (await res.json()) as PlayerApiResponse[];
                setPlayers(apiResBody);
                console.log(players);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingPlayers(false);
            }
        };
        fetchPlayers();
    }, []);
    const [isAbleToSubmit, setIsAbleToSubmit] = React.useState(false);
    const [newPlayers, setNewPlayers] = React.useState<string[]>([
        "",
        "",
        "",
        "",
    ]);
    const [newRuleId, setNewRuleId] = React.useState("");
    const updateRule = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewRuleId(e.target.value);
        if (e.target.value === "" || newPlayers.includes("")) {
            setIsAbleToSubmit(false);
        } else if (
            newPlayers[0] === newPlayers[1] ||
            newPlayers[0] === newPlayers[2] ||
            newPlayers[0] === newPlayers[3] ||
            newPlayers[1] === newPlayers[2] ||
            newPlayers[1] === newPlayers[3] ||
            newPlayers[2] === newPlayers[3]
        ) {
            setIsAbleToSubmit(false);
        } else {
            setIsAbleToSubmit(true);
        }
    };
    const updateToncha = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewPlayers((prev) => {
            prev[0] = e.target.value;
            if (prev.includes("") || newRuleId === "") {
                setIsAbleToSubmit(false);
            } else if (
                prev[0] === newPlayers[1] ||
                prev[0] === newPlayers[2] ||
                prev[0] === newPlayers[3] ||
                newPlayers[1] === newPlayers[2] ||
                newPlayers[1] === newPlayers[3] ||
                newPlayers[2] === newPlayers[3]
            ) {
                setIsAbleToSubmit(false);
            } else {
                setIsAbleToSubmit(true);
            }
            return [...prev];
        });
    };
    const updateNancha = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewPlayers((prev) => {
            prev[1] = e.target.value;
            if (prev.includes("") || newRuleId === "") {
                setIsAbleToSubmit(false);
            } else if (
                prev[1] === newPlayers[0] ||
                prev[1] === newPlayers[2] ||
                prev[1] === newPlayers[3] ||
                newPlayers[0] === newPlayers[2] ||
                newPlayers[0] === newPlayers[3] ||
                newPlayers[2] === newPlayers[3]
            ) {
                setIsAbleToSubmit(false);
            } else {
                setIsAbleToSubmit(true);
            }
            return [...prev];
        });
    };
    const updateShacha = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewPlayers((prev) => {
            prev[2] = e.target.value;
            if (prev.includes("") || newRuleId === "") {
                setIsAbleToSubmit(false);
            } else if (
                prev[2] === newPlayers[0] ||
                prev[2] === newPlayers[1] ||
                prev[2] === newPlayers[3] ||
                newPlayers[0] === newPlayers[1] ||
                newPlayers[0] === newPlayers[3] ||
                newPlayers[1] === newPlayers[3]
            ) {
                setIsAbleToSubmit(false);
            } else {
                setIsAbleToSubmit(true);
            }
            return [...prev];
        });
    };
    const updatePeicha = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setNewPlayers((prev) => {
            prev[3] = e.target.value;
            if (prev.includes("") || newRuleId === "") {
                setIsAbleToSubmit(false);
            } else if (
                prev[3] === newPlayers[0] ||
                prev[3] === newPlayers[1] ||
                prev[3] === newPlayers[2] ||
                newPlayers[0] === newPlayers[1] ||
                newPlayers[0] === newPlayers[2] ||
                newPlayers[1] === newPlayers[2]
            ) {
                setIsAbleToSubmit(false);
            } else {
                setIsAbleToSubmit(true);
            }
            return [...prev];
        });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(newRuleId, newPlayers);
        try {
            const requestUrl = "/api/admin/newGame";
            const requestBody = {
                ruleId: newRuleId,
                toncha: newPlayers[0],
                nancha: newPlayers[1],
                shacha: newPlayers[2],
                peicha: newPlayers[3],
            };
            const res = await fetch(requestUrl, {
                method: "POST",
                cache: "no-store",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
            if (!res.ok) {
                throw new Error(`${res.status}: ${res.statusText}`);
            }
            const postResponse = await res.json();
            console.log(postResponse);
            router.replace(`/new/games/${postResponse.id}/`);
        } catch (error) {
            console.error(error);
        }
    };
    if (isLoadingRule || isLoadingPlayers) {
        return <IsLoading />;
    }
    return (
        <div>
            <h1 className="text-2xl font-bold">試合の情報を入力してください</h1>
            {/* <form onSubmit={hundlesubmit}> */}
            <form onSubmit={handleSubmit}>
                <div className="my-4">
                    <label className="block" htmlFor="rule">
                        ルール
                    </label>
                    <select id="rule" name="rule" onChange={updateRule}>
                        <option value="">選択してください</option>
                        {rules.map((rule) => (
                            <option key={rule.id} value={rule.id}>
                                {rule.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="my-4 flex flex-col">
                    <div className="my-1">
                        <label htmlFor="toncha" className="font-bold">
                            東家:
                        </label>
                        {/* <input
                            type="text"
                            id="toncha"
                            name="toncha"
                            className="rounded-md border-2 px-2 py-1"
                        /> */}
                        <select id="toncha" onChange={updateToncha}>
                            <option value="">選択してください</option>
                            {players.map((player) => (
                                <option key={player.id} value={player.id}>
                                    {player.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="my-1">
                        <label htmlFor="nancha" className="font-bold">
                            南家:
                        </label>
                        {/* <input
                            type="text"
                            id="nancha"
                            name="nancha"
                            className="rounded-md border-2 px-2 py-1"
                            /> */}
                        <select id="nancha" onChange={updateNancha}>
                            <option value="">選択してください</option>
                            {players.map((player) => (
                                <option key={player.id} value={player.id}>
                                    {player.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="my-1">
                        <label htmlFor="shacha" className="font-bold">
                            西家:
                        </label>
                        {/* <input
                            type="text"
                            id="shacha"
                            name="shacha"
                            className="rounded-md border-2 px-2 py-1"
                            /> */}
                        <select id="shacha" onChange={updateShacha}>
                            <option value="">選択してください</option>
                            {players.map((player) => (
                                <option key={player.id} value={player.id}>
                                    {player.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="my-1">
                        <label htmlFor="peicha" className="font-bold">
                            北家:
                        </label>
                        {/* <input
                            type="text"
                            id="peicha"
                            name="peicha"
                            className="rounded-md border-2 px-2 py-1"
                        /> */}
                        <select id="peicha" onChange={updatePeicha}>
                            <option value="">選択してください</option>
                            {players.map((player) => (
                                <option key={player.id} value={player.id}>
                                    {player.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={!isAbleToSubmit}
                    className="rounded-lg  bg-blue-300 px-3 py-2 hover:bg-blue-400 disabled:cursor-not-allowed"
                >
                    試合を作成
                </button>
            </form>
        </div>
    );
};

export default Page;
