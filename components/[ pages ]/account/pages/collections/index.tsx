import { FC, useEffect, useState } from 'react';
import { IUser } from 'interfaces/models/user';
import { ICollection } from 'interfaces/models/collection';
import CollectionRoute from 'routes/collectionRoute';
import Grid from 'components/grid/grid';
import Item_COLLECTION from 'components/[ items ]/collection/default/item';
import collectionsMap from 'components/grid/maps/collections';

interface props {
  author: IUser | null | undefined;
}

const MyCollections: FC<props> = ({ author }) => {
  const [collections, setCollections] = useState<ICollection[] | null>(null);
  useEffect(() => {
    if (!author) return;

    const getCollections = async () =>
      await CollectionRoute.get({ user: author.id });
    getCollections().then((res) => setCollections(res.data));
  }, [author]);

  return (
    <Grid
      items={collectionsMap(collections)} isLoading={!collections}
      title={{ empty: 'You dont have collections', loading: '' }}
      description={{ empty: 'You can make it now', loading: '' }}
    />
  );
};

export default MyCollections;
