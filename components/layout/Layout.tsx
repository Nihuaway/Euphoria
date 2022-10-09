import type { NextPage } from 'next'
import Header from "components/header/index";
import style from 'components/layout/style.module.scss';
import { useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';
const Layout: NextPage<{isDisable?: boolean}> = ({children, isDisable}) => {
  const title = useSelector((state: IRootReducer) => state.title);
  return (
    <>
      <Header/>


      <div className={style.scroll}>
        <div className={style.wrap} data-disable={isDisable}>
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;