type Category = {
  id: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
  name: string;
};

export type Blog = {
  id: string;
  title: string;
  content: string;
  eyecatch: {
    url: string;
    height: number;
    width: number;
  };
  done: boolean;
  category: Category[];
  createAt: string;
};

export type Blogs = {
  contents: Blog[];
};
