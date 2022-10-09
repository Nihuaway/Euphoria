import type { NextPage } from 'next';
import style from './style.module.scss';
import { ThemeVariant } from 'interfaces/enums';

interface props {
  theme: ThemeVariant.day | ThemeVariant.night;
}

const Separator: NextPage<props> = ({ theme }) => {
  return <div className={style.separator} data-theme={theme} />;
};

export default Separator;