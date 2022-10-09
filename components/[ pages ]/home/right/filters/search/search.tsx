import type { NextPage } from 'next';
import style from 'components/[ pages ]/home/right/filters/search/style.module.scss';
import ShotItem from 'components/[ pages ]/home/right/filters/search/shot-item/item';
import React, { useEffect, useRef, useState } from 'react';
import { IShot } from 'interfaces/models/shot';
import ShotController from 'routes/shot/shotRoute';
import { IUser } from 'interfaces/models/user';
import UserRoute from 'routes/user/userRoute';
import AuthorMiddleItem from 'components/[ items ]/author/middle/item';
import { router } from 'next/client';
import { useRouter } from 'next/router';
import SimpleInput from 'components/[ inputs ]/simple/input';
import Icon, { IconVariant } from 'components/icon/icon';
import Loading from 'components/[ loaders ]/animation/Loading';
import { IButtonTheme } from 'components/[ buttons ]/enums';

interface props {
  value: string;
}

const Search: NextPage<props> = ({ value }) => {
  const router = useRouter();
  const search_query = router.query.search?.toString();
  const [search_value, set_search_value] = useState(value);
  const [shots, setShots] = useState<IShot[] | null>(null);
  const [authors, setAuthors] = useState<IUser[] | null>(null);
  const [isActive, setActive] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isTyping, setTyping] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const changeActive = (e: MouseEvent) => {
      // @ts-ignore
      if (!e.path.includes(ref.current)) setActive(false);
    }
    document.body.addEventListener('click', changeActive);
    return () => document.body.removeEventListener('click', changeActive)
  }, []);

  useEffect(() => {
    if (!search_query) return;
    set_search_value(search_query);
  }, [search_query]);

  const search = (value: string) => {
    if (!value) return;
    setTyping(false);
    setLoading(true);
    setShots(null);
    setAuthors(null);
    const abort = new AbortController();

    const getShots = async () =>
      await ShotController.get(
        {
          filter: {
            title: {
              $regex: '^' + value,
              $options: 'i',
            },
            isDraft: false,
          },
          limit: 4,
        },
        abort.signal
      );

    getShots().then((res) => setShots(res.data));

    const getAuthors = async () =>
      await UserRoute.get(
        {
          filter: {
            name: {
              $regex: '^' + value,
              $options: 'i',
            },
            isDelete: false,
          },
          limit: 6,
        },
        abort.signal
      );
    getAuthors().then((res) => setAuthors(res.data));
    return () => abort.abort();
  };

  useEffect(() => {
    if (authors && shots && isLoading) setLoading(false);
  }, [authors, shots, isLoading]);

  useEffect(() => {
    setTyping(!!search_value);
    setActive(!!search_value);
  }, [search_value]);

  useEffect(() => {
    if (isActive) {
      setShots(null);
      setAuthors(null);
    }
  }, [isActive]);

  return (
    <div ref={ref}>
      <SimpleInput
        value={search_value}
        placeholder={'Search...'}
        onFocus={() => setActive(true)}
        onValidate={(e) =>
          e.target.value.replace(
            /[^\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu,
            ''
          )
        }
        onChange={(e) => set_search_value(e.target.value)}
        onEnd={(e) => {
          // @ts-ignore
          const value = e.target.value;
          if (!value) {
            router.push(
              {
                pathname: '/',
                query: { ...router.query, search: undefined },
              },
              undefined,
              { shallow: false }
            );
            set_search_value(value);
          } else {
            search(value);
          }
        }}
        isActive={isActive}
        autoComplete={'off'}
        leftInput={<Icon id={IconVariant.search} size={14} />}
        rightInput={
          <div style={{ width: '20px' }}>
            <Loading process={isLoading} />
          </div>
        }
      />

      <div
        className={style.popup}
        data-opened={isActive && !isTyping ? !!(shots && authors) : false}>
        {shots?.map((shot, index) => {
          if (index > 2)
            return (
              <div
                className={style.more}
                onClick={() =>
                  router.push({
                    pathname: '/',
                    query: { ...router.query, search: search_value },
                  })
                }>
                <hr />
                <div className={style.title}>
                  <h5>We found {shots?.length - 3} more shots.</h5>
                  <h5>Take a look</h5>
                </div>
                <hr />
              </div>
            );
          return <ShotItem shot={shot} key={shot._id} />;
        })}
        {authors?.map((author, index) => {
          if (index > 4) return;
          return (
            <AuthorMiddleItem
              theme={IButtonTheme.night}
              key={author.id}
              author={author}
            />
          );
        })}
        {shots?.length === 0 && authors?.length === 0 ? (
          <div className={style.null}>
            <h4>{`We didn't find anything :(`}</h4>
            <h5>{'Maybe you made a mistake in your request?'}</h5>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Search;
