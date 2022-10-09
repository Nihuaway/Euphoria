import type { NextPage } from 'next';
import style from './style.module.scss';
import winStyle from 'components/windows/style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';
import { useEffect, useState } from 'react';
import CollectionRoute from 'routes/collectionRoute';
import { ICollection, ISave } from 'interfaces/models/collection';
import SimpleButton from 'components/[ buttons ]/simple/button';
import { WindowActions } from 'stores/window/store';
import CreateCollection from 'components/windows/[ states ]/collections/create/state';
import { IShot } from 'interfaces/models/shot';
import CollectionPreview from 'components/windows/[ states ]/collections/list/item/item';
import Empty from 'components/grid/empty/empty';
import { IButtonState } from 'components/[ buttons ]/enums';
import ShotRoute from 'routes/shot/shotRoute';
import { SuggestActions } from 'stores/suggest/store';
import Icon, { IconVariant } from 'components/icon/icon';
import Loading from 'components/[ loaders ]/animation/Loading';
import ContentLoader from 'react-content-loader';

interface props {
  shotID: string | null | undefined;
}

const ListCollection: NextPage<props> = ({ shotID }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootReducer) => state.user);
  const window = useSelector((state: IRootReducer) => state.window);

  const [collections, setCollections] = useState<ICollection[] | null>(null);

  useEffect(() => {
    if (collections) dispatch({ type: WindowActions.SET_LOADED });
  }, [collections]); // проверка на готовность

  useEffect(() => {
    const getCollections = async () =>
      await CollectionRoute.get({ user: user.id });
    getCollections().then((res) => setCollections(res.data));
  }, [user]); // получение коллекций

  return (
    <>
      <div className={winStyle.top}>
        <h1>My Collections</h1>
      </div>
      <div className={winStyle.middle}>
        <div className={style.grid}>
          {collections ? (
            collections.length > 0 ? (
              collections.map((collection, index) => {
                return (
                  <CollectionPreview
                    key={index}
                    shotID={shotID}
                    onChange={async () => {
                      if (!collection || !shotID) return null;
                      const res = await CollectionRoute.save(
                        collection._id,
                        shotID
                      );

                      if (res.message) {
                        dispatch({
                          type: SuggestActions.ADD,
                          payload: (
                            <>
                              <Icon id={IconVariant.plus} size={14} />
                              <h4
                                dangerouslySetInnerHTML={{
                                  __html: res.message,
                                }}
                              />
                            </>
                          ),
                        });
                      }
                      return res.data as ISave[];
                    }}
                    collectionDB={collection}
                  />
                );
              })
            ) : (
              <div className={style.empty}>
                <h3>{"You don't have collections"}</h3>
                <h5>{'You can create them right now'}</h5>
              </div>
            )
          ) : (
            [0, 1].map((index) => (
              <ContentLoader
                key={index}
                speed={2}
                width={356}
                height={89}
                viewBox="0 0 356 89"
                backgroundColor="#f3f3f3"
                foregroundColor="#eeeeee">
                <rect x="7" y="7" rx="5" ry="5" width="100" height="75" />
                <rect x="123" y="7" rx="3" ry="3" width="101" height="16" />
                <rect x="123" y="29" rx="3" ry="3" width="54" height="18" />
                <rect x="123" y="66" rx="3" ry="3" width="147" height="16" />
              </ContentLoader>
            ))
          )}
        </div>
      </div>
      <div className={winStyle.bottom}>
        <SimpleButton
          state={IButtonState.primary}
          func={() => dispatch({ type: WindowActions.HIDE })}>
          Done
        </SimpleButton>
        <SimpleButton
          state={IButtonState.secondary}
          func={() =>
            dispatch({
              type: WindowActions.SET,
              payload: <CreateCollection />,
            })
          }>
          Create
        </SimpleButton>
      </div>
    </>
  );
};

export default ListCollection;
