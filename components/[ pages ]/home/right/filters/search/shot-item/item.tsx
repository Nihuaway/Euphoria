import { FC, useEffect, useState } from 'react';
import style from 'components/[ pages ]/home/right/filters/search/shot-item/style.module.scss';
import ImageLoader from 'components/[ loaders ]/image/image';
import { IShot } from 'interfaces/models/shot';
import TextLoader, { fills, fonts } from 'components/[ loaders ]/text/text';
import { useRouter } from 'next/router';
import ImageRoute from 'routes/shot/imageRoute';
import { genImageUrl } from 'scripts/genImageUrl';
import UserRoute from 'routes/user/userRoute';
import { IImage } from 'interfaces/models/image';

interface props {
  shot: IShot | null;
}

const ShotItem: FC<props> = ({ shot }) => {
  const router = useRouter();
  const [image, setImage] = useState<IImage | null | undefined>(undefined);
  const [author, setAuthor] = useState<string | null>(null);

  useEffect(() => {
    if (!shot) return;
    const abort = new AbortController();
    const getPreview = async () =>
      await ImageRoute.get(
        { filter: { shot: shot._id }, limit: 1 },
        abort.signal
      );
    const getAuthor = async () =>
      await UserRoute.get(
        { filter: { _id: shot.user }, limit: 1 },
        abort.signal
      );

    getPreview().then((res) => setImage(res.data[0]));
    getAuthor().then((res) => setAuthor(res.data[0].name));
  }, [shot]);

  return (
    <div
      className={style.item}
      onClick={async () => {
        if (!shot) return;
        await router.push(`http://localhost:3000/shot/${shot._id}`);
      }}>
      <div>
        <ImageLoader
          negative={true}
          height={55}
          width={74}
          radius={4}
          src={genImageUrl(image, '320x240')}
          layout={'fixed'}
          objectFit={'cover'}
        />
      </div>
      <div className={style.content}>
        <div className={style.title}>
          <TextLoader
            font={fonts.h14}
            text={shot?.title}
            placeholder={'gjidfgerig5675j'}
            fill={fills.night}
          />
          <TextLoader
            font={fonts.h12}
            text={author}
            fill={fills.night}
            placeholder={'author...'}
          />
        </div>
      </div>
    </div>
  );
};

export default ShotItem;
