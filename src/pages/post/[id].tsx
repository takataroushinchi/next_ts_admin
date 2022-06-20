import dayjs from 'dayjs';
import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { client } from 'src/lib/client';
import MicroCMSImage from 'src/components/ui/MicroCMSImage';
import { Post } from 'src/types/post';
import { MarkdownField } from 'src/components/ui/MarkdownField';
import Head from 'next/head';
import { Anchor, Breadcrumbs, Space } from '@mantine/core';
import Link from 'next/link';
import { getPath } from 'src/lib/const/path';

type Props = Post & MicroCMSContentId & MicroCMSDate;

const PostId: NextPage<Props> = (props) => {
  const items = [
    { title: 'トップ', href: `${getPath('INDEX')}` },
    { title: '案件リスト', href: `${getPath('LIST')}` },
    { title: `${props.title}`, href: '' },
  ].map((item, index) =>
    item.href !== '' ? (
      <Link href={item.href} key={index} passHref>
        <Anchor>{item.title}</Anchor>
      </Link>
    ) : (
      <Anchor underline={false} color="dimmed" weight="bold" key={index}>
        {item.title}
      </Anchor>
    )
  );

  return (
    <>
      <Head>
        <title>{props.title}</title>
      </Head>
      <Breadcrumbs separator="/">{items}</Breadcrumbs>
      <Space h="md" />
      <div className="flex flex-wrap items-center justify-between bg-gray-600 p-6">
        <h2 className="mr-6 flex-1 font-semibold text-white">{props.title}</h2>
        <time
          className="flex-shrink-0 text-sm text-white"
          dateTime={props.publishedAt}
        >
          {dayjs(props.publishedAt).format('YYYY年MM月DD日')}
        </time>
      </div>
      <div className="flex flex-wrap items-center justify-between bg-white p-6">
        {props.target && (
          <p className="text-sm font-semibold text-slate-500">
            ターゲット：{props.target[0]}
          </p>
        )}
        {props.done && (
          <p className="text-sm font-semibold text-slate-500">完了</p>
        )}
      </div>
      <div
        className="prose rounded-lg border p-8"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
      <div>
        {props.topic?.map((topic, id) => (
          <div key={id}>
            {topic.fieldId === 'tech' && (
              <div className="my-2 flex flex-wrap items-center justify-between bg-gray-500 p-4">
                <h3 className="mr-6 flex-1 text-white">技術</h3>
                <p className="flex-shrink-0 text-sm text-white">
                  {topic.title}
                </p>
              </div>
            )}
            {topic.fieldId === 'note' && (
              <div className="my-2 flex flex-wrap items-center justify-between bg-gray-500 p-4">
                <h3 className="mr-6 flex-1 text-white">備考</h3>
                <p className="flex-shrink-0 text-sm text-white">
                  {topic.title}
                </p>
              </div>
            )}
            <div className="rounded-lg border p-8">
              {topic.body.map((body, index) => {
                return body.fieldId === 'richeditor' ? (
                  <div
                    key={index}
                    className="prose lg:prose-sm"
                    dangerouslySetInnerHTML={{ __html: body.richText }}
                  />
                ) : body.fieldId === 'markdown' ? (
                  <div key={index} className="prose lg:prose-sm">
                    <MarkdownField text={body.markdownText} />
                  </div>
                ) : body.fieldId === 'richlink' ? (
                  <div key={index}>
                    {body.title && <a href={body.url}>{body.title}</a>}
                    {body.image && (
                      <MicroCMSImage
                        src={body.image.url}
                        width={body.image.width}
                        height={body.image.height}
                      />
                    )}
                  </div>
                ) : null;
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  // const data = await client.getList({ endpoint: 'post' });
  // const ids = data.contents.map((content) => `/post/${content.id}`);

  return {
    // ==SG==
    // paths: ids,
    // fallback: false,
    // ==ISR==
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (
  ctx
) => {
  if (!ctx.params) {
    return {
      notFound: true,
    };
  }

  const data = await client.getListDetail<Post>({
    endpoint: 'post',
    contentId: ctx.params.id,
  });

  return {
    props: data,
    revalidate: 10,
  };
};

export default PostId;
