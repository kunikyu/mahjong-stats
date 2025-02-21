"use client";
import IsLoading from "@/app/_components/IsLoading";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useState, useEffect, cache } from "react";
import { twMerge } from "tailwind-merge";

type RuleApiResponse = {
    id: string;
    name: string;
    startScore: number;
    returnScore: number;
    length: number;
};

const Page: React.FC = () => {
    const [newName, setNewName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchErrorMsg, setFetchErrorMsg] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [names, setNames] = useState<string[] | null>(null);
    const [mojisuu, setMojisuu] = useState(false);
    const [siyouzumi, setSiyouzumi] = useState(false);

    const [oka, setOka] = useState(20);
    const [length, setLength] = useState(8);
    const [startScore, setStartScore] = useState(25000);
    const [returnScore, setReturnScore] = useState(30000);
    const [uma1, setUma1] = useState(10);
    const [uma2, setUma2] = useState(20);

    const router = useRouter();
    useEffect(() => {
        // ウェブAPI (/api/categories) からカテゴリの一覧をフェッチする関数の定義
        const fetchRules = async () => {
            try {
                setIsLoading(true);

                // フェッチ処理の本体
                const requestUrl = "/api/rules";
                const res = await fetch(requestUrl, {
                    method: "GET",
                    cache: "no-store",
                });

                // レスポンスのステータスコードが200以外の場合 (カテゴリのフェッチに失敗した場合)
                if (!res.ok) {
                    setNames(null);
                    throw new Error(`${res.status}: ${res.statusText}`); // -> catch節に移動
                }

                // レスポンスのボディをJSONとして読み取りカテゴリ配列 (State) にセット
                const apiResBody = (await res.json()) as RuleApiResponse[];
                setNames(apiResBody.map((rule) => rule.name));
                console.log(apiResBody);
            } catch (error) {
                const errorMsg =
                    error instanceof Error
                        ? `カテゴリの一覧のフェッチに失敗しました: ${error.message}`
                        : `予期せぬエラーが発生しました ${error}`;
                console.error(errorMsg);
                setFetchErrorMsg(errorMsg);
            } finally {
                // 成功した場合も失敗した場合もローディング状態を解除
                setIsLoading(false);
            }
        };

        fetchRules();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setIsSubmitting(true);
        try {
            const requestBody = {
                name: newName,
                length: length,
                startScore: startScore,
                returnScore: returnScore,
                uma1: uma1,
                uma2: uma2,
                // oka: oka,
            };
            const requestUrl = "/api/admin/rules";
            const res = await fetch(requestUrl, {
                method: "POST",
                cache: "no-cache",
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
            router.replace("/");
        } catch (error) {
            const errorMsg =
                error instanceof Error
                    ? `新規プレイヤーのPOSTに失敗しました: ${error.message}`
                    : `予期せぬエラーが発生しました\n${error}`;
            console.error(errorMsg);
            window.alert(errorMsg);
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    };
    const updateNewName = (e: React.ChangeEvent<HTMLInputElement>) => {
        //入力された名前が既存の名前と重複していないかチェック
        if (names?.includes(e.target.value)) {
            setSiyouzumi(true);
        } else {
            setSiyouzumi(false);
        }
        //入力された名前の文字数が1<=x<=30の範囲内であるかチェック
        if (e.target.value.length < 1 || e.target.value.length > 30) {
            setMojisuu(true);
        } else {
            setMojisuu(false);
        }
        setNewName(e.target.value);
    };
    const updateType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(e.target.value);
        setLength(parseInt(e.target.value));
    };
    const updateStartScore = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newStartScore = isNaN(parseInt(e.target.value))
            ? 25000
            : parseInt(e.target.value) > 100000
              ? 100000
              : parseInt(e.target.value);
        newStartScore > returnScore ? setReturnScore(newStartScore) : null;
        setStartScore(newStartScore);
        setOka(
            isNaN((4 * (returnScore - newStartScore)) / 1000)
                ? 0
                : newStartScore > returnScore
                  ? 0
                  : (4 * (returnScore - newStartScore)) / 1000,
        );
    };
    const updateReturnScore = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newReturnScore = isNaN(parseInt(e.target.value))
            ? 30000
            : parseInt(e.target.value) > 100000
              ? 100000
              : parseInt(e.target.value);
        newReturnScore < startScore ? setStartScore(newReturnScore) : null;
        setReturnScore(newReturnScore);
        setOka(
            isNaN((4 * (newReturnScore - startScore)) / 1000)
                ? 0
                : newReturnScore < startScore
                  ? 0
                  : (4 * (newReturnScore - startScore)) / 1000,
        );
    };
    if (isLoading) {
        return <IsLoading />;
    }
    return (
        <main>
            <div className="mb-4 text-2xl font-bold">新ルールの登録</div>

            {isSubmitting && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="flex items-center rounded-lg bg-white px-8 py-4 shadow-lg">
                        <FontAwesomeIcon
                            icon={faSpinner}
                            className="mr-2 animate-spin text-gray-500"
                        />
                        <div className="flex items-center text-gray-500">処理中...</div>
                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className={twMerge("space-y-4", isSubmitting && "opacity-50")}
            >
                <div className="space-y-1">
                    <label htmlFor="name" className="block font-bold">
                        ルール名
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full rounded-md border-2 px-2 py-1"
                        value={newName}
                        onChange={updateNewName}
                        placeholder="名前を入力してください"
                        required
                    />
                    {siyouzumi && (
                        <div className="text-red-500">その名前は既に使用されています</div>
                    )}
                    {mojisuu && (
                        <div className="text-red-500">
                            名前は1文字以上30文字以内で入力してください
                        </div>
                    )}
                </div>
                <div className="">
                    <label htmlFor="type" className="font-bold">
                        タイプ
                    </label>
                    <select name="type" id="type" onChange={updateType}>
                        <option value="8">半荘戦</option>
                        <option value="4">東風戦</option>
                        <option value="1">一局戦</option>
                        <option value="16">全荘戦</option>
                    </select>
                </div>
                <div className="">
                    <label htmlFor="startScore" className="font-bold">
                        持ち点
                    </label>
                    <input
                        type="number"
                        id="startScore"
                        name="startScore"
                        step={1000}
                        min={20000}
                        max={100000}
                        value={startScore}
                        placeholder="持ち点を入力してください"
                        onChange={updateStartScore}
                        inputMode="numeric"
                        required
                    />
                </div>
                <div className="">
                    <label htmlFor="returnScore" className="font-bold">
                        返し点
                    </label>
                    <input
                        type="number"
                        id="returnScore"
                        name="returnScore"
                        step={1000}
                        min={20000}
                        max={100000}
                        value={returnScore}
                        placeholder="返し点を入力してください"
                        onChange={updateReturnScore}
                        required
                    />
                </div>
                <div className="">
                    <label htmlFor="uma1" className="font-bold">
                        順位点
                    </label>
                    <input
                        type="number"
                        name="uma1"
                        id="uma1"
                        max={999}
                        min={0}
                        className="w-12 text-right"
                        value={uma1}
                        onChange={(e) =>
                            setUma1(
                                parseInt(e.target.value)
                                    ? parseInt(e.target.value) > uma2
                                        ? uma2
                                        : parseInt(e.target.value) < 0
                                          ? 0
                                          : parseInt(e.target.value)
                                    : 0,
                            )
                        }
                    />
                    <div className="mx-2 inline">-</div>
                    <input
                        type="number"
                        name="uma2"
                        id="uma2"
                        max={999}
                        min={0}
                        className="w-12 text-right"
                        value={uma2}
                        onChange={(e) =>
                            setUma2(
                                parseInt(e.target.value)
                                    ? parseInt(e.target.value) > 999
                                        ? 999
                                        : parseInt(e.target.value) < uma1
                                          ? uma1
                                          : parseInt(e.target.value)
                                    : 0,
                            )
                        }
                    />
                </div>
                {oka !== Number.NaN && <div className="">{`オカは${oka}ptです`}</div>}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className={twMerge(
                            "rounded-md px-3 py-1 font-bold",
                            "bg-green-500 text-white hover:bg-green-600",
                            "disabled:cursor-not-allowed",
                        )}
                        disabled={isSubmitting || mojisuu || siyouzumi}
                    >
                        新ルールを登録
                    </button>
                </div>
            </form>
        </main>
    );
};

export default Page;
