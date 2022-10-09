import type { NextPage } from 'next';
import style from './style.module.scss';

import Icon, { IconVariant } from 'components/icon/icon';
import { IButtonState, IButtonTheme } from 'components/[ buttons ]/enums';
import { ChangeEvent, useEffect, useState } from 'react';
import ImageLoader from 'components/[ loaders ]/image/image';

interface props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove: (id: number) => void;

  src: string | null;

  theme?: IButtonTheme;
  isDisable?: boolean;

  canSize?: boolean;
  canMove?: boolean;

  id?: number;
}

const FileInput: NextPage<props> = ({
  children,
  onChange,
  onRemove,
  src,
  theme = IButtonTheme.day,
  canMove = false,
  canSize = false,
  isDisable = false,
  id= 0
}) => {

  return (
    <div data-theme={theme} className={style.parent} data-empty={!src} style={{width: '100%', height: '100%'}} data-disable={isDisable} data-size={canSize} data-move={canMove}>
      <label htmlFor={`inputTag${id}`} className={style.label}>
        <input
          id={`inputTag${id}`}
          type={'file'}
          disabled={isDisable || !!src}
          accept={'image/png, image/jpg, image/jpeg'}
          onChange={(e) => {
            !isDisable && !src? onChange(e) : null;
          }}
        />
        <div className={style.content}>{children}</div>
        <div className={style.image}>
          <ImageLoader
            radius={3}
            src={src}
            objectFit={'cover'}
            layout={'fill'}
          />
        </div>
      </label>
      <div className={style.close} onClick={() => !isDisable ? onRemove(id) : null}>
        <Icon id={IconVariant.close} size={14}/>
      </div>
      <div className={style.scale}>
        <input type={'range'} />
      </div>
    </div>
  );
};

export default FileInput;
