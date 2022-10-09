import type { NextPage } from 'next';
import style from './style.module.scss';
import ImageItem from 'components/[ pages ]/shot/upload/images/list/item';
import { IImage } from 'interfaces/models/image';
import { useEffect } from 'react';

interface props {
  shotID: string | undefined;
  image: IImage | null | undefined;
  onAdd: (id: number, file: IImage) => void;
  onRemove: (id: number) => void;
}

const ImagePlace: NextPage<props> = ({ shotID, image, onAdd, onRemove }) => {
  return (
    <div>
      <ImageItem
        key={0}
        image={image}
        id={0}
        shotID={shotID}
        isDisable={false}
        resolution={'1600x1200'}
        onAdd={onAdd}
        onRemove={onRemove}>
        <div className={style.info}>
          <img src="/upload.png" alt="" width={100} height={100} />
          <div className={style.title}>
            <h3>Drag and drop an image, or Browse</h3>
            <h4>
              1600x1200 or higher recommended. Max 10MB each (20MB for videos)
            </h4>
          </div>
          <hr />
          <div className={style.rules}>
            <ul>
              <li>
                <h5>High resolution images (png, jpg, gif)</h5>
              </li>
              <li>
                <h5>Animated gifs (4:3, 800x600 - 1600x1200)</h5>
              </li>
            </ul>
            <ul>
              <li>
                <h5>Videos (mp4, 4:3, 60 secs)</h5>
              </li>
              <li>
                <h5>Only upload media you own the rights to</h5>
              </li>
            </ul>
          </div>
        </div>
      </ImageItem>
    </div>
  );
};

export default ImagePlace;
