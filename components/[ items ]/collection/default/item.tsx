import type { NextPage } from 'next';
import style from 'components/[ items ]/collection/default/style.module.scss';
import ImageLoader from 'components/[ loaders ]/image/image';
import { ICollection, ISave } from 'interfaces/models/collection';
import { useEffect, useState } from 'react';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import { useRouter } from 'next/router';
import { genImageUrl } from 'scripts/genImageUrl';
import ImageRoute from 'routes/shot/imageRoute';
import ShotRoute from 'routes/shot/shotRoute';
import { IShot } from 'interfaces/models/shot';
import { IImage } from 'interfaces/models/image';
import CollectionRoute from 'routes/collectionRoute';

interface props {
  collectionDB: ICollection;
}

const Item: NextPage<props> = ({ collectionDB }) => {
  const router = useRouter();

  const [previews, setPreviews] = useState<(IImage | null)[]>([
    null,
    null,
    null,
    null,
  ]);
  const [collection, setCollection] = useState<ICollection>(collectionDB);
  const [authors, setAuthors] = useState<string[] | null>(null);
  const [saves, setSaves] = useState<ISave[] | null>(null);

  useEffect(() => {
    setCollection(collectionDB);
  }, [collectionDB]); // полчение шота

  useEffect(() => {
    setPreviews([null, null, null, null]);
    setAuthors(null);
    if (!saves || saves.length === 0) return;
    const abort = new AbortController();

    const getShots = async () =>
      await ShotRoute.get(
        {
          filter: {
            _id: {
              $in: saves.map((save) => save.shot),
            },
            isDraft: false,
          },
        },
        abort.signal
      );

    getShots().then((shots) => {
      const previewIDs = shots.data.map((shot: IShot) => shot.images[0]);
      const getPreviews = async () =>
        await ImageRoute.get(
          {
            filter: { _id: { $in: previewIDs.slice(0, 4) } },
            limit: 4,
          },
          abort.signal
        );
      getPreviews().then((res) => setPreviews(res.data));

      let authors: string[] = [];
      shots.data.map((shot: IShot) => {
        if (authors.includes(shot.user)) return;
        authors.push(shot.user);
        return;
      });
      setAuthors(authors);
    });
  }, [saves]); // получение превьюшек и кол-ва авторов

  useEffect(() => {
    if (!collection) return;

    const getSaves = async () =>
      await CollectionRoute.getSaves({ coll: collection._id });
    getSaves().then((res) => setSaves(res.data));
  }, [collection]); // получение saves

  return (
    <div
      className={style.item}
      data-loading={!collection}
      onClick={() => {
        if (collection) router.push('/collections/' + collection._id);
      }}
      style={{ pointerEvents: !collection ? 'none' : 'all' }}>
      <div className={style.images}>
        <ImageLoader
          src={genImageUrl(previews[0], '800x600')}
          layout={'responsive'}
          objectFit={'cover'}
          width={218}
          height={164}
        />
        <div className={style.others}>
          {[1, 2, 3].map((index) => {
            return (
              <ImageLoader
                key={index}
                src={genImageUrl(previews[index], '320x240')}
                layout={'responsive'}
                objectFit={'cover'}
                width={70}
                height={52}
              />
            );
          })}
        </div>
      </div>
      <div className={style.title}>
        <TextLoader
          font={fonts.h16}
          text={collection?.title}
          placeholder={'grfgroegerko'}
        />
        <TextLoader
          font={fonts.h12}
          text={
            saves
              ? saves.length > 0
                ? authors
                  ? `${
                      saves.length
                    } shots • ${authors?.length.toString()} designers`
                  : null
                : 'Empty Collection'
              : null
          }
          placeholder={'1 shots • 1 designers'}
        />
      </div>
    </div>
  );
};

export default Item;
