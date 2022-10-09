import type { NextPage } from 'next';
import style from './style.module.scss';
import { WindowActions } from 'stores/window/store';
import ShotStatistic from 'components/windows/[ states ]/statistic';
import { IShot } from 'interfaces/models/shot';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

interface props {
  shot: IShot | null;
}

const ShotDescriptionBlock: NextPage<props> = ({ shot }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className={style.block}>
      {shot && shot.tags.length > 0 ? (
        <div className={style.tags}>
          <div className={style.tagsList}>
            {shot?.tags.slice(0, 8).map((tag, index) => (
              <h4
                onClick={() =>
                  router.push({
                    pathname: '/',
                    query: {
                      tag,
                    },
                  })
                }
                key={index}
                style={{ color: '#065FD4' }}>
                #{tag}
              </h4>
            ))}
          </div>
          {shot && shot?.tags.length > 8 ? (
            <>
              <div className={style.vertHR} />
              <h4
                className={style.all}
                onClick={() =>
                  dispatch({
                    type: WindowActions.SET,
                    payload:<ShotStatistic shotID={shot?._id} />,
                  })
                }>
                all tags
              </h4>
            </>
          ) : null}
        </div>
      ) : null}
      {shot?.content ? <pre>{shot.content}</pre> : null}
    </div>
  );
};

export default ShotDescriptionBlock;
