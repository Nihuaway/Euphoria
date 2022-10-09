import type { NextPage } from 'next';
import style from './style.module.scss';
import ContentLoader from 'react-content-loader';

const NullDraftItem: NextPage = () => {
  return (
    <div className={style.draft}>
      <ContentLoader
        speed={2}
        viewBox="0 0 348 259.19"
        backgroundColor="#f3f3f3"
        foregroundColor="#eeeeee">
        <rect x="0" y="0" rx="5" ry="5" width="348" height="259.19" />
      </ContentLoader>
      <div className={style.bottom}>
        <div className={style.title}>
          <ContentLoader
            speed={2}
            viewBox="0 0 119 12"
            backgroundColor="#f3f3f3"
            foregroundColor="#eeeeee">
            <rect x="0" y="0" rx="3" ry="3" width="119" height="12" />
          </ContentLoader>
        </div>

        <div className={style.actions}>
          <div className={style.likeButton}>
            <ContentLoader
              speed={2}
              viewBox="0 0 60 26"
              backgroundColor="#f3f3f3"
              foregroundColor="#eeeeee">
              <rect x="0" y="0" rx="5" ry="5" width="60" height="26" />
            </ContentLoader>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NullDraftItem;