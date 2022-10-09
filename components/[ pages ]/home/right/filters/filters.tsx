import React, { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ETimeFrame, normalize, timeFrameItems } from 'interfaces/query';
import style from 'components/[ pages ]/home/right/filters/style.module.scss';
import Search from 'components/[ pages ]/home/right/filters/search/search';
import DropButton, {
  ButtonDropState,
} from 'components/[ buttons ]/dropdown/selecting/button';
import SimpleInput from 'components/[ inputs ]/simple/input';
import Icon, { IconVariant } from 'components/icon/icon';
import Loading from 'components/[ loaders ]/animation/Loading';

interface props {
  category: string | undefined;
  sort: string | undefined;
  time: string | undefined;
  tag: string | undefined | null;
  search: string;
}

const Filters: FC<props> = ({ category, sort, time, tag, search }) => {
  const router = useRouter();

  const time_items = [
    ETimeFrame.week,
    ETimeFrame.month,
    ETimeFrame.year,
    ETimeFrame.all,
    ETimeFrame.now,
  ];

  const [tagValue, setTagValue] = useState<string | null | undefined>(tag);
  const [search_value, set_search_value] = useState('');

  const [isTagSearchPROCESS, setTagSearchPROCESS] = useState(false);
  const [isTagInputActive, setTagInputActive] = useState(false);

  const [time_index, set_time_index] = useState(
    time_items.findIndex(
      (value) => normalize(value, '-') === normalize(time, '-')
    ) >= 0
      ? time_items.findIndex(
          (value) => normalize(value, '-') === normalize(time, '-')
        )
      : 3
  );

  useEffect(() => {
    setTagValue(tag);
    set_time_index(
      time_items.findIndex(
        (value) => normalize(value, '-') === normalize(time, '-')
      ) >= 0
        ? time_items.findIndex(
            (value) => normalize(value, '-') === normalize(time, '-')
          )
        : 3
    );
  }, [tag, time]); //получение параметров из props

  return (
    <div className={style.filters}>
      <div className={style.filtersLeft}>
        <SimpleInput
          id={'tag'}
          value={tagValue}
          placeholder={'Tags...'}
          onFocus={() => setTagInputActive(true)}
          onBlur={() => setTagInputActive(false)}
          onChange={(e) => setTagValue(e.target.value)}
          onEnd={(e) => {
            // @ts-ignore
            const value = e.target.value;
            if (!value) {
              router.push({
                pathname: '/',
                query: { ...router.query, tag: undefined },
              }, undefined, {shallow: false});
              setTagValue(value);
            } else {
              router.push(
                {
                  pathname: '',
                  query: { ...router.query, tag: normalize(value, '-') },
                },
                undefined,
                { shallow: false }
              )
            }
          }}
          isActive={isTagInputActive}
          autoComplete={'off'}
          leftInput={<Icon id={IconVariant.search} size={14} />}
          rightInput={
            <div style={{ width: '20px' }}>
              <Loading process={isTagSearchPROCESS} />
            </div>
          }
        />
        <hr />
        <DropButton
          selectedID={time_index}
          defaultID={3}
          items={time_items}
          onChange={(id) =>
            router.push(
              {
                pathname: '',
                query: {
                  ...router.query,
                  time: normalize(time_items[id], '-'),
                },
              },
              undefined,
              { shallow: true }
            )
          }
        />
      </div>
      <hr />

      <Search value={search} />
    </div>
  );
};

export default Filters;
