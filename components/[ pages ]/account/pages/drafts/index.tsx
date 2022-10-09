import React, { FC, useEffect, useState } from 'react';
import { IShot } from 'interfaces/models/shot';
import ShotController from 'routes/shot/shotRoute';
import Grid from 'components/grid/grid';
import DraftItem from 'components/[ items ]/draft/item';
import draftsMap from 'components/grid/maps/drafts';

interface props {
  filter: Object | null;
  title: { empty: string; loading: string };
  description: { empty: string; loading: string };
}

const MyDrafts: FC<props> = ({ filter, title, description }) => {
  const [drafts, setDrafts] = useState<IShot[] | null>(null);

  useEffect(() => {
    if (!filter) return;
    const abort = new AbortController();
    const getShots = async () =>
      await ShotController.get({filter,limit: 10}, abort.signal);
    getShots().then((res) => setDrafts(res.data));
    return () => abort.abort();
  }, [filter]);

  return (
    <Grid
      items={draftsMap(drafts)}
      isLoading={!drafts}
      description={description}
      title={title}
    />
  );
};

export default MyDrafts;
