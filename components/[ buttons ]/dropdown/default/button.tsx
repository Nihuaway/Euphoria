import type { NextPage } from 'next';
import style from './style.module.scss';
import Icon, { IconVariant } from 'components/icon/icon';
import { useEffect, useRef, useState } from 'react';
import Drop from 'components/[ buttons ]/dropdown/drop [ module ]/drop';

interface props {
  items: (string | null)[];
  top?: number;
  onChange: (id: number) => void;
  isDisabled: boolean;
}

const Button: NextPage<props> = ({ items, onChange, isDisabled, top = 45,children }) => {
  const [isOpened, setOpened] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-ignore
    const changeOpenStatus = (e: MouseEvent) => (!e.path.includes(ref.current)) ? setOpened(false) : null;
    document.body.addEventListener('click', (e) => changeOpenStatus(e));
    return () => document.body.removeEventListener('click', changeOpenStatus);
  }, []);

  return (
    <div
      ref={ref}
      className={style.button}
      data-opened={isOpened}
      data-disabled={isDisabled}
      onClick={(e) => {
        setOpened((prev) => !prev);
      }}>
      <div className={style.content}>
        {children}
        <div className={style.icon}>
          <Icon id={IconVariant.arrowDOWN} size={14} />
        </div>
      </div>
      <Drop items={items} isOpened={isOpened} onSelect={onChange} top={top}/>
    </div>
  );
};

export default Button;
