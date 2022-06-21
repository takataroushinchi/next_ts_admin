import { FC } from 'react';

type Props = {
  children: React.ReactNode;
};

const Header = () => {
  return <div>ヘッダー</div>;
};

const Footer = () => {
  return <div>フッター</div>;
};

const SideBar = () => {
  return <div>サイドバー</div>;
};

export const ErrorLayout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="bg-slate-200 p-4">
        <div className="flex bg-white p-2">
          <main className="flex-1 border">{children}</main>
          <SideBar />
        </div>
      </div>
      <Footer />
    </div>
  );
};
