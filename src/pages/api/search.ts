import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from 'src/lib/client';
import { Post } from 'src/types/post';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // console.log(req.body.q);
  const data = await client.getList<Post>({
    endpoint: 'post',
    queries: {
      q: req.body.q,
      filters: req.body.filters,
      fields: 'id,title,caption,target,done',
      offset: 0,
      limit: 100,
    },
  });

  // console.log(data);
  res.status(200).json(data);
};

export default handler;
