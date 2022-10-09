import type { NextPage } from 'next';
import style from 'components/[ pages ]/account/profile/menu/style.module.scss';
import Item from 'components/[ pages ]/account/profile/menu/item/item';
import { useEffect, useState } from 'react';

interface props {
  items: string[];
  selectedID: number;
  onClick: (id: number) => void;
}

const ProfileMenu: NextPage<props> = ({ items, selectedID,onClick }) => {
  const [id, setID] = useState(selectedID);

  useEffect(() => {
    setID(selectedID);
  }, [selectedID]);

  return (
    <div className={style.menu}>
      <div className={style.items}>
        {items.map((item, index) => {
          return (
            <Item
              key={index}
              text={item}
              selected={id === index}
              onClick={onClick}
              id={index}
            />
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ProfileMenu;
