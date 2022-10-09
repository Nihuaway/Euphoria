import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Layout from 'components/layout/Layout';
import { UserActions } from 'stores/user/store';
import { IRootReducer } from 'stores/store';
import AuthRoute from 'routes/authRoute';
import style from './style.module.scss';
import SimpleInput from 'components/[ inputs ]/simple/input';
import SimpleButton, {
} from 'components/[ buttons ]/simple/button';
import { IButtonState } from 'components/[ buttons ]/enums';

const RegPage: NextPage = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [process, setProcess] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const reg = async () => {
    setProcess(true);
    await AuthRoute.registration(name, email, password).then((res) => {
      if(!res?.data){
        setProcess(false);
        return;
      }

      dispatch({ type: UserActions.SET_USER, payload: res.data });
      router.push(`/`, undefined, { shallow: false });
      setProcess(false);
    });
  };

  return (
    <Layout>
      <div className={style.fill}>
        <div className={style.central}>
          <div className={style.title}>
            <h1
              style={{ opacity: 0.5 }}
              onClick={() => router.push('/auth/login')}>
              Login
            </h1>
            <hr />
            <h1>Registration</h1>
          </div>
          <div className={style.content}>
            <SimpleInput
              topInput={
                <h4 style={{ marginLeft: '8px', userSelect: 'none' }}>Name</h4>
              }
              onChange={(e) => {
                setName(e.target.value);
              }}
              type={'text'}
              value={name}
            />
            <SimpleInput
              topInput={
                <h4 style={{ marginLeft: '8px', userSelect: 'none' }}>Email</h4>
              }
              type={'email'}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <SimpleInput
              type={'password'}
              topInput={
                <h4 style={{ marginLeft: '8px', userSelect: 'none' }}>Password</h4>
              }
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
          </div>
          <SimpleButton
            state={IButtonState.primary}
            func={reg}
            process={process}>
            Registration
          </SimpleButton>
        </div>
      </div>
    </Layout>
  );
};

export default RegPage;