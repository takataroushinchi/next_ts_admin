import { MicroCMSListResponse } from 'microcms-js-sdk';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { ComponentProps, useState } from 'react';
import { client } from 'src/lib/client';
import { Button } from 'src/lib/mantine';

export type Blog = {
  title: string;
  body: string;
};

type Props = MicroCMSListResponse<Blog>;

const Home: NextPage<Props> = (props) => {
  const [search, setSearch] = useState<MicroCMSListResponse<Blog>>();

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = async (event) => {
    event.preventDefault();
    const q = event.currentTarget.query.value;

    const data = await fetch('/api/search', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ q }),
    });
    const json: MicroCMSListResponse<Blog> = await data.json();
    setSearch(json);
  };

  const handleClick: ComponentProps<'button'>['onClick'] = () => {
    setSearch(undefined);
  };

  const contents = search ? search.contents : props.contents;
  const totalCount = search ? search.totalCount : props.totalCount;

  return (
    <div>
      <form className="flex gap-x-2" onSubmit={handleSubmit}>
        <input
          type="search"
          name="query"
          className="border border-black px-2"
        />
        <Button type="submit" color="gray" className="border border-black px-2">
          検索
        </Button>
        <button
          type="reset"
          className="hover:enabled:bg-gray-50 border border-black bg-gray-200 px-2 disabled:opacity-75"
          onClick={handleClick}
        >
          リセット
        </button>
      </form>
      <p>{`${search ? '検索結果' : '記事の総数'}：${totalCount}`}</p>
      <ul className="[&>*]:p-4 [&>*]:bg-white [&>*]:rounded-lg [&>*]:shadow mt-4 space-y-4">
        {contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`/blog/${content.id}`}>
                <a className="text-xl text-blue-800 underline hover:text-blue-400">
                  {content.title}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data = await client.getList<Blog>({ endpoint: 'blog' });
  // .then((res) => console.log(res))
  // .catch((err) => console.log(err));

  return {
    props: data,
  };
};

export default Home;
