import type { NextPage } from 'next';
import style from './style.module.scss';
import { useRouter } from 'next/router';

const Logo = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push('/')} style={{ cursor: 'pointer' }}>
      <span
        style={{
          fontFamily: 'Karla',
          fontWeight: '800',
          fontSize: '20px',
          fontStyle: 'italic',
          marginRight: '6px',
        }}>
        Eup
      </span>
      <span style={{ fontWeight: '400', fontSize: '20px' }}>horia</span>
    </div>
  );
};
export default Logo;