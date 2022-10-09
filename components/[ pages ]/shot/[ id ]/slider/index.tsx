import type { NextPage } from 'next';
import style from 'components/[ pages ]/shot/[ id ]/slider/style.module.scss';
import React, { useEffect, useState } from 'react';
import ImageRoute from 'routes/shot/imageRoute';
import {IShot } from 'interfaces/models/shot';
import Item from 'components/[ pages ]/shot/[ id ]/slider/images/mini';
import ShotSliderMainImage from 'components/[ pages ]/shot/[ id ]/slider/images/main';
import { IImage, IPalette } from 'interfaces/models/image';

interface props {
  shot: IShot | null;
}

const ShotSlider: NextPage<props> = ({ shot }) => {
  const [selected, setSelected] = useState<number>(0);
  const [images, setImages] = useState<(IImage | null)[]>([null]);
  const [palettes, setPalettes] = useState<IPalette[]>([]);

  useEffect(() => {
    setSelected(0);
    setImages([null]);
    setPalettes([]);
    const abort = new AbortController();
    if (!shot) return;
    //установка картинок
    const getPreviews = async () =>
      await ImageRoute.get({filter:{ shot: shot._id }}, abort.signal);
    getPreviews().then((res) => setImages(res.data));
    return () => abort.abort();
  }, [shot]);

  useEffect(() => {
    if (!images) return;
    const abort = new AbortController();
    const getPalettes = async () =>
      await ImageRoute.getPalette(
        {
          image: {
            $in: images.map((ima) => {
              if(ima) return ima._id;
            }),
          },
        },
        null, abort.signal
      );
    getPalettes().then((res) => setPalettes(res.data));
    return () => abort.abort();
  }, [images]);

  return (
    <div className={style.imagesBlock}>
      <div className={style.main}>
        {images.map((image, index) => (
          <ShotSliderMainImage
            index={index}
            image={image}
            palette={palettes[index]}
            onClick={(index) => setSelected(index)}
            key={index}
            selID={selected}
          />
        ))}
      </div>
      <div className={style.list}>
        {images[0] ? images.length > 1 ? images.map((image, index) => (
            <Item
              key={index}
              id={index}
              image={image}
              selected={selected === index}
              func={(e) => setSelected(e)}
            />
          )) : null : [0,1,2,3,4].map((index) => (
          <Item
            key={index}
            id={index}
            image={null}
            selected={false}
            func={(e) => setSelected(e)}
          />
        ))}
      </div>
    </div>
  );
};

export default ShotSlider;
