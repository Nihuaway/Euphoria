import style from 'components/grid/style.module.scss';
import React, { FC, ReactElement } from 'react';
import Empty from 'components/grid/empty/empty';

interface GridProps {
  items: ReactElement[] | null | undefined;
  isLoading: boolean;
  title: { empty: string; loading: string };
  description: { empty: string; loading: string };

}

const Grid: FC<GridProps> = ({ items, isLoading, title, description }) => {
  console.log(items)
  return (
    <div className={style.parent}>
      <div className={style.grid} data-loading={isLoading}>
        {items?.map((item, index) => {
          return (
            <li key={index} className={style.item}>
              {item}
            </li>
          );
        })}
      </div>
      <Empty
        image={true}
        title={title}
        description={description}
        visible={!isLoading && items?.length === 0}
      />
    </div>
  );
};

export default Grid;
