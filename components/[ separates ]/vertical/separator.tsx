import type { NextPage } from 'next';
import style from './style.module.scss';
import { ThemeVariant } from 'interfaces/enums';

interface props {
  theme: ThemeVariant.day | ThemeVariant.night;
  height: string;
}

const Separator: NextPage<props> = ({ theme, height }) => {
  return <div className={style.separator} data-theme={theme} style={{height}} />;
};

export default Separator;