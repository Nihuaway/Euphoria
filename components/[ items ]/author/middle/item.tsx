import type { NextPage } from 'next';
import style from './style.module.scss';
import { IFollowing, IUser } from 'interfaces/models/user';
import React, { useEffect, useState } from 'react';
import AvatarRoute from 'routes/user/avatarRoute';
import ImageLoader from 'components/[ loaders ]/image/image';
import { genAvatarUrl } from 'scripts/genAvatarUrl';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import { useRouter } from 'next/router';
import { IButtonTheme } from 'components/[ buttons ]/enums';
import { IAvatar } from 'interfaces/models/avatar';
import UserRoute from 'routes/user/userRoute';
import Icon, { IconVariant } from 'components/icon/icon';
import ShotRoute from 'routes/shot/shotRoute';

interface props {
  author: IUser | null;
  theme?: IButtonTheme;
}

const AuthorMiddleItem: NextPage<props> = ({
  author,
  theme = IButtonTheme.day,
}) => {
  const router = useRouter();
  const [avatar, setAvatar] = useState<IAvatar | null>(null);
  const [followers, setFollowers] = useState<IFollowing[] | null>(null);
  const [likes, setLikes] = useState<IFollowing[] | null>(null);

  useEffect(() => {
    setAvatar(null);
    if (!author) return;
    const abort = new AbortController();

    const getAvatar = async () => await AvatarRoute.get({filter:{ user: author.id }, limit:1}, abort.signal);
    getAvatar().then((res) => setAvatar(res.data[0]));

    const getFollowers = async () =>
      await UserRoute.getSubscribers({ user: author.id }, abort.signal);
    getFollowers().then((res) => setFollowers(res.data));

    const getLikes = async () => await ShotRoute.getLikes({ user: author.id }, abort.signal);
    getLikes().then((res) => setLikes(res.data));

    return () => abort.abort();
  }, [author]);

  return (
    <div
      className={style.item}
      data-theme={theme}
      onClick={() => (author ? router.push(`/user/${author.id}`) : null)}>
      <div className={style.main}>
        <div>
          <ImageLoader
            src={genAvatarUrl(avatar, '200x200')}
            width={40}
            radius={20}
            height={40}
            layout={'fixed'}
            objectFit={'cover'}
          />
        </div>
        <div className={style.title}>
          <TextLoader
            font={fonts.h14}
            text={author?.name}
            placeholder={'fgjfjkgfgfdgdfgfdg'}
          />
          <TextLoader
            font={fonts.h12}
            text={
              followers
                ? `${followers.length} ${
                    followers.length > 1 ? 'followers' : 'follower'
                  }`
                : null
            }
            placeholder={'fgjfjkgf'}
          />
        </div>
      </div>
      {/*<div className={style.additional}>*/}
      {/*  {likes ? (*/}
      {/*    <div*/}
      {/*      style={{*/}
      {/*        display: 'flex',*/}
      {/*        gridColumnGap: '4px',*/}
      {/*        alignItems: 'center',*/}
      {/*      }}>*/}
      {/*      <Icon*/}
      {/*        id={IconVariant.likeFILL}*/}
      {/*        size={10}*/}
      {/*        color={'rgba(34,34,34,0.25)'}*/}
      {/*      />*/}
      {/*      <h5>{likes.length} of your shots</h5>*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <TextLoader*/}
      {/*      font={fonts.h12}*/}
      {/*      text={null}*/}
      {/*      placeholder={'25 hg of your shots'}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*</div>*/}
    </div>
  );
};

export default AuthorMiddleItem;
