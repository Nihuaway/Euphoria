import React, { FC, ReactElement, useEffect, useState } from 'react';
import { ILike, IShot } from 'interfaces/models/shot';
import { IFollowing, IUser } from 'interfaces/models/user';
import ShotController from 'routes/shot/shotRoute';
import Grid from 'components/grid/grid';
import ShotItem from 'components/[ items ]/shot/default/item';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';
import { ShotsActions } from 'stores/shots/store';
import shotsMap from 'components/grid/maps/shots';
import ShotRoute from 'routes/shot/shotRoute';

interface props {
  author: IUser | null;
  title: { empty: string; loading: string };
  description: { empty: string; loading: string };
}

const MyLikes: FC<props> = ({ author, title, description }) => {
  const dispatch = useDispatch();
  const shots = useSelector((state: IRootReducer) => state.shots);
  const [likes, setLikes] = useState<ILike[] | null>(null);

  useEffect(() => {
    if (!author) return;
    dispatch({ type: ShotsActions.SET, payload: null });
    const getLikes = async () => await ShotRoute.getLikes({ user: author.id });
    getLikes().then((res) => setLikes(res.data));
  }, [author]);

  useEffect(() => {
    if (!likes) return;
    const abort = new AbortController();
    const getShots = async () =>
      await ShotController.get(
        {
          filter: {
            _id: { $in: likes.map((like) => like.shot) },
            isDraft: false,
          },
          limit: 10,
        },
        abort.signal
      );
    getShots().then((res) =>
      dispatch({ type: ShotsActions.SET, payload: res.data })
    );
    return () => abort.abort();
  }, [likes]);

  return (
    <Grid
      items={shotsMap(shots)}
      isLoading={!shots}
      description={description}
      title={title}
    />
  );
};

export default MyLikes;
