import type { NextPage } from 'next';
import style from 'components/[ pages ]/shot/[ id ]/slider/images/main/style.module.scss';
import ImageLoader from 'components/[ loaders ]/image/image';
import { genImageUrl } from 'scripts/genImageUrl';
import Icon, { IconVariant } from 'components/icon/icon';
import React, { useState } from 'react';
import Palette from 'components/[ pages ]/shot/[ id ]/slider/images/main/palette';
import ShotSliderMainItemPalette from 'components/[ pages ]/shot/[ id ]/slider/images/main/palette';
import { IImage, IPalette } from 'interfaces/models/image';

interface props{
  index: number;
  image: IImage | null;
  palette: IPalette | null;
  selID: number;

  onClick: (index: number) => void;
}

const ShotSliderMainImage: NextPage<props> = ({index, image,palette, selID, onClick}) => {
  const [isRendered, setRendered] =useState(!image);

  return (
    <div
      data-scrolled={index - selID < 0}
      data-far={index - selID > 2}
      data-rendered={isRendered}
      className={style.item}
      style={{
        left:
          index - selID < 2
            ? index - selID < 0
              ? '0px'
              : 16 * (index - selID) -
                (index - selID) * (index - selID) * (index - selID) +
                'px'
            : 16 * 2 - 8 + 'px',
        zIndex: 8 - index,
        transform: `translateX(${index - selID < 0 ? -40 : 0}px) scale(${
          1 - (index - selID < 0 ? -1 : index - selID) / 20
        })`,
      }}
      key={index}

      onClick={() => onClick(index)}>
      <ImageLoader
        src={genImageUrl(image, '1200x900')}
        layout={'fixed'}
        objectFit={'cover'}
        width={850}
        height={633}
        radius={5}
        onRendered={() => setRendered(true)}
      />
      <ShotSliderMainItemPalette palette={palette} />
    </div>
  );
};

export default ShotSliderMainImage;