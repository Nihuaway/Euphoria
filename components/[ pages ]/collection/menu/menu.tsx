import type { NextPage } from 'next';
import style from 'components/[ pages ]/collection/menu/style.module.scss';
import React, { useEffect, useState } from 'react';
import { ICollection, ISave } from 'interfaces/models/collection';
import { useRouter } from 'next/router';
import Icon, { IconVariant } from 'components/icon/icon';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import CollectionMenuAuth from 'components/[ pages ]/collection/menu/auth';
import AuthorItem from 'components/[ items ]/author/small/item';
import CollectionRoute from 'routes/collectionRoute';
import ShotRoute from 'routes/shot/shotRoute';
import { IShot } from 'interfaces/models/shot';
import ContentLoader from 'react-content-loader';

interface props {
  collection: ICollection | null;
  authorID: string | null;
}

const CollectionPageMenu: NextPage<props> = ({ collection, authorID }) => {
  const router = useRouter();
  const [saves, setSaves] = useState<ISave[] | null>(null);
  const [authors, setAuthors] = useState<string[] | null>(null);

  useEffect(() => {
    setAuthors(null);
    if (!saves || saves.length === 0) return;
    const abort = new AbortController();
    const getShots = async () =>
      await ShotRoute.get(
        {filter:{ _id: { $in: saves.map((save) => save.shot) }, isDraft: false }}, abort.signal
      );

    getShots().then((shots) => {
      let authors: string[] = [];
      shots.data.map((shot: IShot) => {
        if (authors.includes(shot.user)) return;
        authors.push(shot.user);
        return;
      });
      setAuthors(authors);
    });

    return () => abort.abort();
  }, [saves]); // получение превьюшек и кол-ва авторов

  useEffect(() => {
    if (!collection) return;
    const getSaves = async () =>
      await CollectionRoute.getSaves({ coll: collection._id });
    getSaves().then((res) => setSaves(res.data));
  }, [collection]);

  return (
    <div className={style.menu} data-loading={!collection || !authorID}>
      <div className={style.left}>
        <div style={{ marginBottom: '16px' }}>
          <div className={style.back} onClick={() => router.back()}>
            <Icon id={IconVariant.arrowRIGHT} size={14} />
            <h3>back</h3>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gridRowGap: '8px',
            }}>
            {
              collection && saves && authors ? (
                <>
                  <h1>{collection.title}</h1>
                  <h4 style={{opacity: '0.75'}}>{saves.length > 0
                    ? authors
                      ? `${
                        saves.length
                      } shots • ${authors?.length.toString()} designers`
                      : null
                    : 'Empty Collection'}</h4>
                </>
              ) :<ContentLoader
                speed={2}
                width={140}
                height={58}
                viewBox="0 0 140 58"
                backgroundColor="#f5f5f5"
                foregroundColor="#ededed">
                <rect x="0" y="6" rx="3" ry="3" width="120" height="24" />
                <rect x="0" y="40" rx="3" ry="3" width="80" height="16" />
              </ContentLoader>
            }
          </div>
        </div>
        <AuthorItem authorID={authorID} />
      </div>
      <div className={style.right}>
        <CollectionMenuAuth collection={collection} authorID={authorID} />
      </div>
    </div>
  );
};
export default CollectionPageMenu;
