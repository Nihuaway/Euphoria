import type { NextPage } from 'next';
import style from 'components/[ pages ]/shot/[ id ]/slider/images/mini/style.module.scss';
import ImageLoader from 'components/[ loaders ]/image/image';
import { genImageUrl } from 'scripts/genImageUrl';
import { IImage } from 'interfaces/models/image';

interface props{
  id: number;
  image: IImage | null | undefined;
  selected: boolean;
  func: (id: number) => void;
}

const ShotSliderMiniImage:NextPage<props> = ({id,image, selected, func}) => {
  return (
    <div className={style.item} data-selected={selected} onClick={() => func(id)}>
      <ImageLoader
        src={genImageUrl(image, '320x240')}
        layout={'fixed'}
        objectFit={'cover'}
        width={84}
        height={59}
        radius={3}
      />
    </div>
  );
};

export default ShotSliderMiniImage;