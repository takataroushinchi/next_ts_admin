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
      <h1>{props.title}</h1>
      <time dateTime={props.publishedAt}>
        {dayjs(props.publishedAt).format('YYYY年MM月DD日')}
      </time>
      {props.done && (
        <p className="text-sm font-semibold text-slate-500">完了</p>
      )}
      <div
        className="prose lg:prose-sm"
        dangerouslySetInnerHTML={{ __html: props.body }}
      />
      <div>
        {props.topic?.map((topic, id) => (
          <div key={id}>
            {topic.fieldId === 'tech' && (
              <div>
                <h3>{topic.title}</h3>
                <div>
                  {topic.body.map((body, index) => {
                    return body.fieldId === 'richeditor' ? (
                      <div
                        key={index}
                        className="prose lg:prose-sm"
                        dangerouslySetInnerHTML={{ __html: body.richText }}
                      />
                    ) : body.fieldId === 'markdown' ? (
                      <div key={index} className="border p-8">
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
            )}
            {topic.fieldId === 'note' && (
              <div>
                <h3>{topic.title}</h3>
                <div>
                  {topic.body.map((body, index) => {
                    return body.fieldId === 'richeditor' ? (
                      <div
                        key={index}
                        className="prose lg:prose-sm"
                        dangerouslySetInnerHTML={{ __html: body.richText }}
                      />
                    ) : body.fieldId === 'markdown' ? (
                      <div key={index} className="border p-8">
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
            )}
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
