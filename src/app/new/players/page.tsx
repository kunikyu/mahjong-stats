"use client";
import IsLoading from "@/app/_components/IsLoading";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, cache } from "react";
import { twMerge } from "tailwind-merge";

type PlayerApiResponse = {
    id: string;
    name: string;
};

const Page: React.FC = () => {
    const [newName, setNewName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fetchErrorMsg, setFetchErrorMsg] = useState<string | null>(null);

    const [isLoading, setIsLoading] = useState(false);
    const [names, setNames] = useState<string[] | null>(null);
    const [mojisuu, setMojisuu] = useState(false);
    const [siyouzumi, setSiyouzumi] = useState(false);
    useEffect(() => {
        // ウェブAPI (/api/categories) からカテゴリの一覧をフェッチする関数の定義
        const fetchPlayers = async () => {
            try {
                setIsLoading(true);

                // フェッチ処理の本体
                const requestUrl = "/api/players";
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
                const apiResBody = (await res.json()) as PlayerApiResponse[];
                setNames(apiResBody.map((player) => player.name));
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

        fetchPlayers();
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setIsSubmitting(true);
        try {
            const requestBody = { name: newName };
            const requestUrl = "/api/admin/players";
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
        //入力された名前の文字数が1<=x<=15の範囲内であるかチェック
        if (e.target.value.length < 1 || e.target.value.length > 15) {
            setMojisuu(true);
        } else {
            setMojisuu(false);
        }
        setNewName(e.target.value);
    };
    if (isLoading) {
        return <IsLoading />;
    }
    return (
        <main>
            <div className="mb-4 text-2xl font-bold">プレイヤーの新規登録</div>

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
                        名前
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
                        <div className="text-red-500">その名前は既に登録されています</div>
                    )}
                    {mojisuu && (
                        <div className="text-red-500">
                            名前は1文字以上15文字以内で入力してください
                        </div>
                    )}
                </div>

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
                        新規プレイヤーを登録
                    </button>
                </div>
            </form>
        </main>
    );
};

export default Page;
