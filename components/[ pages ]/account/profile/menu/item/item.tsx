import type { NextPage } from 'next';
import style from 'components/[ pages ]/account/profile/menu/item/style.module.scss';

interface props{
  text: string
  id: number
  selected: boolean;
  onClick: (id: number) => void;
}

const Item: NextPage<props> = ({children, id, text, selected, onClick}) => {
  return (
    <div className={style.item} data-selected={selected} onClick={() => onClick(id)}>
      <h3>{text}</h3>
      <div className={style.line} />
    </div>
  );
};

export default Item;