import { Input, Select, Switch } from '@mantine/core';
import { MicroCMSListResponse } from 'microcms-js-sdk';
import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { ComponentProps, useState } from 'react';
import { client } from 'src/lib/client';
import { Button } from 'src/lib/mantine';
import { Post } from 'src/types/post';
import { Button as MantineButton } from '@mantine/core';

type Props = MicroCMSListResponse<Post>;

const Home: NextPage<Props> = (props) => {
  const [search, setSearch] = useState<MicroCMSListResponse<Post>>();
  const [excludeDone, setExcludeDone] = useState(false);
  const [targetValue, setTargetValue] = useState('-');

  const targetList: string[] = [];
  props.contents.forEach((item) => {
    if (item.target.length !== 0) {
      targetList.push(item.target[0]);
    }
  });
  targetList.sort().reverse().unshift('-');
  const targets = Array.from(new Set(targetList));

  const handleSubmit: ComponentProps<'form'>['onSubmit'] = async (event) => {
    event.preventDefault();
    const q = event.currentTarget.query.value;
    // console.log(event.currentTarget.target.value);
    let filters = excludeDone ? 'done[equals]false' : '';
    if (targetValue !== '-') {
      filters =
        filters === ''
          ? `target[contains]${targetValue}`
          : `${filters}[and]target[contains]${targetValue}`;
    }

    // [and]target[contains]202206

    const data = await fetch('/api/search', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ q, filters }),
    });
    const json: MicroCMSListResponse<Post> = await data.json();
    setSearch(json);
  };

  const handleClick: ComponentProps<'button'>['onClick'] = () => {
    setSearch(undefined);
    setExcludeDone(false);
    setTargetValue('-');
  };

  const contents = search ? search.contents : props.contents;
  const totalCount = search ? search.totalCount : props.totalCount;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-x-2">
          <Input
            type="search"
            name="query"
            className="px-2"
            placeholder="キーワードを入力"
          />
          <Select
            value={targetValue}
            name="target"
            className="w-24"
            onChange={(event) => {
              if (!event) return;
              setTargetValue(event);
            }}
            data={targets}
          />
          <Button
            type="submit"
            color="gray"
            className="hover:enabled:bg-sky-400 border border-sky-600 bg-sky-600 px-2 disabled:opacity-75"
          >
            検索
          </Button>
          <Button
            type="reset"
            className="hover:enabled:bg-gray-400 border border-gray-600 bg-gray-600 px-2 disabled:opacity-75"
            onClick={handleClick}
          >
            リセット
          </Button>
          <Switch
            size="sm"
            label="完了除外"
            onLabel=""
            offLabel=""
            classNames={{
              label: 'absolute -bottom-2 text-[10px] px-0 whitespace-nowrap',
            }}
            className="relative -top-2 left-1"
            checked={excludeDone}
            onChange={(event) => setExcludeDone(event.currentTarget.checked)}
          />
        </div>
      </form>
      <p className="text-xm p-2">{`${
        search ? '検索結果' : '記事の総数'
      }:${totalCount}`}</p>
      <ul className="[&>*]:p-4 [&>*]:bg-white [&>*]:rounded-lg [&>*]:shadow mt-4 space-y-4">
        {contents.map((content) => {
          return (
            <li key={content.id}>
              <Link href={`/post/${content.id}`}>
                <a className="group mx-auto block space-y-3 rounded-lg bg-white p-6 shadow ring-1 ring-slate-900/5 hover:bg-sky-700 hover:ring-sky-500">
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-white">
                    {content.title}
                  </p>
                  <p className="text-sm text-slate-500 group-hover:text-white">
                    {content.caption}
                  </p>
                  {content.target && (
                    <p className="text-sm font-semibold text-slate-500 group-hover:text-white">
                      ターゲット：{content.target[0]}
                    </p>
                  )}
                  {content.done && (
                    <p className="text-sm font-semibold text-slate-500 group-hover:text-white">
                      完了
                    </p>
                  )}
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
  const data = await client.getList<Post>({
    endpoint: 'post',
    queries: { fields: 'id,title,caption,target,done', offset: 0, limit: 100 },
  });
  // .then((res) => console.log(res))
  // .catch((err) => console.log(err));

  return {
    props: data,
  };
};

export default Home;
