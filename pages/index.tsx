import type { NextPage } from 'next';
import style from './style.module.scss';
import Layout from '../components/layout/Layout';
import React, { FC, useEffect, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { IShot } from 'interfaces/models/shot';
import { IRootReducer } from 'stores/store';
import { ShotsActions } from 'stores/shots/store';
import { ECategory, ESorting, ETimeFrame } from 'interfaces/query';
import Filters from '../components/[ pages ]/home/right/filters/filters';
import Menu_CATEGORIES from 'components/[ pages ]/home/left/index';
import ShotRoute from 'routes/shot/shotRoute';
import Head from 'next/head';
import { prepare } from 'services/prepareQuery';
import Grid from 'components/grid/grid';
import ShotItem from 'components/[ items ]/shot/default/item';
import Icon, { IconVariant } from 'components/icon/icon';
import shotsMap from 'components/grid/maps/shots';

interface HomeProps {
  shotsDB: IShot[] | null;
}

interface IRouter extends NextRouter {
  query: {
    category: string | undefined;
    sort: string | undefined;
    time: string | undefined;
    search: string | undefined;
    tag: string | undefined;
  };
}

const Home: NextPage<HomeProps> = ({ shotsDB }) => {
  const dispatch = useDispatch();
  const router: IRouter = useRouter() as IRouter;
  const shots = useSelector((state: IRootReducer) => state.shots);
  const user = useSelector((state: IRootReducer) => state.user);

  const [category, setCategory] = useState<string>('');
  const [sort, setSort] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const [search, setSearch] = useState<string>('');

  const [isFirstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    setCategory(router.query.category ? router.query.category : ECategory.all);
    setSort(router.query.sort ? router.query.sort : ESorting.popular);
    setTime(router.query.time ? router.query.time : ETimeFrame.all);
    setTag(router.query.tag ? router.query.tag : '');
    setSearch(router.query.search ? router.query.search : '');
  }, [router.query]); //получение параметров из адреса

  const SendShotsRequest = async (category: string, sort: string, time: string, tag: string, search: string, signal?: AbortSignal) => {
    const query = prepare(category, sort, time, tag, search, 10);
    const shots = await ShotRoute.get(
      {filter:query.filter,
        sort:query.sort,
        limit:query.limit,
        followings: sort == ESorting.following.toLowerCase() && user ? user.id : null}, signal
    );
    return shots.data;
  }

  useEffect(()=>{
    if(!isFirstLoad) return;
    dispatch({ type: ShotsActions.SET, payload: shotsDB });
  }, [shotsDB])

  useEffect(() => {
    if(isFirstLoad && shotsDB) return setFirstLoad(false);
    const abort = new AbortController();
    dispatch({ type: ShotsActions.SET, payload: null });
    SendShotsRequest(category, sort, time, tag, search, abort.signal).then((res) =>
      dispatch({
        type: ShotsActions.SET,
        payload: res,
      })
    ).catch(error => console.log('222222222222222222222222',error));
    return () => abort.abort();
  }, [category, sort, time, search, tag]); //установка в глобальный стор

  return (
    <Layout>
      <Head>
        <title>Gallery</title>
      </Head>
      <div
        className={style.page}
        style={{ pointerEvents: !shots ? 'none' : 'all' }}>
        <Menu_CATEGORIES loading={!shots} category={category} sort={sort} />
        <div className={style.main}>
          <div className={style.top}>
            <Filters
              category={category}
              sort={sort}
              time={time}
              tag={tag}
              search={search}
            />
            {search ? (
              <div className={style.search}>
                <div className={style.close} onClick={() => router.push({pathname: '/', query: {...router.query, search: undefined}}, undefined, {shallow: false})}>
                  <Icon id={IconVariant.close} size={14}/>
                </div>
                <h3>{search}</h3>
                <h4>{shots ? `Discover 10,000+ ${search} designs, illustrations, and graphic elements` : 'looking into every corner...'}</h4>
              </div>
            ) : null}
            {tag ? (
              <div className={style.search}>
                <div className={style.close} onClick={() => router.push({pathname: '/', query: {...router.query, tag: undefined}}, undefined, {shallow: false})}>
                  <Icon id={IconVariant.close} size={14}/>
                </div>
                <h3># {tag}</h3>
                <h4>{shots ? `Discover 10,000+ # ${tag} designs, illustrations, and graphic elements` : 'looking into every corner...'}</h4>
              </div>
            ) : null}
          </div>
          <Grid
            title={{ empty: "We didn't find anything", loading: '' }}
            description={{
              empty: 'Maybe you should say one magic word? 😊',
              loading: '',
            }}
            items={shotsMap(shots)}
           isLoading={!shots}/>
        </div>
      </div>
    </Layout>
  );
};

Home.getInitialProps = async ({ query, req }) => {
  if (!req) {
    return { shotsDB: null };
  }

  const category = query?.category ? query.category.toString() : ECategory.all;
  const sort = query?.sort ? query.sort.toString() : ESorting.popular;
  const time = query?.time ? query.time.toString() : ETimeFrame.all;
  const tag = query?.tag ? query.tag.toString() : '';
  const search = query?.search ? query.search.toString() : '';

  const queryDone = prepare(category, sort, time, tag, search, 10);
  const shots = await ShotRoute.get(
    {filter:queryDone.filter,
      sort:queryDone.sort,
      limit:queryDone.limit}
  );

  return { shotsDB: shots.data };
};

export default Home;


//TODO: skeletonreact
//TODO: другой принцип классов scss
//TODO: адаптация
//TODO: lodash где то применить
//TODO: qs?
//TODO:
//TODO: