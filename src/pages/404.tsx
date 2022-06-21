import Head from 'next/head';
import Image from 'next/image';
import { FC } from 'react';
import { ErrorLayout } from 'src/layout';
import error from '../../public/error.png';

const Custom404: FC = () => {
  return (
    <ErrorLayout>
      <Head>
        <title>
          このページは移動しました。記事は、一覧ページから見ることができます。
        </title>
      </Head>
      <p>
        このページは移動しました。記事は、一覧ページから見ることができます。
      </p>
      <Image
        src={error}
        width={1440}
        height={832}
        alt="404：このページは移動しました"
      />
    </ErrorLayout>
  );
};

export default Custom404;
