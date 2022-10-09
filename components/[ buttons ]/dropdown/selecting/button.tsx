import React, { useEffect, useRef, useState } from 'react';
import style from 'components/[ buttons ]/dropdown/selecting/style.module.scss';
import Icon, { IconVariant } from 'components/icon/icon';
import Drop from 'components/[ buttons ]/dropdown/drop [ module ]/drop';

export enum ButtonDropState {
  primary = 'primary',
  secondary = 'secondary',
  disable = 'disable',
}

interface props {
  selectedID: number;
  defaultID: number;
  items: Array<string>;
  onChange: (id: number) => void;
}

const Button: React.FC<props> = ({
  selectedID,
  items,
  defaultID,
  onChange,
}) => {
  const [isOpened, setOpened] = useState(false);
  const [ID, setID] = useState(selectedID);
  let ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setID(selectedID);
  }, [selectedID]);

  const select = (id: number) => {
    setID(id);
    onChange(id);
  };

  useEffect(() => {
    // @ts-ignore
    const changeOpenStatus = (e: MouseEvent) => (!e.path.includes(ref.current)) ? setOpened(false) : null;
    document.body.addEventListener('click', (e) => changeOpenStatus(e));
    return () => document.body.removeEventListener('click', changeOpenStatus);
  }, []);

  return (
    <div
      ref={ref}
      onClick={() => {
        if (ID !== defaultID) select(defaultID);
        else setOpened((prev) => !prev);
      }}
      className={style.button}
      data-opened={isOpened}
      data-state={
        ID === defaultID ? ButtonDropState.secondary : ButtonDropState.primary
      }>
      <div className={style.content}>
        <h4>{items[ID]}</h4>
        <Icon
          id={ID === defaultID ? IconVariant.arrowDOWN : IconVariant.close}
          size={14}
        />
      </div>
      <Drop items={items} isOpened={isOpened} onSelect={select} />
    </div>
  );
};

export default Button;
