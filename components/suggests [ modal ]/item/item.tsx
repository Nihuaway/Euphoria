import type { NextPage } from 'next';
import style from './style.module.scss';
import { ReactElement, useEffect, useState } from 'react';

interface props{
  //content: ReactElement;
  id: number;
  onRemove: (id: number) => void;
}

const Item: NextPage<props> = ({children, id, onRemove}) => {
  const [isVisible, setVisible] = useState(true);
  const [removing, setRemoving] = useState(false);

  useEffect(()=>{
    if(isVisible){
      setTimeout(() => {
        setVisible(false);
      }, 3000)
    }
    else{

      setTimeout(() => {
        setRemoving(true);
        setTimeout(()=>{

          onRemove(id);
        }, 500)
      }, 500)

    }
  }, [isVisible])

  return (
    <div className={style.suggest} data-visible={isVisible} data-removing={removing}>
      {children}
    </div>
  );
};

export default Item;