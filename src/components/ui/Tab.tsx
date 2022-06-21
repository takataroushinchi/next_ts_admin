import { Home, List } from '@icon-park/react';
import { FC } from 'react';
import { getPath } from 'src/lib/const/path';
import { ActiveLink } from 'src/lib/next';

const ITEMS = [
  { href: getPath('INDEX'), label: 'トップ', Icon: Home },
  { href: getPath('LIST'), label: '案件リスト', Icon: List },
];

const activeClass =
  '[&>*]:text-white flex-1 space-y-4 rounded-sm border-b-2 border-slate-600 bg-sky-700 p-4';
const normalClass =
  '[&>*]:text-sky-600 group flex-1 space-y-4 rounded-sm bg-slate-50 p-4 shadow ring-1 ring-slate-900/5 hover:bg-sky-600 hover:ring-sky-600';

export const Tab: FC = () => {
  return (
    <nav className="flex gap-x-2 pb-8">
      {ITEMS.map(({ label, href, Icon }) => (
        <ActiveLink key={label} href={href} passHref>
          {(isActive) => {
            return (
              <a className={isActive ? activeClass : normalClass}>
                <p className="text-sm font-semibold group-hover:text-slate-50">
                  <Icon className="pr-1" />
                  <span>{label}</span>
                </p>
              </a>
            );
          }}
        </ActiveLink>
      ))}
    </nav>
  );
};
