import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from './style.module.scss';
import ImageLoader from 'components/[ loaders ]/image/image';
import { IShot } from 'interfaces/models/shot';
import Icon, { IconVariant } from 'components/icon/icon';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import { genImageUrl } from 'scripts/genImageUrl';
import ImageRoute from 'routes/shot/imageRoute';
import UserRoute from 'routes/user/userRoute';
import ShotController from 'routes/shot/shotRoute';
import { IImage } from 'interfaces/models/image';

interface IProps {
  draftDB: IShot | null;
}

const DraftItem: NextPage<IProps> = ({ draftDB }) => {
  const router = useRouter();

  const [draft, setDraft] = useState<IShot | null>(draftDB);
  const [author, setAuthor] = useState<string | null>(null);
  const [preview, setPreview] = useState<IImage | null>(null);

  useEffect(() => {
    setAuthor(null);
    setPreview(null);
    setDraft(draftDB);

    if (!draftDB) return;
    const abort = new AbortController();

    //получение превьюшки
    const getPreview = async () =>
      await ImageRoute.get({filter: { shot: draftDB._id }, limit: 1}, abort.signal);
    getPreview().then((res) => setPreview(res.data[0]));

    //получение автора
    const getAuthor = async () =>
      await UserRoute.get({filter:{ _id: draftDB.user }, limit: 1}, abort.signal);
    getAuthor().then((res) => setAuthor(res.data[0].name));

    return () => abort.abort();
  }, [draftDB]); // полчение шота

  const remove = async () => {
    if (!draft) return;

    const res = await ShotController.remove(draft._id);
    alert(res.message);
  };

  return (
    <div className={style.draft} data-loading={!draft || !author || !preview}>
      <div
        className={style.image}
        onClick={() =>
          draft
            ? router.push({
                pathname: '/shot/upload',
                query: { id: draft._id },
              })
            : null
        }>
        <ImageLoader
          layout={'responsive'}
          objectFit={'cover'}
          src={genImageUrl(preview, '800x600')}
          width={290}
          height={216}
        />
      </div>
      <div className={style.bottom}>
        <div className={style.title}>
          <TextLoader
            font={fonts.h16}
            text={draft?.title}
            placeholder={'titlelessgdfgddgf'}
            func={() => {
              router.push(`/draft/${draft?._id}`, undefined, { shallow: true });
            }}
          />
        </div>
        <div className={style.actions}>
          <div className={style.remove} onClick={remove} data-visible={!!draft}>
            <Icon id={IconVariant.close} size={12} />
            <h5>Remove</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DraftItem;
