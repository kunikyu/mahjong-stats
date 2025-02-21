const OyaTsumoScoreTable = [
    [0, 0, 500, 700, 800, 1000, 1200, 1300, 1500, 1600, 1800, 2000],
    [700, 0, 1000, 1300, 1600, 2000, 2300, 2600, 2900, 3200, 3600, 3900],
];
const OyaRonScoreTable = [
    [0, 0, 1500, 2000, 2400, 2900, 3400, 3900, 4400, 4800, 5300, 5800],
    [0, 0, 2900, 3900, 4800, 5800, 6800, 7700, 8700, 9600, 10600, 11600],
];
const KoTsumoScoreTableK = [
    [0, 0, 300, 400, 400, 500, 600, 700, 800, 800, 900, 1000],
    [400, 0, 500, 700, 800, 1000, 1200, 1300, 1500, 1600, 1800, 2000],
];
const KoTsumoScoreTableO = [
    [0, 0, 500, 700, 800, 1000, 1200, 1300, 1500, 1600, 1800, 2000],
    [700, 0, 1000, 1300, 1600, 2000, 2300, 2600, 2900, 3200, 3600, 3900],
];

const KoRonScoreTable = [
    [0, 0, 1000, 1300, 1600, 2000, 2300, 2600, 2900, 3200, 3600, 3900],
    [0, 0, 2000, 2600, 3200, 3900, 4500, 5200, 5800, 6400, 7100, 7700],
];
const fu2index = (fu: number): number => {
    if (fu === 20) return 0;
    if (fu === 25) return 1;
    if (fu === 30) return 2;
    if (fu === 40) return 3;
    if (fu === 50) return 4;
    if (fu === 60) return 5;
    if (fu === 70) return 6;
    if (fu === 80) return 7;
    if (fu === 90) return 8;
    if (fu === 100) return 9;
    if (fu === 110) return 10;
    if (fu === 120) return 11;
    return -1;
};

const sethanfu = (han: number, fu: number): number[] => {
    if (han === 4) {
        --han;
        fu *= 2;
    }
    if (han === 3 && fu < 70) {
        --han;
        fu *= 2;
    } else if (han === 3) {
        han = 5;
    }
    console.log(han, fu);
    const fuIndex = fu2index(fu);
    return [han, fuIndex];
};
const OyaTsumoScore = (a: number, b: number): number => {
    const [han, fuIndex] = sethanfu(a, b);
    if (han >= 13) return 16000;
    if (han >= 11) return 12000;
    if (han >= 8) return 8000;
    if (han >= 6) return 6000;
    if (han >= 5) return 4000;
    return OyaTsumoScoreTable[han - 1][fuIndex];
};
const KoRonScore = (a: number, b: number): number => {
    const [han, fuIndex] = sethanfu(a, b);
    if (han >= 13) return 32000;
    if (han >= 11) return 24000;
    if (han >= 8) return 16000;
    if (han >= 6) return 12000;
    if (han >= 5) return 8000;
    return KoRonScoreTable[han - 1][fuIndex];
};
const OyaRonScore = (a: number, b: number): number => {
    const [han, fuIndex] = sethanfu(a, b);
    if (han >= 13) return 48000;
    if (han >= 11) return 36000;
    if (han >= 8) return 24000;
    if (han >= 6) return 18000;
    if (han >= 5) return 12000;
    return OyaRonScoreTable[han - 1][fuIndex];
};
const KoTsumoScore = (a: number, b: number): number[] => {
    const [han, fuIndex] = sethanfu(a, b);
    if (han >= 13) return [8000, 16000];
    if (han >= 11) return [6000, 12000];
    if (han >= 8) return [4000, 8000];
    if (han >= 6) return [3000, 6000];
    if (han >= 5) return [2000, 4000];
    return [
        KoTsumoScoreTableK[han - 1][fuIndex],
        KoTsumoScoreTableO[han - 1][fuIndex],
    ];
};
export {
    OyaTsumoScoreTable,
    OyaRonScoreTable,
    KoTsumoScoreTableK,
    KoTsumoScoreTableO,
    KoRonScoreTable,
    OyaTsumoScore as ScoreOyaTsumo,
    KoRonScore as ScoreKoRon,
    OyaRonScore as ScoreOyaRon,
    KoTsumoScore as ScoreKoTsumo,
};
