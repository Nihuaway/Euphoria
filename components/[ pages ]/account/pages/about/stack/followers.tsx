import type { NextPage } from 'next';
import style from 'components/[ pages ]/account/pages/about/stack/style.module.scss';
import AuthorItem from 'components/[ pages ]/account/pages/about/stack/item/item';
import { useDispatch } from 'react-redux';
import { WindowActions } from 'stores/window/store';
import FollowersWindow from 'components/windows/[ states ]/authors/followers';
import { IFollowing } from 'interfaces/models/user';
import ContentLoader from 'react-content-loader';

interface props {
  userID: string | null;
  followers: IFollowing[] | null | undefined;
}

const FollowersStack: NextPage<props> = ({ followers, userID }) => {
  const dispatch = useDispatch();

  return (
    <div
      className={style.stack}
      onClick={() =>
        dispatch({
          type: WindowActions.SET,
          payload: <FollowersWindow userID={userID} />,
        })
      }>
      <h3>Followers</h3>
      <div className={style.content}>
        {followers ? (
          followers.length > 0 ? (
            followers.slice(0, 5).map((follower, index) => {
              if (index === 4) {
                return <h5 className={style.more}>+{followers.length - 4}</h5>;
              }

              return (
                <AuthorItem
                  key={index}
                  authorID={follower.subscriber}
                  isFirst={index === 0}
                />
              );
            })
          ) : (
            <h5 className={style.empty}>Empty</h5>
          )
        ) : (
          <ContentLoader
            speed={2}
            width={128}
            height={32}
            viewBox="0 0 128 32"
            backgroundColor="#f3f3f3"
            foregroundColor="#eeeeee">
            <circle cx="16" cy="16" r="16" />
            <circle cx="40" cy="16" r="16" />
            <circle cx="64" cy="16" r="16" />
            <circle cx="16" cy="16" r="16" />
            <circle cx="88" cy="16" r="16" />
            <circle cx="112" cy="16" r="16" />
          </ContentLoader>
        )}
      </div>
    </div>
  );
};

export default FollowersStack;
