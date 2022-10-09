import type { NextPage } from 'next';
import style from './style.module.scss';
import ImageLoader from 'components/[ loaders ]/image/image';
import { genAvatarUrl } from 'scripts/genAvatarUrl';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import AuthorFlow from 'components/flows [ modal ]/[ states ]/author/state';
import React, { useEffect, useState } from 'react';
import { IUser } from 'interfaces/models/user';
import { useRouter } from 'next/router';
import Flow from 'components/flows [ modal ]/flow';
import AvatarRoute from 'routes/user/avatarRoute';
import { IAvatar } from 'interfaces/models/avatar';
import UserRoute from 'routes/user/userRoute';
import ContentLoader from 'react-content-loader';

interface props {
  authorID: string | null;
}

const Item: NextPage<props> = ({ authorID }) => {
  const router = useRouter();

  const [author, setAuthor] = useState<IUser | null>(null);
  const [avatar, setAvatar] = useState<IAvatar | null>(null);
  const [isOpened, setOpened] = useState<boolean>(false);

  useEffect(() => {
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
  }, [authorID]); //получение автора

  useEffect(() => {
    setAvatar(null);
    if (!author) return;
    const abort = new AbortController();
    const getAvatar = async () =>
      await AvatarRoute.get(
        { filter: { user: author.id }, limit: 1 },
        abort.signal
      );
    getAvatar().then((res) => setAvatar(res.data[0]));

    return () => abort.abort();
  }, [author]);

  return (
    <div onMouseLeave={() => setOpened(false)}>
      <div
        className={style.item}
        onClick={() => (author ? router.push('/user/' + author.id) : null)}
        onMouseEnter={() => setOpened(!!author)}>
        {author ? (
          <>
            <div style={{ width: '20px', height: '20px' }}>
              <ImageLoader
                src={genAvatarUrl(avatar, '360x360')}
                layout={'responsive'}
                width={20}
                height={20}
                objectFit={'cover'}
                radius={50}
              />
            </div>
            <TextLoader
              font={fonts.h14}
              text={author?.name}
              placeholder={'gfgddggdgfg'}
            />
          </>
        ) : (
          <ContentLoader
            speed={2}
            width={110}
            height={20}
            viewBox="0 0 110 20"
            backgroundColor="#f3f3f3"
            foregroundColor="#eeeeee">
            <circle cx="10" cy="10" r="10" />
            <rect x="28" y="3" rx="3" ry="3" width="80" height="14" />
          </ContentLoader>
        )}
      </div>
      <Flow isOpened={isOpened} orient={'bottom'} position={1}>
        <AuthorFlow authorID={author?.id} />
      </Flow>
    </div>
  );
};

export default Item;
