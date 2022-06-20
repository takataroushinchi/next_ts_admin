import { FC } from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
  text: string;
};

export const MarkdownField: FC<Props> = ({ text }) => {
  return (
    <ReactMarkdown
      // eslint-disable-next-line react/no-children-prop
      children={text}
      components={{
        code({ node, inline, className, children, ...props }) {
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />
  );
};
