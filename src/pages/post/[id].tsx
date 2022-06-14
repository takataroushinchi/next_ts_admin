import dayjs from 'dayjs';
import { MicroCMSContentId, MicroCMSDate } from 'microcms-js-sdk';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { client } from 'src/lib/client';
import MicroCMSImage from 'src/components/ui/MicroCMSImage';
import { Post } from 'src/types/post';
import { MarkdownField } from 'src/components/ui/MarkdownField';

type Props = Post & MicroCMSContentId & MicroCMSDate;

const PostId: NextPage<Props> = (props) => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between bg-gray-600 p-6">
        <h2 className="mr-6 flex-shrink-0 text-white">{props.title}</h2>
        <time className="flex-shrink-0 text-white" dateTime={props.publishedAt}>
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
        className="prose border p-8 lg:prose-sm"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
      <div>
        {props.topic?.map((topic, id) => (
          <div key={id}>
            {topic.fieldId === 'tech' && (
              <div className="my-2 flex flex-wrap items-center justify-between bg-gray-500 p-4">
                <h3 className="mr-6 flex-shrink-0 text-white">技術</h3>
                <p className="flex-shrink-0 text-white">{topic.title}</p>
              </div>
            )}
            {topic.fieldId === 'note' && (
              <div className="my-2 flex flex-wrap items-center justify-between bg-gray-500 p-4">
                <h3 className="mr-6 flex-shrink-0 text-white">備考</h3>
                <p className="flex-shrink-0 text-white">{topic.title}</p>
              </div>
            )}
            <div className="border p-8">
              {topic.body.map((body, index) => {
                return body.fieldId === 'richeditor' ? (
                  <div
                    key={index}
                    className="prose lg:prose-sm"
                    dangerouslySetInnerHTML={{ __html: body.richText }}
                  />
                ) : body.fieldId === 'markdown' ? (
                  <div key={index}>
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
    </div>
  );
};

export const getStaticPaths: GetStaticPaths<{ id: string }> = async () => {
  const data = await client.getList({ endpoint: 'post' });
  const ids = data.contents.map((content) => `/post/${content.id}`);

  return {
    paths: ids,
    fallback: false,
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
  };
};

export default PostId;
