import React, { FC, ReactElement, useEffect, useState } from 'react';
import { IShot } from 'interfaces/models/shot';
import { IUser } from 'interfaces/models/user';
import ShotController from 'routes/shot/shotRoute';
import Grid from 'components/grid/grid';
import ShotItem from 'components/[ items ]/shot/default/item';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';
import { ShotsActions } from 'stores/shots/store';
import shotsMap from 'components/grid/maps/shots';

interface props {
  author: IUser | null;
  title: { empty: string; loading: string };
  description: { empty: string; loading: string };
}

const MyShots: FC<props> = ({ author, title, description }) => {
  const dispatch = useDispatch();
  const shots = useSelector((state: IRootReducer) => state.shots);

  useEffect(() => {
    dispatch({ type: ShotsActions.SET, payload: null });
    if (!author) return;
    const abort = new AbortController();
    const getShots = async () =>
      await ShotController.get(
        {
          filter: { _id: { $in: author?.shots }, isDraft: false },
          limit: 10
        },
        abort.signal
      );
    getShots().then((res) =>
      dispatch({ type: ShotsActions.SET, payload: res.data })
    );
    return () => abort.abort();
  }, [author]);

  return (
    <Grid
      items={shotsMap(shots)}
      isLoading={!shots}
      description={description}
      title={title}
    />
  );
};

export default MyShots;
