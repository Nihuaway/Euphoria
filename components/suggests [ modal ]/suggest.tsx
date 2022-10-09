import type { NextPage } from 'next';
import style from './style.module.scss';
import React, { ReactElement, useEffect, useRef, useState } from 'react';
import SuggestItem from 'components/suggests [ modal ]/item/item';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';

const Suggest: NextPage = () => {
  const suggest = useSelector((state: IRootReducer) => state.suggest);

  const [contents, setContents] = useState<
    { id: number; suggest: ReactElement }[]
  >([]);

  useEffect(() => {
    if (!suggest) return;
    for (let i = 0; i < contents.length + 1; i++) {
      if (contents.filter((cont) => cont.id === i).length === 0) {
        setContents((prev) => [...prev, { id: i, suggest }]);
        break;
      }
    }
  }, [suggest]);

  return (
    <div className={style.parent}>
      {contents.reverse().map((content) => {
        return (
          <SuggestItem
            key={content.id}
            id={content.id}
            onRemove={(id) =>
              setContents((prev) => prev.filter((cont) => cont.id !== id))
            }>
            {content.suggest}
          </SuggestItem>
        );
      })}
    </div>
  );
};

export default Suggest;
