import type { NextPage } from 'next';
import style from './style.module.scss';

export interface IFlowProps{
  orient: 'left' | 'right' | 'top' | 'bottom';
  position: -1 | 0 | 1;
  isOpened: boolean;

}

const Flow: NextPage<IFlowProps> = ({orient, isOpened,position, children}) => {

  return (
    <div className={style.parent} data-orient={orient} data-opened={isOpened} data-position={position}>
      <div className={style.flow}>
        {children}
      </div>
    </div>
  );
};

export default Flow;