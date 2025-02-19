import { PrismaClient } from "@prisma/client";
import { rule } from "postcss";

const prisma = new PrismaClient(); // PrismaClientのインスタンス生成

const main = async () => {
    // 各テーブルから既存の全レコードを削除
    await prisma.game?.deleteMany();
    await prisma.result?.deleteMany();
    await prisma.player?.deleteMany();
    await prisma.data?.deleteMany();
    await prisma.rule?.deleteMany();
    await prisma.round?.deleteMany();
    await prisma.playerGame?.deleteMany();
    //プレイヤーデータの作成
    const p1 = await prisma.player.create({
        data: {
            name: "Alice",
        },
    });
    const p2 = await prisma.player.create({
        data: {
            name: "Bob",
        },
    });
    const p3 = await prisma.player.create({
        data: {
            name: "Charlie",
        },
    });
    const p4 = await prisma.player.create({
        data: {
            name: "David",
        },
    });
    // ルールデータの作成
    const Rule = await prisma.rule.create({
        data: {
            name: "一局戦",
            length: 1,
            startScore: 25000,
            returnScore: 30000,
            uma1: 10,
            uma2: 30,
        },
    });
    //試合データ
    const Game1 = await prisma.game.create({
        data: { ruleId: Rule.id },
    });
    // 席情報の作成
    const playerGame1 = await prisma.playerGame.create({
        data: { seet: 0, playerId: p1.id, gameId: Game1.id },
    });
    const playerGame2 = await prisma.playerGame.create({
        data: { seet: 1, playerId: p2.id, gameId: Game1.id },
    });
    const playerGame3 = await prisma.playerGame.create({
        data: { seet: 2, playerId: p3.id, gameId: Game1.id },
    });
    const playerGame4 = await prisma.playerGame.create({
        data: { seet: 3, playerId: p4.id, gameId: Game1.id },
    });
    // 局データの作成
    const Round1 = await prisma.round.create({
        data: {
            roundNumber: 1,
            honba: 0,
            kyoutaku: 0,
            gameId: Game1.id,
            oyaId: p1.id,
        },
    });
    // const Round2 = await prisma.round.create({
    //     data: {
    //         roundNumber: 1,
    //         honba: 1,
    //         kyoutaku: 0,
    //         gameId: Game1.id,
    //     },
    // });
    // const Round3 = await prisma.round.create({
    //     data: {
    //         roundNumber: 1,
    //         honba: 2,
    //         kyoutaku: 0,
    //         gameId: Game1.id,
    //     },
    // });
    // const Round4 = await prisma.round.create({
    //     data: {
    //         roundNumber: 1,
    //         honba: 3,
    //         kyoutaku: 0,
    //         gameId: Game1.id,
    //     },
    // });

    //リザルトデータの作成
    const Data1_A = await prisma.data.create({
        data: {
            playerId: p1.id,
            scoreChange: 12000,
            state: "riichi",
            result: "tsumo",
            roundId: Round1.id,
        },
    });
    const Data1_B = await prisma.data.create({
        data: {
            playerId: p2.id,
            scoreChange: -4000,
            state: "meld",
            result: "lose",
            roundId: Round1.id,
        },
    });
    const Data1_C = await prisma.data.create({
        data: {
            playerId: p3.id,
            scoreChange: -4000,
            state: "meld",
            result: "lose",
            roundId: Round1.id,
        },
    });
    const Data1_D = await prisma.data.create({
        data: {
            playerId: p4.id,
            scoreChange: -4000,
            state: "concealed",
            result: "lose",
            roundId: Round1.id,
        },
    });
    //リザルトデータ
    const Result1 = await prisma.result.create({
        data: {
            playerId: p1.id,
            rank: 1,
            rawScore: 37000,
            scaledScore:
                37000 -
                Rule.returnScore +
                Rule.uma2 * 1000 +
                (Rule.returnScore - Rule.startScore) * 4,
            gameId: Game1.id,
        },
    });
    const Result2 = await prisma.result.create({
        data: {
            playerId: p2.id,
            rank: 2,
            rawScore: 21000,
            scaledScore:
                21000 -
                Rule.returnScore +
                (Rule.uma1 * 1000 - Rule.uma1 * 1000 - Rule.uma2 * 1000) / 3,
            gameId: Game1.id,
        },
    });
    const Result3 = await prisma.result.create({
        data: {
            playerId: p3.id,
            rank: 2,
            rawScore: 21000,
            scaledScore:
                21000 -
                Rule.returnScore +
                (Rule.uma1 * 1000 - Rule.uma1 * 1000 - Rule.uma2 * 1000) / 3,
            gameId: Game1.id,
        },
    });
    const Result4 = await prisma.result.create({
        data: {
            playerId: p4.id,
            rank: 2,
            rawScore: 21000,
            scaledScore:
                21000 -
                Rule.returnScore +
                (Rule.uma1 * 1000 - Rule.uma1 * 1000 - Rule.uma2 * 1000) / 3,
            gameId: Game1.id,
        },
    });
};

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
