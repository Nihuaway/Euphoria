import style from './style.module.scss';
import { FC } from 'react';

export enum LoadingPos {
  left = -1,
  right = 1,
  center = 0,
}

interface LoadingProps {
  process: boolean;
  size?: number;
  background?: string;
  negative?: boolean;
  loadingXPos?: LoadingPos;
  loadingYPos?: LoadingPos;
  margin?: string;
}

const Loading: FC<LoadingProps> = ({
  process,
  size = 16,
  background = 'transparent',
  negative = false,
  loadingXPos = LoadingPos.center,
  loadingYPos = LoadingPos.center,
  margin = '',
}) => {
  const styleSet = {
    background: background,
    left: loadingXPos === -1 || loadingXPos === 0 ? '0' : 'auto',
    right: loadingXPos === 1 || loadingXPos === 0 ? '0' : 'auto',
    top: loadingYPos === -1 || loadingYPos === 0 ? '0' : 'auto',
    bottom: loadingYPos === 1 || loadingYPos === 0 ? '0' : 'auto',
  };

  return (
    <div className={style.parent} style={styleSet} data-process={process}>
      <div
        className={style.loading}
        style={{ width: size + 'px', height: size + 'px', margin: margin }}
        data-negative={negative}>
        <div className={style.center} />
        <div className={style.pick} />
        <div className={style.pick} />
        <div className={style.pick} />
        <div className={style.pick} />
        <div className={style.pick} />
        <div className={style.pick} />
        <div className={style.pick} />
        <div className={style.pick} />
      </div>
    </div>
  );
};

export default Loading;