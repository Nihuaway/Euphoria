import type { NextPage } from 'next';
import style from './style.module.scss';
import SimpleButton from 'components/[ buttons ]/simple/button';
import Icon, { IconVariant } from 'components/icon/icon';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';
import Button_DROPPUSH from 'components/[ buttons ]/dropdown/default/button';
import { genAvatarUrl } from 'scripts/genAvatarUrl';
import { useEffect, useState } from 'react';
import Separator from 'components/[ separates ]/vertical/separator';
import { ThemeVariant } from 'interfaces/enums';
import ImageLoader from 'components/[ loaders ]/image/image';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import AuthRoute from 'routes/authRoute';
import { IButtonState } from 'components/[ buttons ]/enums';
import AvatarRoute from 'routes/user/avatarRoute';
import { WindowActions } from 'stores/window/store';
import AccountWindow from 'components/windows/[ states ]/account/state';
import { IAvatar } from 'interfaces/models/avatar';

const Right: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: IRootReducer) => state.user);
  const [avatar, setAvatar] = useState<IAvatar | null>(null);

  const select = async (id: number) => {
    if (id === 0) await router.push(`/user/${user.id}`);
    if (id === 3)
      await router.push({
        pathname: `/user/${user.id}`,
        query: {
          page: 'shots',
        },
      });
    if (id === 4)
      await router.push({
        pathname: `/user/${user.id}`,
        query: {
          page: 'likes',
        },
      });
    if (id === 5)

      await router.push({
        pathname: `/user/${user.id}`,
        query: {
          page: 'collections',
        },
      });
    if (id === 7) {
      dispatch({
        type: WindowActions.SET,
        payload: <AccountWindow />,
      });
    }
    if (id === 9) {
      AuthRoute.logout();
      router.reload();
    }
  };

  useEffect(() => {
    if (!user) return;
    const abort = new AbortController();
    const getAvatar = async () => await AvatarRoute.get({filter:{ user: user.id }, limit:1}, abort.signal);
    getAvatar().then((res) =>setAvatar(res?.data ? res.data[0] : null))
    return () => abort.abort();
  }, [user]); // получение аватарки

  if (!user) {
    return (
      <div className={style.right}>
        <SimpleButton
          state={IButtonState.primary}
          func={() => router.push('/auth/login')}>
          Login | Registration
        </SimpleButton>
      </div>
    );
  } // если без логина то кнопка логина

  return (
    <div className={style.right}>
      <div className={style.button}>
        <Button_DROPPUSH
          items={[
            'Profile',
            'Edit Profile',
            null,
            'My Shots',
            'My Likes',
            'My Collections',
            null,
            'Edit Account',
            null,
            'Logout',
          ]}
          onChange={select}
          isDisabled={false}
          top={60}>
          <div className={style.avatar}>
            <ImageLoader
              src={genAvatarUrl(avatar, '360x360')}
              layout={'responsive'}
              objectFit={'cover'}
              height={24}
              width={24}
            />
          </div>
          <div className={style.text}>
            <TextLoader
              font={fonts.h14}
              text={user.name}
              placeholder={'initial'}
            />
          </div>
        </Button_DROPPUSH>
      </div>
      <Separator theme={ThemeVariant.day} height={'16px'} />
      <SimpleButton
        state={IButtonState.secondary}
        func={() => router.push('/shot/upload', undefined, { shallow: false })}>
        <Icon size={14} id={IconVariant.plus} />
        Upload
      </SimpleButton>
    </div>
  );
};

export default Right;
