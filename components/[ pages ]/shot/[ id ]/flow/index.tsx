import type { NextPage } from 'next';
import style from 'components/[ pages ]/shot/[ id ]/flow/style.module.scss';
import IconButton  from 'components/[ buttons ]/icon/button';
import Icon, { IconVariant } from 'components/icon/icon';
import { WindowActions } from 'stores/window/store';
import ListCollection from 'components/windows/[ states ]/collections/list/state';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IShot } from 'interfaces/models/shot';
import ShotStatistic from 'components/windows/[ states ]/statistic';
import { IButtonState } from 'components/[ buttons ]/enums';
import ImageLoader from 'components/[ loaders ]/image/image';
import AvatarRoute from 'routes/user/avatarRoute';
import { genAvatarUrl } from 'scripts/genAvatarUrl';
import Flow from 'components/flows [ modal ]/flow';
import AuthorFlow from 'components/flows [ modal ]/[ states ]/author/state';
import { IAvatar } from 'interfaces/models/avatar';
import SimpleButton from 'components/[ buttons ]/simple/button';

interface props {
  shotID: string | null | undefined;
  authorID: string | null | undefined;

  isLiked: boolean;
  isLoading: boolean;
  likeProcess: boolean;
  likeHandler: () => void;
}

const ShotFlow: NextPage<props> = ({shotID,isLoading,authorID, isLiked, likeProcess, likeHandler}) => {
  const dispatch = useDispatch();
  const [avatar, setAvatar] =useState<IAvatar | null>(null);
  const [isProfileOpened, setProfileOpened] = useState<boolean>(false);

  useEffect(()=>{
    if(!authorID) return;
    const abort = new AbortController();
    const getAvatar = async () =>
      await AvatarRoute.get({filter:{ user: authorID }, limit: 1}, abort.signal);
    getAvatar().then((res) => setAvatar(res.data[0]));
    return () => abort.abort();
  }, [authorID])
  return (
    <div className={style.flow}>
      <div className={style.avatar} onMouseEnter={() => setProfileOpened(true)} onMouseLeave={() => setProfileOpened(false)}>
        <div className={style.image}>
          <ImageLoader radius={37} src={genAvatarUrl(avatar, '120x120')} width={37} height={37} layout={'fixed'} />
        </div>

        <Flow isOpened={isProfileOpened} orient={'left'} position={-1}>
          <AuthorFlow authorID={authorID} />
        </Flow>
      </div>
      <hr style={{width: '16px'}}/>
      <SimpleButton isLoading={isLoading} isStraightForm={true} process={likeProcess} func={likeHandler} state={isLiked ? IButtonState.primary : IButtonState.secondary}>
        <Icon id={!isLiked ? IconVariant.like: IconVariant.likeFILL} size={14}/>
      </SimpleButton>
      <SimpleButton isLoading={isLoading} isStraightForm={true} func={() => dispatch({type: WindowActions.SET,payload: <ListCollection shotID={shotID}/>})} state={IButtonState.secondary}>
        <Icon id={IconVariant.folder} size={14}/>
      </SimpleButton>
      <SimpleButton isLoading={isLoading} isStraightForm={true} func={() => dispatch({type: WindowActions.SET,payload: <ShotStatistic shotID={shotID}/>})} state={IButtonState.secondary}>
        <Icon id={IconVariant.info} size={14}/>
      </SimpleButton>
    </div>
  );
};

export default ShotFlow;