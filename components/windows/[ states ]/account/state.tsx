import type { NextPage } from 'next';
import style from './style.module.scss';
import React, { useEffect, useState } from 'react';
import SimpleButton from 'components/[ buttons ]/simple/button';
import { IButtonState } from 'components/[ buttons ]/enums';
import { WindowActions } from 'stores/window/store';
import { SuggestActions } from 'stores/suggest/store';
import Icon, { IconVariant } from 'components/icon/icon';
import UserRoute from 'routes/user/userRoute';
import SimpleInput from 'components/[ inputs ]/simple/input';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';

const AccountWindow: NextPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootReducer) => state.user);
  const [savePROCESS, setSavePROCESS] = useState(false);

  useEffect(() => {
    if (user) dispatch({ type: WindowActions.SET_LOADED });
  }, [user]); // проверка на готовность

  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  return (
    <div className={style.state}>
      <div className={style.title}>
        <h1>Edit Account</h1>
        <h4>Set up your Dribbble presence and hiring needs</h4>
      </div>
      <div className={style.content}>
        <SimpleInput
          topInput={
            <h4 style={{ marginLeft: '8px', userSelect: 'none' }}>Email</h4>
          }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <SimpleInput
          topInput={
            <h4 style={{ marginLeft: '8px', userSelect: 'none' }}>
              Do you want a new password? Then here
            </h4>
          }
          value={password}
          type={'password'}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={'new-password'}
        />
      </div>
      <div className={style.bottom}>
        <SimpleButton
          state={IButtonState.secondary}
          func={() => dispatch({ type: WindowActions.HIDE })}>
          Cancel
        </SimpleButton>
        <SimpleButton
          state={
            email !== user.email || password
              ? IButtonState.secondary
              : IButtonState.disable
          }
          process={savePROCESS}
          func={async () => {
            setSavePROCESS(true);

            if (email !== user.email) {
              const editRES = await UserRoute.edit({ email });
              dispatch({
                type: SuggestActions.ADD,
                payload: (
                  <>
                    <Icon
                      id={editRES.data ? IconVariant.check : IconVariant.close}
                      size={16}
                    />
                    <h4>{editRES.message}</h4>
                  </>
                ),
              });
            }
            if (password) {
              const passRES = await UserRoute.editPass(password);
              dispatch({
                type: SuggestActions.ADD,
                payload: (
                  <>
                    <Icon
                      id={passRES.data ? IconVariant.check : IconVariant.close}
                      size={16}
                    />
                    <h4>{passRES.message}</h4>
                  </>
                ),
              });
            }

            setSavePROCESS(false);
            dispatch({ type: WindowActions.HIDE });
          }}>
          Save
        </SimpleButton>
      </div>
    </div>
  );
};

export default AccountWindow;
