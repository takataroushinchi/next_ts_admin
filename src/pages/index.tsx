import dayjs from 'dayjs';
import { MicroCMSListResponse } from 'microcms-js-sdk';
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import MicroCMSImage from 'src/components/ui/MicroCMSImage';
import { Tab } from 'src/components/ui/Tab';
import { client } from 'src/lib/client';
import { Blog } from 'src/types/blog';

import useStore from '../store';
import { supabase } from 'src/lib/supabase';
import { Auth } from 'src/components/Auth';
import { Sign } from 'src/components/Sign';
import { useEffect } from 'react';

type Props = MicroCMSListResponse<Blog>;

const Home: NextPage<Props> = (props) => {
  const contents = props.contents;

  const session = useStore((state) => state.session);
  const setSession = useStore((state) => state.setSession);
  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession]);

  return (
    <>
      <Head>
        <title>デザイン管理画面</title>
      </Head>
      <Tab />
      <div className="flex gap-x-2 pb-8">
        <section className="mt-4 space-y-4 [&>*]:rounded-lg [&>*]:bg-white [&>*]:p-4 [&>*]:shadow">
          {contents.map((content) => {
            return (
              <div key={content.id}>
                <div className="flex flex-wrap items-center justify-between bg-gray-600 p-6">
                  <h2 className="mr-6 flex-1 font-semibold text-white">
                    {content.title}
                  </h2>
                  <time
                    className="flex-shrink-0 text-sm text-white"
                    dateTime={content.publishedAt}
                  >
                    {dayjs(content.publishedAt).format('YYYY年MM月DD日')}
                  </time>
                </div>
                <div className="flex flex-wrap items-center justify-between bg-white p-6"></div>
                <div
                  className="prose rounded-lg border p-8"
                  dangerouslySetInnerHTML={{ __html: content.content }}
                />
                {content.eyecatch && (
                  <MicroCMSImage
                    src={content.eyecatch.url}
                    width={content.eyecatch.width}
                    height={content.eyecatch.height}
                  />
                )}
              </div>
            );
          })}
        </section>
        {!session ? <Auth /> : <Sign />}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.getList<Blog>({
    endpoint: 'blogs',
    queries: { offset: 0, limit: 100 },
  });
  // .then((res) => console.log(res))
  // .catch((err) => console.log(err));

  return {
    props: data,
  };
};

export default Home;
