import { FC } from 'react';
import style from './style.module.scss';
import Loading from '../../[ loaders ]/animation/Loading';

export enum MiniButtonState {
  disabled = 'disabled',
  transparent = 'transparent',
  secondary = 'secondary',
  primary = 'primary',
}

interface Props {
  func: () => void;
  process?: boolean;
  state: MiniButtonState;

  hide?: boolean;
}

const Button: FC<Props> = ({
  func,
  process = false,
  state,
  children,
  hide = false,
}) => {
  return (
    <div
      className={style.button}
      onClick={func}
      data-state={state}
      data-process={process}
      style={hide ? { pointerEvents: 'none' } : {}}>
      <Loading size={14} process={process} negative={false} />
      <div className={style.content} style={hide ? { opacity: '0' } : {}}>
        {children}
      </div>
    </div>
  );
};

export default Button;
