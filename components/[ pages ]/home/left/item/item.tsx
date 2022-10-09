import type { NextPage } from 'next';
import style from 'components/[ pages ]/home/left/item/style.module.scss';
import React from 'react';

export enum ItemStates {
  selected = 'selected',
  default = 'default',
}

export enum ItemVariant {
  sorting = 'sorting',
  category = 'category',
}

interface props {
  id: number;
  state: ItemStates;
  variant: ItemVariant;
  func: (idRef: number) => void;
}

const Item: NextPage<props> = ({ id, state, variant, children, func }) => {
  return (
    <li
      className={style.item}
      data-state={state}
      data-variant={variant}
      onClick={() => {
        func(id);
      }}>
      {children}
    </li>
  );
};

export default Item;