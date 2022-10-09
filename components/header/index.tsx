import { NextPage } from 'next';
import style from 'components/header/style.module.scss';
import Right from 'components/header/right';
import Left from 'components/header/left';

const Header: NextPage = () => {
  return (
    <div className={style.parent}>
      <div className={style.header}>
        <Left />
        <Right />
      </div>
    </div>
  );
};

export default Header;
