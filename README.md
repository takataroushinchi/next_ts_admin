# ドキュメント管理画面

## フロント技術スタック

- Next.js + TypeScript + ESLint + Prettier
  - https://nextjs.org/
- Tailwind CSS
  - https://tailwindcss.com/
- Mantine
  - https://mantine.dev/
- Vercel
  - https://vercel.com/
- microCMS
  - https://microcms.io/

## フロント技術スタック忘備録

- TanStack (React, React Location, React Query, etc…)
- Next.js or Remix
- UI
  - Tailwind CSS + Mantine（現時点で本命）
  - Tailwind CSS + Headless UI/Radix UI + 他必要になったのを外部パッケージで調達
  - Tailwind CSS + Supabase UI + 他必要になったのを外部パッケージで調達
  - Semi Design (+ Tailwind CSS?)
  - Ant Design or Rsuite or MUI（個人的にあまり好きではない）

## Deploy Hooks を使って記事更新時に自動デプロイ

Vercel → Settings → Git → Deploy Hooks → Create Hook (名称：microCMS, main)
microCMS on main の URL をコピー

microCMS → API 設定 → Webhook → 追加 → カスタム通知 → Vercel から発行された URL を貼る → 設定完了

## デザイン

- Mantine UI Component Library
  - https://www.figma.com/community/file/1067173247578645134
