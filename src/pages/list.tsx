import { Search } from '@icon-park/react';
import { Input, Select, Switch } from '@mantine/core';
import { MicroCMSListResponse } from 'microcms-js-sdk';
import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { ComponentProps, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Tab } from 'src/components/ui/Tab';
import { client } from 'src/lib/client';
import { getPath } from 'src/lib/const/path';
import { Button } from 'src/lib/mantine';
import { Post } from 'src/types/post';

type Props = MicroCMSListResponse<Post>;

const List: NextPage<Props> = (props) => {
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

  const [cookies, setCookie] = useCookies([`done#cookie`]);

  useEffect(() => {
    if (cookies[`done#cookie`] === 'on') {
      setExcludeDone(true);
    } else {
      setExcludeDone(false);
    }
  }, []);

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

  const handleReset: ComponentProps<'button'>['onClick'] = () => {
    setSearch(undefined);
    setExcludeDone(false);
    setCookie(`done#cookie`, 'off');
    setTargetValue('-');
  };

  const handleSwitch = (checked: boolean) => {
    setExcludeDone(checked);
    checked ? setCookie(`done#cookie`, 'on') : setCookie(`done#cookie`, 'off');
  };

  const contents = search ? search.contents : props.contents;
  const totalCount = search ? search.totalCount : props.totalCount;

  return (
    <>
      <Head>
        <title>案件リスト</title>
      </Head>
      <Tab current={'list'} />
      <form onSubmit={handleSubmit}>
        <div className="flex gap-x-2">
          <Input
            icon={<Search theme="outline" size="16" fill="#999" />}
            type="search"
            name="query"
            className="pr-2"
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
            onClick={handleReset}
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
            onChange={(event) => handleSwitch(event.currentTarget.checked)}
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
              <Link href={`${getPath('POST', content.id)}`}>
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
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const filters =
    context.req.cookies['done#cookie'] === 'on' ? 'done[equals]false' : '';
  const data = await client.getList<Post>({
    endpoint: 'post',
    queries: {
      fields: 'id,title,caption,target,done',
      offset: 0,
      limit: 100,
      filters,
    },
  });

  return {
    props: data,
  };
};

export default List;
