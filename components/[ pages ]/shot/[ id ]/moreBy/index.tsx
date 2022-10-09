import type { NextPage } from 'next';
import style from './style.module.scss';
import ImageLoader from 'components/[ loaders ]/image/image';
import { genAvatarUrl } from 'scripts/genAvatarUrl';
import ShotItem from 'components/[ items ]/shot/default/item';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { IUser } from 'interfaces/models/user';
import { IShot } from 'interfaces/models/shot';
import { IAvatar } from 'interfaces/models/avatar';

interface props {
  author: IUser | null;
  avatar: IAvatar | null;
  shotsBy: IShot[] | null;
}

const ShotMoreByBlock: NextPage<props> = ({ author, avatar, shotsBy }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      <div className={style.author}>
        <div className={style.top}>
          <hr />
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => router.push(`/user/${author?.id}`)}>
            <ImageLoader
              src={genAvatarUrl(avatar, '640x640')}
              layout={'fixed'}
              width={64}
              height={64}
              radius={32}
            />
          </div>

          <hr />
        </div>
        <div className={style.bottom}>
          <h2>{author?.name}</h2>
          <h4>{"Full - cycle agency Let's chat 👋"}</h4>
        </div>
      </div>
      <div className={style.moreBy}>
        <div className={style.title}>
          <h1>More by {author?.name}</h1>
          <h4>View profile</h4>
        </div>
        <div className={style.moreByList}>
          {[0, 1, 2].map((index) => {
            if (shotsBy && !shotsBy[index])
              return (
                <div className={style.emptyShotBy}>
                  <h4>Empty</h4>
                </div>
              );
            return (
              <ShotItem
                key={shotsBy ? shotsBy[index]._id : index}
                shotDB={shotsBy ? shotsBy[index] : null}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ShotMoreByBlock;