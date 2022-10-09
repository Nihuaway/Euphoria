import type { NextPage } from 'next';
import style from './style.module.scss';
import { ReactElement, useEffect, useState } from 'react';
import Icon, { IconVariant } from 'components/icon/icon';

interface props {
  size?: number;
  icon?: ReactElement | string | number;
}

const ErrorIcon: NextPage<props> = ({ children, size = 12, icon }) => {
  const [isOpened, setOpened] = useState(false);

  if(!children) return null;

  return (
    <div
      className={style.parent}
      data-opened={isOpened}
      onMouseEnter={() => setOpened(true)}
      onMouseLeave={() => setOpened(false)}>
      <div className={style.icon} style={{width: `${size}px`, height: `${size}px`}}>
        {icon ? icon : <Icon id={IconVariant.close} size={size - 8} />}
      </div>
      <div className={style.panel}>{children}</div>
    </div>
  );
};

export default ErrorIcon;