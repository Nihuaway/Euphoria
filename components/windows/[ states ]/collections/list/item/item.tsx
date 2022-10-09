import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import ImageLoader from 'components/[ loaders ]/image/image';
import { ICollection, ISave } from 'interfaces/models/collection';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import style from 'components/windows/[ states ]/collections/list/item/style.module.scss';
import { genImageUrl } from 'scripts/genImageUrl';
import CollectionRoute from 'routes/collectionRoute';
import ImageRoute from 'routes/shot/imageRoute';
import Loading, { LoadingPos } from 'components/[ loaders ]/animation/Loading';
import { SuggestActions } from 'stores/suggest/store';
import { useDispatch } from 'react-redux';
import Icon, { IconVariant } from 'components/icon/icon';
import { IImage } from 'interfaces/models/image';

interface props {
  shotID: string | null | undefined;
  collectionDB: ICollection;
  onChange: () => Promise<ISave[] | null>;
}

const Item: NextPage<props> = ({ collectionDB, onChange, shotID }) => {
  const [preview, setPreview] = useState<IImage | null>(null);
  const [isSelected, setSelected] = useState(false);
  const [collection, setCollection] = useState<ICollection>(collectionDB);
  const [saves, setSaves] = useState<ISave[] | null>(null);
  const [changePROCESS, setChangePROCESS] = useState(false);

  useEffect(() => setCollection(collectionDB), [collectionDB]);

  useEffect(() => {
    if (!collection) return;
    const getSaves = async () =>
      await CollectionRoute.getSaves({ coll: collection._id });
    getSaves().then((res) => setSaves(res.data));
  }, [collection]); // получение сохранений

  useEffect(() => {
    if (!saves || saves.length === 0) {
      setSelected(false);
      setPreview(null);
      return;
    }
    const abort = new AbortController();

    const getPreview = async () =>
      await ImageRoute.get({filter: { shot: saves[saves.length - 1].shot }}, abort.signal);
    getPreview().then((res) => setPreview(res.data[0]));
    setSelected(!!saves.filter((save: ISave) => save.shot === shotID)[0]);

    return () => abort.abort();
  }, [saves]); // получение превью

  return (
    <div
      className={style.preview}
      data-selected={isSelected}
      onClick={() => {
        setChangePROCESS(true);
        onChange().then((saves) => {
          setSaves(saves);
          setChangePROCESS(false);
        });
      }}
      data-process={changePROCESS}
      data-loading={!collection}>
      <div>
        <ImageLoader
          src={genImageUrl(preview, '320x240')}
          layout={'fixed'}
          objectFit={'cover'}
          width={100}
          height={75}
        />
      </div>
      <Loading
        process={changePROCESS}
        loadingXPos={LoadingPos.right}
        margin={'0 24px 0 0'}
      />
      <div className={style.title}>
        <div>
          <TextLoader
            font={fonts.h14}
            text={collection?.title}
            placeholder={'gnreighiegfgfgdfr'}
          />
          <div className={style.count}>
            <TextLoader
              font={fonts.h12}
              text={saves ? saves.length.toString() + ' shots' : null}
              transparent={true}
              placeholder={'8 shots'}
            />
          </div>
        </div>
        <TextLoader
          font={fonts.h12}
          text={
            collection
              ? collection.updatedAt
                ? `Updated at ${new Date(Date.parse(collection.updatedAt)).toDateString()}`
                : `Created at ${new Date(Date.parse(collection.createdAt)).toDateString()}`
              : null
          }
          placeholder={'Updated 10 minutes ago'}
        />
      </div>
    </div>
  );
};

export default Item;
