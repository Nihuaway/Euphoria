import type { NextPage } from 'next';
import style from './style.module.scss';
import Layout from 'components/layout/Layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import AuthRoute from 'routes/authRoute';
import SimpleInput from 'components/[ inputs ]/simple/input';
import SimpleButton from 'components/[ buttons ]/simple/button';
import { IButtonState } from 'components/[ buttons ]/enums';
import { useDispatch } from 'react-redux';
import { SuggestActions } from 'stores/suggest/store';
import Icon, { IconVariant } from 'components/icon/icon';

const Page: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { token } = router.query;

  const [isInvalid, setInvalid] = useState(true);
  const [password_1, setPassword_1] = useState('');
  const [password_2, setPassword_2] = useState('');

  const [submitPROCESS, setSubmitPROCESS] = useState(false);

  useEffect(()=>{
    if(!token) return;
    const check = async () => await AuthRoute.restorePassCheck(token.toString());
    check().then(res => setInvalid(!res))
  }, [token])

  const submit = async () => {
    if(!token) return;

    const res = await AuthRoute.restorePass(password_2, token.toString());
    dispatch({type: SuggestActions.ADD, payload: (<>
        <Icon id={res?.data ? IconVariant.check : IconVariant.close} size={24}/>
        <h4>{res.message}</h4>
      </>)})
    await router.push('/auth/login');
  }

  if(isInvalid){
    return (
      <Layout>
        Invalid token
      </Layout>
    );
  }

  return (
    <Layout>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', gridRowGap: '16px'}}>
        <SimpleInput
          type={'password'}
          topInput={
            <h4 style={{ marginLeft: '8px', userSelect: 'none' }}>New Password</h4>
          }
          value={password_1}
          onChange={(e) => {
            setPassword_1(e.target.value);
          }}
        />
        <SimpleInput
          type={'password'}
          topInput={
            <h4 style={{ marginLeft: '8px', userSelect: 'none' }}>Repeat Password</h4>
          }
          value={password_2}
          onChange={(e) => {
            setPassword_2(e.target.value);
          }}
        />
        <SimpleButton state={IButtonState.secondary} func={submit} process={submitPROCESS}>
          Submit
        </SimpleButton>
      </div>
    </Layout>
  );
};

export default Page;