import type { NextPage } from 'next';
import style from 'components/[ pages ]/shot/[ id ]/top/style.module.scss';
import Icon, { IconVariant } from 'components/icon/icon';
import SimpleButton from 'components/[ buttons ]/simple/button';
import { WindowActions } from 'stores/window/store';
import ListCollection from 'components/windows/[ states ]/collections/list/state';
import { ILike, IShot, IView } from 'interfaces/models/shot';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import React from 'react';
import { IUser } from 'interfaces/models/user';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import VSeparator from 'components/[ separates ]/vertical/separator';
import { ThemeVariant } from 'interfaces/enums';
import Separator from 'components/[ separates ]/horizontal/separator';
import AuthorItem from 'components/[ items ]/author/small/item';
import { IButtonState } from 'components/[ buttons ]/enums';

interface props {
  shotDB: IShot | null;
  likes: ILike[] | null;
  views: IView[] | null;
  authorID: string | null;
  isLiked: boolean;
  likePROCESS: boolean;
  onLike: () => void;
}

const ShotTopMenu: NextPage<props> = ({
  shotDB,
  authorID,
  likes,
  views,
  isLiked,
  likePROCESS,
  onLike,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={style.top}>
      <div className={style.left}>
        <div className={style.title}>
          <TextLoader
            font={fonts.h24}
            text={shotDB?.title}
            placeholder={'gkdfgjdfk'}
          />
        </div>

        <VSeparator height={'16px'} theme={ThemeVariant.day} />
        <AuthorItem authorID={authorID} />
      </div>
      <Separator theme={ThemeVariant.day} />
      <div className={style.right}>
        <SimpleButton
          state={IButtonState.secondary}
          isLoading={!shotDB}
          func={() => {
            if (shotDB) {
              dispatch({
                type: WindowActions.SET,
                payload: <ListCollection shotID={shotDB._id} />,
              });
            }
          }}>
          <Icon id={IconVariant.folder} size={14} />
          <h4>Save</h4>
        </SimpleButton>
        <Separator theme={ThemeVariant.day} />
        <SimpleButton
          state={isLiked ? IButtonState.primary : IButtonState.secondary}
          isLoading={!shotDB}
          func={onLike}
          process={likePROCESS || !shotDB}>
          {
            <Icon
              id={isLiked ? IconVariant.likeFILL : IconVariant.like}
              size={16}
            />
          }
          <div style={{width: '30px'}}>
            <TextLoader
              font={fonts.h14}
              text={likes?.length.toString()}
              placeholder={'395'}
              transparent={true}
              align={'right'}
            />
          </div>
        </SimpleButton>
      </div>
    </div>
  );
};

export default ShotTopMenu;
