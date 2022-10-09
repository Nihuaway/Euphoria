import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import style from 'components/[ items ]/shot/default/style.module.scss';
import ImageLoader from 'components/[ loaders ]/image/image';
import ShotRoute from 'routes/shot/shotRoute';
import { IRootReducer } from 'stores/store';
import { ILike, IShot, IView } from 'interfaces/models/shot';

import MiniButton, {
  MiniButtonState,
} from 'components/[ buttons ]/mini/button';
import Icon, { IconVariant } from 'components/icon/icon';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import { genImageUrl } from 'scripts/genImageUrl';
import ListCollection from 'components/windows/[ states ]/collections/list/state';
import ShotView from 'components/windows/[ states ]/shot/view/state';
import { WindowActions } from 'stores/window/store';
import ImageRoute from 'routes/shot/imageRoute';
import UserRoute from 'routes/user/userRoute';
import { IUser } from 'interfaces/models/user';
import { IImage } from 'interfaces/models/image';
import ContentLoader from 'react-content-loader';
import Loading from 'components/[ loaders ]/animation/Loading';

interface IProps {
  shotDB: IShot | null;
}

const ShotItem: NextPage<IProps> = ({ shotDB }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: IRootReducer) => state.user);
  const [author, setAuthor] = useState<IUser | null>(null);
  const [preview, setPreview] = useState<IImage | null>(null);

  const [likePROCESS, setLikePROCESS] = useState(false);
  const [isLiked, setLiked] = useState(false);
  const [likes, setLikes] = useState<ILike[] | null>(null);
  const [views, setViews] = useState<IView[] | null>(null);

  const like = async () => {
    if (!user || !shotDB) return;

    setLikePROCESS(true);
    await ShotRoute.like(shotDB._id).then((res) => {
      setLikes(res.data);
      setLikePROCESS(false);
    });
  }; //лайк

  useEffect(() => {
    setPreview(null);
    setAuthor(null);
    if (!shotDB) return;

    const abort = new AbortController();

    const getPreview = async () =>
      await ImageRoute.get(
        { filter: { shot: shotDB._id }, limit: 1 },
        abort.signal
      );
    getPreview()
      .then((res) => setPreview(res.data[0]))
      .catch((err) => {
        if (err.message === 'canceled') return;
        throw err;
      });

    const getAuthor = async () =>
      await UserRoute.get(
        { filter: { _id: shotDB.user }, limit: 1 },
        abort.signal
      );
    getAuthor()
      .then((res) => setAuthor(res.data[0]))
      .catch((err) => {
        if (err.message === 'canceled') return;
        throw err;
      });

    return () => abort.abort()
  }, [shotDB]); // полчение превью + автора

  useEffect(() => {
    if (!shotDB || !user) return;

    const getLikes = async () => await ShotRoute.getLikes({ shot: shotDB._id });
    getLikes().then((res) => setLikes(res.data));

    const getViews = async () => await ShotRoute.getViews({ shot: shotDB._id });
    getViews().then((res) => setViews(res.data));
  }, [user, shotDB]); // получение лайков и просмотров

  useEffect(() => {
    if (!likes) return;
    setLiked(!!likes.filter((like: ILike) => like.user === user.id)[0]);
  }, [likes, user]); // проверка на лайк

  return (
    <div className={style.shot}>
      <div className={style.image}>
        <ImageLoader
          layout={'responsive'}
          objectFit={'cover'}
          src={genImageUrl(preview, '800x600')}
          width={290}
          height={216}
        />
        <div className={style.overflow}>
          <div
            onClick={() => {
              if (!shotDB) return;
              router.push(`/shot/${shotDB._id}`);
            }}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            }}
          />
          <div
            className={style.author}
            onClick={() => {
              if (!author) return;
              router.push('/user/' + author.id);
            }}>
            {author ? (
              <h3>{author.name}</h3>
            ) : (
              <div style={{ width: '18px', height: '18px' }}>
                <Loading process={true} negative={true} size={16} />
              </div>
            )}
          </div>
          <MiniButton
            func={() =>
              shotDB
                ? dispatch({
                    type: WindowActions.SET,
                    payload: <ListCollection shotID={shotDB._id} />,
                  })
                : null
            }
            state={MiniButtonState.transparent}>
            <Icon id={IconVariant.folder} size={12} />
            <h5>Save</h5>
          </MiniButton>
        </div>
      </div>
      <div className={style.bottom}>
        <div className={style.title}>
          <TextLoader
            font={fonts.h16}
            text={shotDB?.title}
            width={'100%'}
            placeholder={'titlelessgdfgddgf'}
            func={() => {
              if (!shotDB || !author) return;
              // dispatch({
              //   type: WindowActions.SET_WINDOW,
              //   payload: {
              //     content: <ShotView shotID={shotDB?._id} />,
              //     width: '796px',
              //   },
              // });
            }}
          />
        </div>
        <div className={style.actions}>
          <div className={style.views} data-visible={!!shotDB}>
            <Icon id={IconVariant.eye} size={12} />
            <h5>{views ? views.length.toString() : null}</h5>
          </div>
          <div className={style.likeButton}>
            <MiniButton
              func={like}
              process={likePROCESS}
              hide={!shotDB}
              state={
                isLiked && !likePROCESS
                  ? MiniButtonState.primary
                  : MiniButtonState.secondary
              }>
              <Icon
                id={
                  isLiked && !likePROCESS
                    ? IconVariant.likeFILL
                    : IconVariant.like
                }
                size={12}
              />
              <TextLoader
                font={fonts.h12}
                text={likes ? likes.length.toString() : '...'}
                placeholder={'283'}
                transparent={true}
              />
            </MiniButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShotItem;
