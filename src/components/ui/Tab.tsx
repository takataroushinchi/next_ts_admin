import Link from 'next/link';

type Props = {
  current: string;
};

export const Tab: React.VFC<Props> = ({ current }) => {
  return current === 'top' ? (
    <nav className="flex gap-x-2 pb-8">
      <a className="flex-1 space-y-4 rounded-sm border-b-2 border-slate-600 bg-sky-700 p-4">
        <p className="text-sm font-semibold text-slate-200">トップ</p>
      </a>
      <Link href={`/list`}>
        <a className="group flex-1 space-y-4 rounded-sm bg-slate-50 p-4 shadow ring-1 ring-slate-900/5 hover:bg-sky-600 hover:ring-sky-600">
          <p className="group-hover:text-bg-sky-600 text-sm font-semibold text-sky-600 group-hover:text-slate-50">
            案件リスト
          </p>
        </a>
      </Link>
    </nav>
  ) : (
    <nav className="flex gap-x-2 pb-8">
      <Link href={`/`}>
        <a className="group flex-1 space-y-4 rounded-sm bg-slate-50 p-4 shadow ring-1 ring-slate-900/5 hover:bg-sky-600 hover:ring-sky-600">
          <p className="group-hover:text-bg-sky-600 text-sm font-semibold text-sky-600 group-hover:text-slate-50">
            トップ
          </p>
        </a>
      </Link>
      <a className="flex-1 space-y-4 rounded-sm border-b-2 border-slate-600 bg-sky-700 p-4">
        <p className="text-sm font-semibold text-slate-200">案件リスト</p>
      </a>
    </nav>
  );
};
