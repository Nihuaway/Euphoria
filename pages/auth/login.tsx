import type { NextPage } from 'next';
import style from './style.module.scss';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AuthRoute from 'routes/authRoute';
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../components/layout/Layout';
import { UserActions } from 'stores/user/store';
import { IRootReducer } from 'stores/store';
import SimpleButton, {
} from '../../components/[ buttons ]/simple/button';
import SimpleInput from 'components/[ inputs ]/simple/input';
import { IButtonState } from 'components/[ buttons ]/enums';

const LoginPage: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [result, setResult] = useState<string>();
  const [process, setProcess] = useState<boolean>(false);
  const router = useRouter();
  const user = useSelector((state: IRootReducer) => state.user);
  const dispatch = useDispatch();

  const login = async () => {
    setProcess(true);
    await AuthRoute.login(email, password).then((res) => {
      if (res.data) {

        dispatch({
          type: UserActions.SET_USER,
          payload: res.data,
        });
        router.push(`/`, undefined, { shallow: false });
      }

      setProcess(false);
    });
  };

  return (
    <Layout>
      <div className={style.fill}>
        <div className={style.central}>
          <div className={style.title}>
            <h1>Login</h1>
            <hr />
            <h1
              style={{ opacity: 0.5 }}
              onClick={() => router.push('/auth/reg')}>
              Registration
            </h1>
          </div>
          <div className={style.content}>
            <SimpleInput
              type={'email'}
              topInput={
                <h4 style={{ marginLeft: '8px', userSelect: 'none' }}>Email</h4>
              }
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <SimpleInput
              topInput={
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                  <h4 style={{ marginLeft: '8px', userSelect: 'none' }}>Password</h4>
                  <h4 style={{ marginRight: '8px', userSelect: 'none' }} onClick={() => {
                    AuthRoute.restorePassRequest(email);
                    router.push('/auth/restore/request')
                  }}>Restore</h4>
                </div>
              }
              type={'password'}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <SimpleButton
            state={IButtonState.primary}
            func={login}
            process={process}>
            Login
          </SimpleButton>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;