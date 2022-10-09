import type { NextPage } from 'next';
import Layout from 'components/layout/Layout';
import style from './style.module.scss';
import React, { useEffect, useState } from 'react';
import { ICollection, ISave } from 'interfaces/models/collection';
import { useRouter } from 'next/router';
import { IUser } from 'interfaces/models/user';
import Grid from 'components/grid/grid';
import { IShot } from 'interfaces/models/shot';
import UserRoute from 'routes/user/userRoute';
import ShotRoute from 'routes/shot/shotRoute';
import CollectionRoute from 'routes/collectionRoute';
import CollectionPageMenu from 'components/[ pages ]/collection/menu/menu';
import ShotItem from 'components/[ items ]/shot/default/item';
import shotsMap from 'components/grid/maps/shots';

const CollectionPage: NextPage = () => {
  const router = useRouter();
  const collectionID = router.query.ID;

  const [collection, setCollection] = useState<ICollection | null>(null);
  const [shots, setShots] = useState<IShot[] | null>(null);
  const [saves, setSaves] = useState<ISave[] | null>(null);

  useEffect(() => {
    if (!collectionID) return;

    const getCollection = async () =>
      await CollectionRoute.get({ _id: collectionID });
    getCollection().then((res) => setCollection(res.data[0]));

    const getSaves = async () =>
      await CollectionRoute.getSaves({ coll: collectionID });
    getSaves().then((res) => setSaves(res.data));
  }, [collectionID]); // получение коллекции и сэйвов

  useEffect(() => {
    if (!saves) return;
    const abort = new AbortController();
    const getShots = async () =>
      await ShotRoute.get(
        {filter:{ _id: { $in: saves.map((save) => save.shot) }, isDraft: false },
        limit:10},abort.signal
      );
    getShots().then((res) => setShots(res.data));
    return () => abort.abort();
  }, [saves]); // получение шотов из коллекции

  return (
    <Layout>
      <div className={style.page}>
        <CollectionPageMenu
          authorID={collection ? collection.user : null}
          collection={collection}
        />
        <hr style={{ width: '100%', marginBottom: '40px' }} />
        <div className={style.main}>
          <Grid
            items={shotsMap(shots)}
            isLoading={!shots}
            title={{ empty: 'Collection is empty', loading: '' }}
            description={{
              empty: 'You can add shots from gallery',
              loading: '',
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default CollectionPage;
