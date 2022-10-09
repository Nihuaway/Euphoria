import style from 'components/[ pages ]/account/profile/style.module.scss';
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';
import { IFollowing, IUser } from 'interfaces/models/user';
import UserRoute from 'routes/user/userRoute';
import { UserActions } from 'stores/user/store';
import { normalize } from 'interfaces/query';
import ProfileMenu from 'components/[ pages ]/account/profile/menu/menu';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import ImageLoader from 'components/[ loaders ]/image/image';
import SimpleButton from 'components/[ buttons ]/simple/button';
import { genAvatarUrl } from 'scripts/genAvatarUrl';
import { IButtonState } from 'components/[ buttons ]/enums';
import EditProfile from 'components/windows/[ states ]/profile/state';
import { WindowActions } from 'stores/window/store';
import AvatarRoute from 'routes/user/avatarRoute';
import { IAvatar } from 'interfaces/models/avatar';
import ContentLoader from 'react-content-loader';

interface props {
  authorID: string | null;
  page: string;
}

const Profile: FC<props> = ({ authorID, page }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: IRootReducer) => state.user);
  const menuItems = ['Shots', 'Likes', 'Collections', 'About', 'Drafts'];

  const [author, setAuthor] = useState<IUser | null>(null);
  const [self, setSelf] = useState(
    author && user ? user.id === authorID : false
  );
  const [isFollow, setFollow] = useState(false);
  const [follow_loading, setFollow_loading] = useState(false);
  const [followers, setFollowers] = useState<IFollowing[] | null>(null);
  const [avatar, setAvatar] = useState<IAvatar | null>(null);

  useEffect(() => {
    setAuthor(null);
    const abort = new AbortController();
    if (!authorID) return;
    const getAuthor = async () =>
      await UserRoute.get(
        { filter: { _id: authorID }, limit: 1 },
        abort.signal
      );
    getAuthor().then((res) => setAuthor(res.data[0]));
    return () => abort.abort();
  }, [authorID]);

  useEffect(() => {
    setAvatar(null);
    if (!author || !user) return;

    setSelf(user?.id === author.id);
    const abort = new AbortController();
    const getAvatar = async () =>
      await AvatarRoute.get(
        { filter: { user: author.id }, limit: 1 },
        abort.signal
      );
    getAvatar().then((res) => setAvatar(author.avatar ? res.data[0] : null));

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
  }, [author, user]);

  const follow = async () => {
    if (!user || !author) return;
    setFollow_loading(true);
    await UserRoute.subscribe(author.id).then((res) => {
      console.log(res);
      dispatch({ type: UserActions.SET_USER, payload: res.data });
      setFollow_loading(false);
    });
  };

  return (
    <div className={style.menu}>
      <div className={style.top}>
        {avatar ? (
          <div className={style.avatar}>
            <ImageLoader
              src={genAvatarUrl(avatar, '400x400')}
              layout={'fill'}
              objectFit={'cover'}
            />
          </div>
        ) : (
          <ContentLoader
            speed={2}
            width={152}
            height={152}
            viewBox="0 0 152 152"
            backgroundColor="#f5f5f5"
            foregroundColor="#ededed">
            <circle cx="76" cy="76" r="76" />
          </ContentLoader>
        )}

        <div className={style.info}>
          {author && followers ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gridRowGap: '4px',
              }}>
              <h1>{author.name}</h1>
              <h4>
                {followers.length > 0
                  ? followers.length + ' followers'
                  : 'No subscriptions'}
              </h4>
            </div>
          ) : (
            <ContentLoader
              speed={2}
              width={120}
              height={64}
              viewBox="0 0 120 64"
              backgroundColor="#f5f5f5"
              foregroundColor="#ededed">
              <rect x="0" y="16" rx="5" ry="5" width="120" height="24" />
              <rect x="0" y="48" rx="5" ry="5" width="80" height="14" />
            </ContentLoader>
          )}

          <hr />
          {self ? (
            <SimpleButton
              state={IButtonState.secondary}
              isLoading={!author}
              func={() =>
                dispatch({
                  type: WindowActions.SET,
                  payload: <EditProfile />,
                })
              }>
              Edit Profile
            </SimpleButton>
          ) : (
            <SimpleButton
              isLoading={!author}
              state={isFollow ? IButtonState.primary : IButtonState.secondary}
              func={follow}
              process={follow_loading}>
              {isFollow ? 'Following' : 'Follow'}
            </SimpleButton>
          )}
        </div>
      </div>

      <div className={style.bottom}>
        <ProfileMenu
          items={menuItems}
          selectedID={menuItems.findIndex(
            (item) => normalize(item, '-') === normalize(page, '-')
          )}
          onClick={(id: number) => {
            author?.id
              ? router.push(
                  `/user/${author.id}?page=${menuItems[id].toLowerCase()}`,
                  undefined,
                  { shallow: true }
                )
              : null;
          }}
        />
      </div>
    </div>
  );
};

export default Profile;
