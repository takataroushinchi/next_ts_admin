import type { NextApiRequest, NextApiResponse } from "next";
import { client } from "src/lib/client";
import { Blog } from "..";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	// console.log(req.body.q);
	const data = await client.getList<Blog>({
		endpoint: 'blog',
		queries: { q: req.body.q },
	});

	// console.log(data);
	res.status(200).json(data)
};

export default handler;