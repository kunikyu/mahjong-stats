"use client";
import React from "react";
import Link from "next/link";
const Page: React.FC = () => {
    return (
        <main>
            <div className="m-5">
                <Link href="new/games" className="bg-pink-300 p-2">
                    試合の記録
                </Link>
            </div>
            <div className="m-5">
                <Link href="new/players" className=" bg-pink-300 p-2">
                    新規プレイヤーの登録
                </Link>
            </div>
            <div className="m-5">
                <Link href="new/rule" className="bg-pink-300 p-2">
                    ルールの登録
                </Link>
            </div>
        </main>
    );
};

export default Page;
