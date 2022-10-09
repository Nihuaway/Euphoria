import type { NextPage } from 'next';
import style from './style.module.scss';
import Image from 'next/image';
import Loading, { LoadingPos } from 'components/[ loaders ]/animation/Loading';

interface props {
  image: boolean;
  title: { loading: string; empty: string };
  description: { loading: string; empty: string };
  visible: boolean;
  loading?: boolean;
}

const Empty: NextPage<props> = ({image, title, description, visible, loading }) => {
  return (
    <div className={style.parent} data-visible={visible}>
      <div className={style.block} data-loading={!!loading}>
        {loading !== undefined ? (
          <div className={style.loading}>
            <h3>{title.loading}</h3>
            <h5>{description.loading}</h5>
            <div style={{ width: '16px', height: '16px', marginTop: '16px' }}>
              <Loading process={true} />
            </div>
          </div>
        ) : null}
        <div className={style.empty}>
          {
            image ? <div className={style.image}>
              <Image
                src={'/empty.png'}
                layout={'fill'}
                objectFit={'cover'}
              />
            </div> : null
          }
          <h4>{title.empty}</h4>
        </div>
      </div>
    </div>
  );
};

export default Empty;
