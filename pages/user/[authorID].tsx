import { NextPage } from 'next';
import Layout from 'components/layout/Layout';
import style from 'pages/user/style.module.scss';
import Profile from 'components/[ pages ]/account/profile/profile';
import { NextRouter, useRouter } from 'next/router';
import MyShots from 'components/[ pages ]/account/pages/shots';
import MyCollections from 'components/[ pages ]/account/pages/collections';
import React, { useEffect, useState } from 'react';
import UserRoute from 'routes/user/userRoute';
import { IUser } from 'interfaces/models/user';
import About from 'components/[ pages ]/account/pages/about/about';
import Head from 'next/head';
import ShotController from 'routes/shot/shotRoute';
import MyDrafts from 'components/[ pages ]/account/pages/drafts';
import MyLikes from 'components/[ pages ]/account/pages/likes';

interface IRouter extends NextRouter {
  query: {
    authorID: string;
    page: string;
  };
}

const AccountPage: NextPage = () => {
  const router: IRouter = useRouter() as IRouter;
  const authorID = router.query.authorID;
  const page = router.query.page ? router.query.page : 'shots';

  const [author, setAuthor] = useState<IUser | null>(null);

  useEffect(() => {
    setAuthor(null);
    if (!authorID) return;
    const abort = new AbortController();
    const getAuthor = async () => await UserRoute.get({filter:{ _id: authorID }, limit: 1}, abort.signal);
    getAuthor().then((res) => setAuthor(res.data[0]));
    return () => abort.abort();
  }, [authorID]);

  return (
    <Layout>
      <Head>
        <title>{author ? author.name : 'author'}</title>
      </Head>
      <div
        className={style.page}
        style={{ pointerEvents: author ? 'all' : 'none' }}>
        <Profile authorID={authorID} page={page} />
        <div className={style.main}>
          {page === 'likes' ? (
            <MyLikes
              author={author}
              title={{ empty: 'Likes is empty', loading: '' }}
              description={{
                empty: 'As soon as you like something, it will be added here',
                loading: '',
              }}
            />
          ) : null}
          {page === 'shots' ? (
            <MyShots
              author={author}
              title={{ empty: "You don't have shots", loading: '' }}
              description={{ empty: 'So create them 😉', loading: '' }}
            />
          ) : null}
          {page === 'drafts' ? (
            <MyDrafts
              filter={
                author ? { _id: { $in: author?.shots }, isDraft: true } : null
              }
              title={{ empty: "You don't have drafts", loading: '' }}
              description={{ empty: 'A draft is a draft...', loading: '' }}
            />
          ) : null}
          {page === 'collections' ? <MyCollections author={author} /> : null}
          {page === 'about' ? <About author={author} /> : null}
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
