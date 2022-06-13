type Body = {
  fieldId: 'richlink' | 'markdown' | 'richeditor';
  // richeditor
  richText: string;
  // richlink
  title: string;
  url: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
  // markdown
  markdownText: string;
};

type Topic = {
  fieldId: 'tech' | 'note';
  title: string;
  body: Body[];
};

export type Post = {
  id: string;
  title: string;
  caption: string;
  body: string;
  target: string[];
  done: boolean;
  topic: Topic[];
  createAt: string;
};

export type Posts = {
  contents: Post[];
};
