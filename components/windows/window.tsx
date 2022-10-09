import type { NextPage } from 'next';
import style from 'components/windows/style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';
import { WindowActions } from 'stores/window/store';
import { IWindow } from 'interfaces/window';
import { useRouter } from 'next/router';

const Window: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const parentRef = useRef<HTMLDivElement>(null);
  const window = useSelector((state: IRootReducer) => state.window);

  const [windowTEMP, setWindowTEMP] = useState<IWindow | null>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    if (window) {
      if(windowTEMP){
        setVisible(false);
        setTimeout(()=>{
          setWindowTEMP(window);
        }, 350)
      }
      else{
        setWindowTEMP(window);
      }

      setVisible(true);
    } else {
      setVisible(false);
      setTimeout(() => {
        setWindowTEMP(null);
      }, 350);
    }
  }, [window]); // плавно меняет/убирает/ставит окно

  useEffect(()=>{
    setVisible(false);
    setTimeout(() => {
      setWindowTEMP(null);
    }, 350);
  }, [router.pathname, router.query]) // убирает окно если меняется ссылка

  const closeWindow = (target: EventTarget) => {
    if (target !== parentRef.current) return;
    dispatch({ type: WindowActions.HIDE });
  };

  return (
    <div
      ref={parentRef}
      className={style.parent}
      onMouseDown={(e) => closeWindow(e.target)}
      data-visible={isVisible}>
      <div className={style.window}>
        {windowTEMP?.content}
      </div>
    </div>
  );
};

export default Window;
