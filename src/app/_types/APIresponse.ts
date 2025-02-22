export type Game = {
    id: string;
    recordedDate: Date;
    ruleId: string;
};
export type PlayerGame = {
    id: string;
    seet: number;
    playerId: string;
    gameId: string;
    playerName: string;
};
export type Round = {
    id: string;
    gameId: string;
    oyaId: string;
    roundNumber: number;
    honba: number;
    kyoutaku: number;
};
export type Player = {
    id: string;
    name: string;
};
export type Data = {
    result: string;
    id: string;
    playerId: string;
    roundId: string;
    scoreChange: number;
    state: string;
};
export type Rule = {
    id: string;
    name: string;
    length: number;
    startScore: number;
    returnScore: number;
    uma1: number;
    uma2: number;
};
export type Result = {
    id: string;
    playerId: string;
    gameId: string;
    rank: number;
    rawScore: number;
    scaledScore: number;
};
