import type { NextPage } from 'next';
import style from './style.module.scss';
import Icon, { IconVariant } from 'components/icon/icon';
import React, { useEffect, useRef, useState } from 'react';
import UserRoute from 'routes/user/userRoute';
import { IFollowing, IUser } from 'interfaces/models/user';
import AuthorMiddleItem from 'components/[ items ]/author/middle/item';
import SimpleInput from 'components/[ inputs ]/simple/input';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import Loading from 'components/[ loaders ]/animation/Loading';
import ContentLoader from 'react-content-loader';

interface props {
  userID: string | null;
}

const FollowingsWindow: NextPage<props> = ({ userID }) => {
  const [authors, setAuthors] = useState<IUser[] | null>(null);
  const [name, setName] = useState<string>('');
  const [searchPROCESS, setSearchPROCESS] = useState(false);
  const [searchACTIVE, setSearchACTIVE] = useState(false);
  const [isScrollEnd, setScrollEnd] = useState(true);
  const [followings, setFollowings] = useState<IFollowing[] | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!userID) return;

    const getFollowers = async () =>
      await UserRoute.getSubscribers({ subscriber: userID });
    getFollowers().then((res) => setFollowings(res.data));
  }, [userID]); // получение автора

  const search = async (
    followers: IFollowing[] | null,
    name: string,
    abort?: AbortController
  ) => {
    if (!followers) return null;

    return await UserRoute.get(
      {
        filter: {
          _id: { $in: followers.map((follower) => follower.user) },
          name: { $regex: '^' + name, $options: 'i' },
        },
        limit: 20,
      },
      abort ? abort.signal : undefined
    );
  }; // поиск

  useEffect(() => {
    const abort = new AbortController();
    search(followings, name, abort).then((res) => setAuthors(res?.data));
    return () => abort.abort();
  }, [followings]); // вызов поиска и его результаты

  useEffect(() => {
    if (!scrollRef.current || !authors) return setScrollEnd(true);
    setScrollEnd(
      scrollRef.current.scrollHeight - scrollRef.current.scrollTop ===
        scrollRef.current.clientHeight
    );
  }, [authors]); // че то со скролом

  return (
    <div className={style.state}>
      <div className={style.title}>
        <div className={style.left}>
          <h1>Followings</h1>
          <TextLoader
            color={'rgba(34,34,34,0.75)'}
            font={fonts.h14}
            text={
              followings ? (followings.length > 0 ? 'Person' : 'Empty') : null
            }
            placeholder={'23 Persons'}
          />
        </div>
        <div style={{ width: '200px' }}>
          <SimpleInput
            value={name}
            isActive={searchACTIVE}
            onFocus={() => setSearchACTIVE(true)}
            onBlur={() => setSearchACTIVE(false)}
            autoComplete={'off'}
            onEnd={(e) => {
              setSearchPROCESS(true);
              // @ts-ignore
              search(followers, e.target.value).then((res) => {
                setAuthors(res?.data);
                setSearchPROCESS(false);
              });
            }}
            placeholder={"Author's name"}
            onChange={(e) => {
              setName(e.target.value);
              if (e.target.value === '') {
                setSearchPROCESS(true);
                search(followings, e.target.value).then((res) => {
                  setAuthors(res?.data);
                  setSearchPROCESS(false);
                });
              }
            }}
            leftInput={<Icon id={IconVariant.search} size={14} />}
            rightInput={
              <div style={{ width: '20px' }}>
                <Loading process={searchPROCESS} />
              </div>
            }
          />
        </div>
      </div>
      <div
        ref={scrollRef}
        className={style.content}
        onScroll={(e) => {
          setScrollEnd(
            //@ts-ignore
            e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
          );
        }}>
        {authors ? (
          authors.length > 0 ? (
            authors.map((author, index) => {
              return <AuthorMiddleItem author={author} key={index} />;
            })
          ) : (
            <div className={style.null}>
              <h3>{"We didn't find anything :("}</h3>
              <h4 style={{ opacity: '0.75' }}>
                {'Maybe you made a mistake in your request?'}
              </h4>
            </div>
          )
        ) : (
          [0, 1, 2, 3].map((index) => {
            return (
              <ContentLoader
                speed={2}
                key={index}
                width={344}
                height={56}
                viewBox="0 0 344 56"
                backgroundColor="#f3f3f3"
                foregroundColor="#eeeeee">
                <circle cx="28" cy="28" r="20" />
                <rect x="60" y="11" rx="3" ry="3" width="110" height="16" />
                <rect x="60" y="32" rx="3" ry="3" width="55" height="16" />
                <rect x="246" y="8" rx="3" ry="3" width="90" height="16" />
              </ContentLoader>
            );
          })
        )}
      </div>
      <div className={style.bottom} data-visible={!isScrollEnd}>
        <div
          className={style.clickable}
          onClick={() =>
            scrollRef.current
              ? scrollRef.current.scrollTo({
                  top:
                    scrollRef.current.scrollHeight -
                    scrollRef.current.clientHeight,
                  behavior: 'smooth',
                })
              : null
          }>
          <h4>Still down there</h4>
          <Icon id={IconVariant.arrowDOWN} size={14} />
        </div>
      </div>
    </div>
  );
};

export default FollowingsWindow;
