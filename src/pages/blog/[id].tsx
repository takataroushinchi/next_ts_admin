import dayjs from "dayjs";
import { MicroCMSContentId, MicroCMSDate } from "microcms-js-sdk";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "src/lib/client";
import { Blog } from "..";

type Props = Blog & MicroCMSContentId & MicroCMSDate;

const BlogId:NextPage<Props> = (props) => {
	return (
		<div>
			<h1>{props.title}</h1>
			<time dateTime={props.publishedAt}>{dayjs(props.publishedAt).format('YYYY年MM月DD日')}</time>
			<div className="prose lg:prose-sm" dangerouslySetInnerHTML={{ __html: props.body }} />
		</div>
	)
}

export const getStaticPaths: GetStaticPaths<{ id: string; }> = async () => {

	const data = await client.getList({ endpoint: 'blog', });
	const ids = data.contents.map((content) => `/blog/${content.id}`);

  return {
		paths: ids,
		fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, { id: string }> = async (ctx) => {
	if (!ctx.params) {
		return {
			notFound: true,
		}
	}

	const data = await client.getListDetail<Blog>({ endpoint: "blog", contentId: ctx.params.id })

	return {
		props: data,
	}

}

export default BlogId;
