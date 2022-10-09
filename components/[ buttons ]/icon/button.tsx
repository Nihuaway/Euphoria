import type { NextPage } from 'next';
import style from './style.module.scss';
import Icon, { IconVariant } from 'components/icon/icon';
import Loading from 'components/[ loaders ]/animation/Loading';
import { useState } from 'react';
import Flow from 'components/flows [ modal ]/flow';
import { IButtonState, IButtonTheme } from 'components/[ buttons ]/enums';

export enum IconState {
  disabled = 'disabled',
  secondary = 'secondary',
  primary = 'primary',
}

interface props {
  icon: IconVariant;
  state: IButtonState;
  theme?: IButtonTheme;
  onClick: () => void;
  process?: boolean;
  size?: number;

  description?: string;
  orient?: 'left' | 'right' | 'top' | 'bottom';
  position?: -1 | 0 | 1;
}

const Button: NextPage<props> = ({
  icon,
  state,
  onClick,
  process=false,
                                   theme = IButtonTheme.day,
                                   size = 14,
  description,
  orient = 'left',
  position = 1
}) => {
  const [isOpened, setOpened] = useState(false);

  return (
    <div
      className={style.button}
      data-state={state}
      data-process={process}
      data-theme={theme}
      onClick={onClick}
      onMouseEnter={() => setOpened(true)}
      onMouseLeave={() => setOpened(false)}>
      <Loading process={process} size={size} />
      <div className={style.content}>
        <Icon id={icon} size={size} />
      </div>
      {description ? (
        <Flow orient={orient} isOpened={isOpened} position={position}>
          <h5 style={{padding: '8px 16px'}}>{description}</h5>
        </Flow>
      ) : null}
    </div>
  );
};

export default Button;
