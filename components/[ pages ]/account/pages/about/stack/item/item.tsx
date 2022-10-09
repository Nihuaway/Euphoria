import type { NextPage } from 'next';
import style from 'components/[ pages ]/account/pages/about/stack/item/style.module.scss';
import ImageLoader from 'components/[ loaders ]/image/image';
import { useEffect, useState } from 'react';
import { genAvatarUrl } from 'scripts/genAvatarUrl';
import AvatarRoute from 'routes/user/avatarRoute';
import { IAvatar } from 'interfaces/models/avatar';

interface props {
  authorID: string | null;
  isFirst: boolean;

}

const Item: NextPage<props> = ({ authorID,isFirst }) => {
  const [avatar, setAvatar] = useState<IAvatar | null>(null);

  useEffect(() => {
    if (!authorID) return;
    const abort = new AbortController();
    console.log(authorID)
    const getAvatar = async () =>
      await AvatarRoute.get({filter:{ user: authorID }, limit:1}, abort.signal);
    getAvatar().then((res) => setAvatar(res.data[0]));
  }, [authorID]);

  return (
    <div className={style.item} data-first={isFirst}>
      <ImageLoader
        src={genAvatarUrl(avatar, '160x160')}
        layout={'fixed'}
        objectFit={'cover'}
        width={32}
        height={32}
      />
    </div>
  );
};

export default Item;