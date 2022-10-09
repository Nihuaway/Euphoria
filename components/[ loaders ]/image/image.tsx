import style from './style.module.scss';
import Image from 'next/image';
import { FC, useEffect, useState } from 'react';
import Loading from '../animation/Loading';
import { Property } from 'csstype';
import ObjectFit = Property.ObjectFit;

interface ImageProps {
  src: string | null | undefined;
  width?: number;
  height?: number;
  negative?: boolean;
  layout?: 'fixed' | 'intrinsic' | 'fill' | 'responsive';
  objectFit?: ObjectFit;

  radius?: number;
  onClick?: () => void;
  onRendered?: () => void;
}

const ImageLoader: FC<ImageProps> = ({
  src,
  layout,
  objectFit,
  width,
  radius,
  height,
  onClick = () => {},
  onRendered = () => {},
  negative,
}) => {
  const [isLoading, setLoading] = useState(true);
  const [isEmpty, setEmpty] = useState(false);

  useEffect(() => {
    if (src) {
      setEmpty(false);
      setLoading(true);
    } else {
      setEmpty(true);
      // setLoading(false);
    }
  }, [src]);

  return (
    <div
      className={style.placeholder}
      data-loading={isLoading}
      data-negative={!!negative}
      data-empty={isEmpty}
      onClick={onClick}
      style={{
        display: layout === 'fixed' ? 'flex' : 'block',
        borderRadius: radius ? radius + 'px' : undefined,
      }}>
      {/*<Loading process={isLoading && !isEmpty} negative={!!negative} />*/}
      <Image
        src={src && src !== 'empty' ? src : '/load.png'}
        objectFit={objectFit}
        layout={layout}
        width={width}
        loading={'lazy'}
        height={height}
        onLoad={(e) => {
          if (
            // @ts-ignore
            e.target.src.indexOf('load.png') < 0 &&
            // @ts-ignore
            e.target.src.indexOf('data:image/gif;base64') < 0
          ) {
            // @ts-ignore
            const imageInfo = src.split('/');
            // @ts-ignore
            if (e.target.src.includes(imageInfo[imageInfo.length - 2])) {
              setLoading(false);
              onRendered();
            }
          }
        }}
      />
    </div>
  );
};

export default ImageLoader;
