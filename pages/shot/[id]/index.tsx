import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Layout from 'components/layout/Layout';
import Head from 'next/head';
import style from './style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';
import { ILike, IShot, IView } from 'interfaces/models/shot';
import { IUser } from 'interfaces/models/user';
import ShotRoute from 'routes/shot/shotRoute';
import UserRoute from 'routes/user/userRoute';
import Top from 'components/[ pages ]/shot/[ id ]/top';
import Slider from 'components/[ pages ]/shot/[ id ]/slider';
import Bottom from 'components/[ pages ]/shot/[ id ]/bottom';
import Flow from 'components/[ pages ]/shot/[ id ]/flow';
import { UserActions } from 'stores/user/store';
import { ShotsActions } from 'stores/shots/store';
import AvatarRoute from 'routes/user/avatarRoute';
import { useRouter } from 'next/router';
import ShotDescriptionBlock from 'components/[ pages ]/shot/[ id ]/description';
import ShotMoreByBlock from 'components/[ pages ]/shot/[ id ]/moreBy';
import { IAvatar } from 'interfaces/models/avatar';

interface props {
  shotDB: IShot | null;
}

const Shot: NextPage<props> = ({ shotDB }) => {
  //глобальные
  const dispatch = useDispatch();
  const router = useRouter();
  const shotID = router.query.id;
  const user = useSelector((state: IRootReducer) => state.user);

  // данные
  const [shot, setShot] = useState<IShot | null>(shotDB);
  const [author, setAuthor] = useState<IUser | null>(null);
  const [shotsBy, setShotsBy] = useState<IShot[] | null>(null);
  const [avatar, setAvatar] = useState<IAvatar | null>(null);
  const [likes, setLikes] = useState<ILike[] | null>(null);
  const [views, setViews] = useState<IView[] | null>(null);

  // состояния
  const [isLiked, setLiked] = useState(false);
  const [isSelf, setSelf] = useState(false);

  // процессы
  const [likeProcess, setLikePROCESS] = useState(false);

  useEffect(() => {
    setShot(shotDB);
    setAuthor(null);
    setSelf(false);
    setLiked(false);

    if (!shotID) return;
    const abort = new AbortController();

    const getAuthor = async () =>
      await UserRoute.get(
        { filter: { shots: { $in: shotID } }, limit: 1 },
        abort.signal
      );
    getAuthor().then((res) => setAuthor(res.data[0]));

    if (shotDB) return;
    const getShot = async () =>
      await ShotRoute.get(
        { filter: { _id: shotID, isDraft: false }, limit: 1 },
        abort.signal
      );
    getShot().then((res) => setShot(res.data[0]));

    return () => abort.abort();
  }, [shotID, shotDB]); // получение шота и автора

  useEffect(() => {
    setAvatar(null);
    setShotsBy(null);
    if (!author || !shotID) return;

    const abort = new AbortController();
    const getAvatar = async () =>
      await AvatarRoute.get(
        { filter: { user: author.id }, limit: 1 },
        abort.signal
      );
    getAvatar().then((res) => console.log(res, author));

    const getShotsBy = async () =>
      await ShotRoute.get(
        {
          filter: { user: author.id, isDraft: false, _id: { $ne: shotID } },
          limit: 3,
        },
        abort.signal
      );
    getShotsBy().then((res) => setShotsBy(res.data));

    return () => abort.abort();
  }, [author, shotID]); // получение аватарки + shotsBy

  useEffect(() => {
    if (!shot) return;
    const abort = new AbortController();

    const getLikes = async () => await ShotRoute.getLikes({ shot: shot._id }, abort.signal);
    getLikes().then((res) => setLikes(res.data));

    const getViews = async () => await ShotRoute.getViews({ shot: shot._id }, abort.signal);
    getViews().then((res) => setViews(res.data));

    return () => abort.abort();
  }, [shot]); // получение лайков + просмотров

  useEffect(() => {
    if (!likes || !user || !shotID) return;
    setLiked(!!likes.filter((like: ILike) => like.user === user.id)[0]);
    setSelf(user.shots.includes(shotID.toString()));
  }, [likes, user, shotID]); // проверка на лайк и авторство

  const like = async () => {
    if (!user || !shot) return;

    setLikePROCESS(true);
    await ShotRoute.like(shot._id).then((res) => {
      setLikes(res.data);
      setLikePROCESS(false);
    });
  }; //лайк

  return (
    <>
      <Head>
        <title>{shot && author ? `${shot.title} by ${author.name}` : 'loading ...'}</title>
      </Head>

      <Layout isDisable={!shot}>
        <div
          style={{
            position: 'absolute',
            right: '48px',
            top: 0,
            bottom: 0,
          }}>
          <Flow
            shotID={shotID?.toString()}
            isLoading={!user || !shot}
            isLiked={isLiked}
            likeProcess={likeProcess}
            likeHandler={like}
            authorID={author?.id}
          />
        </div>
        <div className={style.page}>
          <div style={{ padding: '0 24px', width: '100%' }}>
            <Top
              shotDB={shot}
              likes={likes}
              views={views}
              authorID={author ? author.id : null}
              isLiked={isLiked}
              likePROCESS={likeProcess}
              onLike={like}
            />
          </div>
          <Slider shot={shot} />
          {shot ? (
            <>
              <ShotDescriptionBlock shot={shot} />
              {isSelf ? (
                <Bottom shot={shot} />
              ) : shotsBy && shotsBy.length > 0 ? (
                <ShotMoreByBlock
                  author={author}
                  avatar={avatar}
                  shotsBy={shotsBy}
                />
              ) : null}
            </>
          ) : null}
        </div>
      </Layout>
    </>
  );
};

Shot.getInitialProps = async ({ query, req }) => {
  if (!req || !query.id) {
    return { shotDB: null };
  }
  const { id } = query;

  const shot = await ShotRoute.get({
    filter: { _id: id, isDraft: false },
    limit: 1,
  });
  if (!shot) return { shotDB: null };

  return { shotDB: shot.data[0] };
};

export default Shot;
