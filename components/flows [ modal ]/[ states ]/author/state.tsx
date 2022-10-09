import type { NextPage } from 'next';
import style from './style.module.scss';
import Separator from 'components/[ separates ]/horizontal/separator';
import Button_SIMPLE from 'components/[ buttons ]/simple/button';
import { ThemeVariant } from 'interfaces/enums';
import { IFollowing, IUser } from 'interfaces/models/user';
import ImageLoader from 'components/[ loaders ]/image/image';
import { genAvatarUrl } from 'scripts/genAvatarUrl';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import React, { useEffect, useState } from 'react';
import { ILike, IShot } from 'interfaces/models/shot';
import shotRoute from 'routes/shot/shotRoute';
import ImageRoute from 'routes/shot/imageRoute';
import { genImageUrl } from 'scripts/genImageUrl';
import { useRouter } from 'next/router';
import { IButtonState, IButtonTheme } from 'components/[ buttons ]/enums';
import AvatarRoute from 'routes/user/avatarRoute';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';
import UserRoute from 'routes/user/userRoute';
import { UserActions } from 'stores/user/store';
import ShotRoute from 'routes/shot/shotRoute';
import { IAvatar } from 'interfaces/models/avatar';
import { IImage } from 'interfaces/models/image';
import ContentLoader from 'react-content-loader';

interface props {
  authorID: string | null | undefined;
}

const State: NextPage<props> = ({ authorID }) => {
  // глобальные
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: IRootReducer) => state.user);

  // данные
  const [images, setImages] = useState<(IImage | null)[] | null>(null);
  const [author, setAuthor] = useState<IUser | null>(null);
  const [avatar, setAvatar] = useState<IAvatar | null>(null);
  const [followers, setFollowers] = useState<IFollowing[] | null>(null);

  // состояния
  const [isSelf, setSelf] = useState(false);
  const [isFollow, setFollow] = useState(false);

  // процессы
  const [followPROCESS, setFollowPROCESS] = useState(false);

  useEffect(() => {
    if (!authorID) return;

    const abort = new AbortController();
    const getAuthor = async () =>
      await UserRoute.get(
        {
          filter: {
            _id: authorID,
          },
          limit: 1,
        },
        abort.signal
      );
    getAuthor().then((res) => setAuthor(res.data[0]));

    return () => abort.abort();
  }, [authorID]); // получение автора

  useEffect(() => {
    if (!author || !user) return;
    setSelf(author.id === user.id);

    const abort = new AbortController();
    const getFollowers = async () =>
      await UserRoute.getSubscribers({ user: author.id }, abort.signal);
    getFollowers().then((res) => {
      setFollowers(res.data);
      setFollow(
        !!res.data.filter(
          (follower: IFollowing) => follower.subscriber === user.id
        )[0]
      );
    });

    return () => abort.abort();
  }, [author, user]); // проверка на сам ли пользователь это || подписан ли + получение подписчиков

  useEffect(() => {
    if (!author) return;

    const abort = new AbortController();
    const getShots = async () =>
      await shotRoute.get(
        { filter: { user: author.id, isDraft: false }, limit: 3 },
        abort.signal
      );
    getShots().then(async (res) => {
      const imagesDB = await ImageRoute.get(
        {
          filter: {
            _id: { $in: res.data.map((shot: IShot) => shot.images[0]) },
          },
          limit: 3,
        },
        abort.signal
      );
      if (imagesDB?.data.length === 0) return setImages(null);
      setImages(
        [0, 1, 2].map((index) => {
          if (imagesDB.data[index]) return imagesDB.data[index];
          return null;
        })
      );
    });

    const getAvatar = async () =>
      await AvatarRoute.get(
        { filter: { user: author.id }, limit: 1 },
        abort.signal
      );
    getAvatar().then((res) => setAvatar(res.data[0]));

    return () => abort.abort();
  }, [author]); // получение аватарки + 3 шота и их картинки

  const follow = async () => {
    if (!user || !author || isSelf) return;
    setFollowPROCESS(true);

    await UserRoute.subscribe(author.id).then((res) => {
      dispatch({ type: UserActions.SET_USER, payload: res.data });
      setFollowPROCESS(false);
    });
  }; // подписаться

  return (
    <div className={style.state}>
      {author ? (
        <div className={style.top}>
          <div
            className={style.title}
            onClick={() => router.push('/user/' + authorID)}>
            <div style={{ minWidth: '32px', minHeight: '32px' }}>
              <ImageLoader
                src={genAvatarUrl(avatar, '360x360')}
                layout={'responsive'}
                width={20}
                height={20}
                objectFit={'cover'}
                negative={true}
                radius={50}
              />
            </div>
            <div className={style.name}>
              <TextLoader
                font={fonts.h14}
                text={author?.name}
                placeholder={'gfgddggd'}
                transparent={true}
              />
              <TextLoader
                font={fonts.h12}
                text={
                  followers
                    ? followers.length > 0
                      ? `${followers.length.toString()} ${
                          followers.length === 1 ? 'follower' : 'followers'
                        }`
                      : 'No subscribers'
                    : null
                }
                placeholder={'254 followers'}
              />
            </div>
          </div>
          <Button_SIMPLE
            process={followPROCESS}
            state={
              isSelf
                ? IButtonState.disable
                : isFollow
                ? IButtonState.primary
                : IButtonState.secondary
            }
            theme={IButtonTheme.night}
            func={follow}>
            {isSelf ? 'It`s me' : isFollow ? 'Unfollow' : 'Follow'}
          </Button_SIMPLE>
        </div>
      ) : (
        <ContentLoader
          speed={2}
          width={249}
          height={39}
          viewBox="0 0 249 39"
          backgroundColor="#212121"
          foregroundColor="#292929">
          <circle cx="16" cy="16" r="16" />
          <rect x="44" y="0" rx="3" ry="3" width="105" height="14" />
          <rect x="44" y="20" rx="3" ry="3" width="50" height="12" />
          <rect x="181" y="0" rx="5" ry="5" width="68" height="38" />
        </ContentLoader>
      )}

      <hr />
      {images ? (
        <div className={style.bottom}>
          {images ? (
            images.map((image, index) => {
              return (
                <div
                  key={index}
                  data-exist={!!image}
                  className={style.image}
                  onClick={() => router.push(`/shot/${image?.shot}`)}>
                  <ImageLoader
                    src={genImageUrl(image, '1200x900')}
                    negative={true}
                    radius={3}
                    height={56}
                    width={75}
                    objectFit={'cover'}
                    layout={'responsive'}
                  />
                </div>
              );
            })
          ) : (
            <h4 className={style.empty}>No publications</h4>
          )}
        </div>
      ) : (
        <ContentLoader
          speed={2}
          width={249}
          height={56}
          viewBox="0 0 249 56"
          backgroundColor="#212121"
          foregroundColor="#292929">
          <rect x="0" y="0" rx="5" ry="5" width="75" height="56" />
          <rect x="87" y="0" rx="5" ry="5" width="75" height="56" />
          <rect x="174" y="0" rx="5" ry="5" width="75" height="56" />
        </ContentLoader>
      )}
    </div>
  );
};

export default State;
