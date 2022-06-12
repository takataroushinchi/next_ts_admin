import Image, { ImageProps } from 'next/image';
import React from 'react';

type Props = Omit<ImageProps, 'src' | 'width' | 'height' | 'layout'> & {
  src: string;
  width: number;
  height: number;
  layout?: 'fixed' | 'intrinsic' | 'responsive';
};

const MicroCMSImage: React.VFC<Props> = ({
  src,
  layout,
  alt,
  ...imageProps
}) => (
  <Image
    {...imageProps}
    src={src}
    layout={layout ?? 'responsive'}
    placeholder="blur"
    blurDataURL={`${src}?auto=compress&w=10`}
    alt={alt}
  />
);

export default MicroCMSImage;
