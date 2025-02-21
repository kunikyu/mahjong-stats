# 麻雀統計管理アプリ

## 概要

麻雀の統計を管理するアプリです。プレイヤーの成績を記録し、試合のデータを統計的に分析することを目的としています。麻雀を楽しむプレイヤーや、対局の傾向を把握したい人を想定したアプリです。

### 開発の背景・経緯

私自身が麻雀をたしなむ中で、対局の統計を簡単に記録・分析したいと考え、開発を開始しました。試合結果の可視化やデータ分析を通じて、プレイヤーが自分のプレースタイルを理解しやすくすることを目指しています。

### 公開URL

[mahjong-stats-kunikyu.vercel.app](https://mahjong-stats-kunikyu.vercel.app/)

## 特徴と機能の説明

### 主要機能

1. **プレイヤー・ルールの登録**

    - 事前に登録したプレイヤーとルールを選択し、試合を管理。

2. **試合結果の記録**

    - 局ごとにスコアを自動計算し、成績を記録。

3. **統計の表示** (今後実装予定)
    - プレイヤーごとの成績や試合の分析データを可視化。

### スクリーンショット

#### ルールの登録画面

![ルール登録画面](https://scrapbox.io/files/67b8833cb3f05d212961fc08.png)

#### 試合の登録画面

![試合登録画面](https://scrapbox.io/files/67b88339494d9a1566f6fcec.png)

#### 局ごとの結果記録画面

![局ごとの結果記録画面](https://scrapbox.io/files/67b88332fbecec07b2168a02.png)

![局ごとの結果記録画面](https://scrapbox.io/files/67b883351182b3aa6145cdf7.png)

点数変動は自動計算です。

## 使用技術 (技術スタック)

### 言語・フレームワーク

- TypeScript
- React 18
- Next.js 14
- Prisma

### 主要ライブラリ

- Tailwind CSS
- Tailwind Merge
- dayjs

### インフラ・ツール

- Vercel (デプロイ)
- Supabase (データベース・バックエンド)
- VSCode (エディタ)

## 開発期間・体制

- **開発体制:** 個人開発
- **開発期間:** 2025.2 ~ 2025.2 (約40時間)

## 工夫した点・苦労した点

- **スコア自動計算機能の実装**
    - 局ごとのスコア計算を自動化するために、計算ロジックを設計。
- **リアルタイムデータ更新**
    - Supabaseを利用し、データの即時更新を可能に。
- **データ型、スキーマの定義**
    - 麻雀の統計を計算しやすいスキーマを設計。

## 今後の課題

現在、開発段階で未実装の機能やAPI複数ある状況である。
次に示す主要なAPIや機能を今年度中に実装することを目指す。
また、太字にしている**試合結果の記録APIの実装**と**登録済み試合データの一覧表示**は2月中の実装を目指す。

### 改良・改善予定

- **試合結果の記録APIの実装**
- **登録済み試合データの一覧表示**
- 局ごとの結果の修正機能
- 統計データの可視化

<!-- This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details. -->
