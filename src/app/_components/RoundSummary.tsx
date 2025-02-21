"use client";
import React, { useEffect } from "react";

import Link from "next/link";
import RoundName from "@/app/utils/RoundName";
import { Player, Round } from "@/app/_types/APIresponse";

type Props = {
    round: Round;
    players: Player[];
};

const RoundSummary: React.FC<Props> = ({ round, players }) => {
    const { roundNumber, honba, oyaId } = round;

    return (
        // <Link href={`/round/${round.id}`}>
        <div className="my-2 border-2 border-gray-500 p-4">
            <div className="">{round.id}</div>
            <div className="text-lg font-bold">
                {RoundName[roundNumber]}
                {honba}本場
            </div>
        </div>
        // </Link>
    );
};

export default RoundSummary;
