import type { NextPage } from 'next';
import style from './style.module.scss';
import { ILike, IShot, IView } from 'interfaces/models/shot';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ShotRoute from 'routes/shot/shotRoute';
import { ISave } from 'interfaces/models/collection';
import CollectionRoute from 'routes/collectionRoute';
import Loading, { LoadingPos } from 'components/[ loaders ]/animation/Loading';
import { WindowActions } from 'stores/window/store';
import { useDispatch } from 'react-redux';
import ContentLoader from 'react-content-loader';

interface props {
  shotID: string | null | undefined;
}

const ShotStatistic: NextPage<props> = ({ shotID }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [shot, setShot] = useState<IShot | null>(null);
  const [likes, setLikes] = useState<ILike[] | null>(null);
  const [views, setViews] = useState<IView[] | null>(null);
  const [saves, setSaves] = useState<ISave[] | null>(null);

  useEffect(() => {
    setShot(null);
    setLikes(null);
    setViews(null);
    setSaves(null);

    if (!shotID) return;
    const abort = new AbortController();
    const getShot = async () =>
      await ShotRoute.get(
        { filter: { _id: shotID }, limit: 1 },
        abort.signal
      );
    getShot().then((res) => setShot(res.data[0]));
    return () => abort.abort();
  }, [shotID]); // получение шота

  useEffect(() => {
    if (!shot) return;
    const abort = new AbortController();
    const getLikes = async () =>
      await ShotRoute.getLikes({ shot: shot._id }, abort.signal);
    getLikes().then((res) => setLikes(res.data));

    const getViews = async () =>
      await ShotRoute.getViews({ shot: shot._id }, abort.signal);
    getViews().then((res) => setViews(res.data));

    const getSaves = async () =>
      await CollectionRoute.getSaves({ shot: shot._id }, abort.signal);
    getSaves().then((res) => setSaves(res.data));
    return () => abort.abort();
  }, [shot]); // получение лайков + просмотров + сохранений

  return (
    <div className={style.state}>
      <div className={style.title}>
        <h2>Statistics</h2>
      </div>

      <div className={style.content}>
        {!shot || !likes || !saves || !views ? (
          <ContentLoader
            speed={2}
            width={404}
            height={200}
            viewBox="0 0 404 200"
            backgroundColor="#f3f3f3"
            foregroundColor="#eeeeee">
            <rect x="0" y="0" rx="3" ry="3" width="230" height="19" />
            <rect x="0" y="32" rx="5" ry="5" width="66" height="59" />
            <rect x="76" y="32" rx="5" ry="5" width="66" height="59" />
            <rect x="150" y="32" rx="5" ry="5" width="66" height="59" />
            <rect x="0" y="120" rx="3" ry="3" width="87" height="19" />
            <rect x="0" y="152" rx="3" ry="3" width="50" height="20" />
            <rect x="59" y="152" rx="3" ry="3" width="84" height="20" />
            <rect x="152" y="152" rx="3" ry="3" width="57" height="20" />
            <rect x="218" y="152" rx="3" ry="3" width="100" height="20" />
            <rect x="0" y="181" rx="3" ry="3" width="100" height="20" />
            <rect x="109" y="181" rx="3" ry="3" width="58" height="20" />
          </ContentLoader>
        ) : (
          <>
            <div className={style.info}>
              <div style={{ display: 'flex', gridColumnGap: '8px' }}>
                <h3>Posted: {new Date(shot.createdAt).toDateString()}</h3>
              </div>

              <div style={{ display: 'flex', gridColumnGap: '8px' }}>
                <div className={style.card}>
                  <h4>Saves</h4>
                  <h3>{saves?.length.toString()}</h3>
                </div>
                <div className={style.card}>
                  <h4>Views</h4>
                  <h3>{views?.length.toString()}</h3>
                </div>
                <div className={style.card}>
                  <h4>Likes</h4>
                  <h3>{likes?.length.toString()}</h3>
                </div>
              </div>
            </div>
            {shot.tags.length > 0 || !shot ? (
              <div className={style.tags}>
                <h3>Tags</h3>
                <h5 className={style.list}>
                  {shot.tags.map((tag, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() =>
                          router.push({
                            pathname: '/',
                            query: {
                              tag,
                            },
                          })
                        }
                        className={style.item}>
                        {tag}
                      </div>
                    );
                  })}
                </h5>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default ShotStatistic;
