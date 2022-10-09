import type { NextPage } from 'next';
import style from 'components/[ pages ]/shot/[ id ]/bottom/style.module.scss';
import SimpleButton from 'components/[ buttons ]/simple/button';
import Icon, { IconVariant } from 'components/icon/icon';
import { useRouter } from 'next/router';
import { IShot } from 'interfaces/models/shot';
import ShotController from 'routes/shot/shotRoute';
import { IButtonState } from 'components/[ buttons ]/enums';
import { useDispatch } from 'react-redux';
import EditShot from 'components/windows/[ states ]/shot/edit/state';
import { WindowActions } from 'stores/window/store';
import Button from 'components/[ buttons ]/simple/button';
import ShotRoute from 'routes/shot/shotRoute';
import { SuggestActions } from 'stores/suggest/store';
import React from 'react';

interface props{
  shot: IShot | null;
}

const ShotBottom: NextPage<props> = ({shot}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const remove = async () => {
    if(!shot) return;
    const response = await ShotController.remove(shot._id);
    if (!response.data) return alert(response.message);
    await router.push(`/`);
  };

  if(!shot){
    return null;
  }

  return (
    <div className={style.bottom}>
      <SimpleButton
        state={IButtonState.secondary}
        func={() => dispatch({type: WindowActions.SET, payload:<EditShot shotID={shot._id} />})}>
        <Icon id={IconVariant.edit} size={14} />
        Edit
      </SimpleButton>
      <hr />
      <SimpleButton state={IButtonState.secondary} func={remove}>
        <Icon id={IconVariant.close} size={14} />
        Remove
      </SimpleButton>
    </div>
  );
};

export default ShotBottom;