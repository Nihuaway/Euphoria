import type { NextPage } from 'next';
import style from './style.module.scss';
import Logo from 'components/logo';

const Left: NextPage = () => {
  return (
    <div className={style.left}>
      <Logo />
    </div>
  );
};

export default Left;