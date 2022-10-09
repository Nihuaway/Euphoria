import type { NextPage } from 'next';
import style from './style.module.scss';

interface props {
  items: (string | null)[];
  onSelect: (id: number) => void;
  isOpened: boolean;

  top?: number;
}

const Drop: NextPage<props> = ({ items, onSelect, isOpened, top = 45 }) => {
  return (
    <div className={style.parent} style={{ top: top + 'px' }}>
      <div className={style.drop} data-opened={isOpened}>
        {items.map((item, index) => {
          if (!item) return <hr key={index} />;
          return (
            <h4
              key={index}
              className={style.item}
              onClick={() => onSelect(index)}>
              {item}
            </h4>
          );
        })}
      </div>
    </div>
  );
};

export default Drop;