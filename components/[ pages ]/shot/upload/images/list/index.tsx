import type { NextPage } from 'next';
import style from './style.module.scss';
import ImageItem from 'components/[ pages ]/shot/upload/images/list/item';
import { useDispatch } from 'react-redux';
import Icon, { IconVariant } from 'components/icon/icon';
import { IImage } from 'interfaces/models/image';
import { useEffect, useRef, useState } from 'react';

interface props {
  shotID: string | undefined;
  images: (IImage | null | undefined)[];
  onAdd: (id: number, file: IImage) => void;
  onRemove: (id: number) => void;
}

const ImagePlaces: NextPage<props> = ({ images, onAdd, onRemove, shotID }) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollPos, setScrollPos] = useState(
    listRef.current ? listRef.current.scrollLeft : 0
  );
  const [isBiggerThan, setBiggerThen] = useState(false);
  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    if (!listRef.current) return;
    setBiggerThen(listRef.current.clientWidth < 666);
  }, [windowSize]);

  useEffect(() => {
    window.addEventListener('resize', () => setWindowSize(window.innerWidth));
  }, []);

  return (
    <div
      className={style.parent}
      data-right={
        listRef.current &&
        isBiggerThan &&
        scrollPos < listRef.current.scrollWidth - listRef.current.clientWidth
      }
      data-left={listRef.current && isBiggerThan && scrollPos > 0}>
      <div
        className={style.arrow}
        data-visible={listRef.current &&
          isBiggerThan &&
          scrollPos < listRef.current.scrollWidth - listRef.current.clientWidth}
        id={'right'}
        onClick={() =>
          listRef.current
            ? listRef.current.scrollTo({
              left: listRef.current.scrollWidth,
              behavior: 'smooth',
            })
            : null
        }>
        <Icon id={IconVariant.arrowRIGHT} size={14} />
      </div>
      <div
        className={style.arrow}
        data-visible={listRef.current && isBiggerThan && scrollPos > 0}
        id={'left'}
        onClick={() =>
          listRef.current
            ? listRef.current.scrollTo({
              left: 0,
              behavior: 'smooth',
            })
            : null
        }>
        <Icon id={IconVariant.arrowRIGHT} size={14} />
      </div>
      <div
        ref={listRef}
        className={style.list}
        onScroll={(e) => {
          setScrollPos(
            //@ts-ignore
            e.target.scrollLeft
          );
        }}>
        {[1, 2, 3, 4, 5, 6, 7].map((index) => {
          return (
            <ImageItem
              key={index}
              id={index}
              shotID={shotID}
              image={images[index]}
              isDisable={!images[index - 1]}
              resolution={'320x240'}
              onRemove={onRemove}
              onAdd={onAdd}>
              <div>
                <Icon
                  id={IconVariant.plus}
                  size={20}
                  color={'rgba(34,34,34,0.25)'}
                />
              </div>
            </ImageItem>
          );
        })}
      </div>
    </div>
  );
};

export default ImagePlaces;
