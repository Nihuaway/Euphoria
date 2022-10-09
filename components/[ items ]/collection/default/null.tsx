import type { NextPage } from 'next';
import style from './style.module.scss';
import ContentLoader from 'react-content-loader';

const NullCollectionItem: NextPage = () => {
  return (
    <div className={style.item}>
      <div className={style.images}>
        <ContentLoader
          speed={2}
          viewBox="0 0 218 164"
          backgroundColor="#f5f5f5"
          foregroundColor="#ededed">
          <rect x="0" y="0" rx="5" ry="5" width="218" height="164" />
        </ContentLoader>
        <div className={style.others}>
          {[1, 2, 3].map((index) => {
            return (
              <ContentLoader
                key={index}
                speed={2}
                viewBox="0 0 70 52"
                backgroundColor="#f5f5f5"
                foregroundColor="#ededed">
                <rect x="0" y="0" rx="5" ry="5" width="70" height="52" />
              </ContentLoader>
            );
          })}
        </div>
      </div>

      <div className={style.title}>
        <ContentLoader
          speed={2}
          width={120}
          height={16}
          viewBox="0 0 120 16"
          backgroundColor="#f5f5f5"
          foregroundColor="#ededed">
          <rect x="0" y="0" rx="3" ry="3" width="120" height="16" />
        </ContentLoader>
        <ContentLoader
          speed={2}
          width={80}
          height={14}
          viewBox="0 0 80 14"
          backgroundColor="#f5f5f5"
          foregroundColor="#ededed">
          <rect x="0" y="0" rx="3" ry="3" width="80" height="14" />
        </ContentLoader>
      </div>

    </div>
  );
};

export default NullCollectionItem;