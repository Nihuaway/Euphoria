import type { NextPage } from 'next';
import style from 'components/[ pages ]/account/pages/about/style.module.scss';
import Followers from 'components/[ pages ]/account/pages/about/stack/followers';
import Followings from 'components/[ pages ]/account/pages/about/stack/followings';
import { IFollowing, IUser } from 'interfaces/models/user';
import { useEffect, useState } from 'react';
import UserRoute from 'routes/user/userRoute';

interface props {
  author: IUser | null;
}

const About: NextPage<props> = ({ author }) => {
  const [followers, setFollowers] = useState<IFollowing[] | null>(null);
  const [followings, setFollowings] = useState<IFollowing[] | null>(null);

  useEffect(() => {
    if (!author) return;

    const getFollowers = async () => await UserRoute.getSubscribers({user: author.id});
    getFollowers().then((res) => setFollowers(res.data));

    const getFollowings = async () => await UserRoute.getSubscribers({subscriber: author.id});
    getFollowings().then((res) => setFollowings(res.data));
  }, [author]); // получение автора

  return (
    <div className={style.stage}>
      <div className={style.info}>
        <div className={style.bio}>
          <h3>Biography</h3>
          <h4>{author?.biography ? author.biography : '[ Nothing there ]'}</h4>
        </div>
        <div className={style.skills}>
          <h3>Skills</h3>
          <div className={style.content}>
            {
              author && author.skills.length > 0 ? author.skills.map((skill, index) => {
                return <h4 key={index}  className={style.item}>{skill}</h4>
              }) : <h4>[ Nothing there ]</h4>
            }
          </div>
        </div>
      </div>
      <div className={style.right}>
        <Followers userID={author ? author.id : null}  followers={followers} />
        <hr />
        <Followings userID={author ? author.id : null} followings={followings} />
      </div>
    </div>
  );
};

export default About;
