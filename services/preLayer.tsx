import type { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { UserActions } from 'stores/user/store';
import { useEffect } from 'react';
import $api from 'services/setAxios';

const PreLayer: NextPage = () => {
  const dispatch = useDispatch();
  const refresh = async () =>
    await $api.get('http://localhost:5000/api/auth/refresh', {
      withCredentials: true,
    });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      refresh().then((res) => {
        if (!res) return console.log('-- Authorisation Error! --');

        localStorage.setItem('token', res.data.access);
        dispatch({
          type: UserActions.SET_USER,
          payload: res.data.user,
        });
      });
    }
  }, []);

  return null;
};

export default PreLayer;
