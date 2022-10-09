import type { NextPage } from 'next';
import style from 'components/[ pages ]/home/left/style.module.scss';
import React from 'react';
import { useRouter } from 'next/router';
import { categoryItems, normalize, sortItems } from 'interfaces/query';
import Icon, { IconVariant } from 'components/icon/icon';
import Loading, { LoadingPos } from 'components/[ loaders ]/animation/Loading';
import Item, {
  ItemVariant,
  ItemStates,
} from 'components/[ pages ]/home/left/item/item';

interface props {
  category: string | undefined;
  sort: string | undefined;
  loading: boolean;
}

const Left: NextPage<props> = ({ category, sort, loading }) => {
  const router = useRouter();

  return (
    <div className={style.left}>
      <ol>
        {sortItems.map((item, index) => {
          const icons = [
            IconVariant.fire,
            IconVariant.star,
            IconVariant.follow,
          ];
          return (
            <Item
              id={index}
              key={index}
              variant={ItemVariant.sorting}
              func={(idRef) => {
                router.push(
                  {
                    pathname: '',
                    query: { ...router.query, sort: normalize(item, '-') },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
              state={
                normalize(sort, '-') === normalize(item, '-')
                  ? ItemStates.selected
                  : ItemStates.default
              }>
              <Icon id={icons[index]} size={20} />
              <h4>{item}</h4>
              <Loading
                process={loading && normalize(item, '-') === sort}
                negative={true}
                loadingXPos={LoadingPos.right}
                margin={'16px'}
              />
            </Item>
          );
        })}
      </ol>
      <div className={style.separator}>
        <hr />
        <h5>Categories</h5>
        <hr />
      </div>
      <ol>
        {categoryItems.map((item, index) => {
          return (
            <Item
              id={index}
              key={index}
              variant={ItemVariant.category}
              func={(idRef) => {
                router.push(
                  {
                    pathname: '',
                    query: { ...router.query, category: normalize(item, '-') },
                  },
                  undefined,
                  { shallow: true }
                );
              }}
              state={
                normalize(category, '-') === normalize(item, '-')
                  ? ItemStates.selected
                  : ItemStates.default
              }>
              <h4>{item}</h4>
              <Loading
                process={loading && normalize(item, '-') === category}
                negative={true}
                loadingXPos={LoadingPos.right}
                margin={'16px'}
              />
            </Item>
          );
        })}
      </ol>
    </div>
  );
};

export default Left;
