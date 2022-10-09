import type { NextPage } from 'next';
import style from './style.module.scss';
import SimpleButton, {
} from 'components/[ buttons ]/simple/button';
import { WindowActions } from 'stores/window/store';
import EditCollection from 'components/windows/[ states ]/collections/edit/state';
import { ICollection } from 'interfaces/models/collection';
import { useDispatch, useSelector } from 'react-redux';
import CollectionRoute from 'routes/collectionRoute';
import { IUser } from 'interfaces/models/user';
import { IRootReducer } from 'stores/store';
import { useEffect, useState } from 'react';
import { SuggestActions } from 'stores/suggest/store';
import Icon, { IconVariant } from 'components/icon/icon';
import { useRouter } from 'next/router';
import { IButtonState } from 'components/[ buttons ]/enums';

interface props {
  collection: ICollection | null;
  authorID: string | null;
}

const CollectionMenuAuth: NextPage<props> = ({collection, authorID}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: IRootReducer) => state.user);
  const [isOwner, setOwner] = useState(false);
  const [removePROCESS, setRemovePROCESS] = useState(false);

  useEffect(()=>{
    if(!authorID || !user) return;
    setOwner(user.id === authorID);
  }, [user,authorID])

  const remove = async () => {
    if (!collection) return;
    setRemovePROCESS(true);
    const res = await CollectionRoute.remove(collection._id);
    setRemovePROCESS(false);
    dispatch({
      type: SuggestActions.ADD,
      payload: (
        <>
          <Icon id={!!res.data ? IconVariant.check : IconVariant.close} size={24} />
          <h4>{res.message}</h4>
        </>
      ),
    });
    await router.push({
      pathname: `/user/${user.id}`,
      query: {page: 'collections'}
    })
  };

  return (
    <div className={style.buttons}>
      <SimpleButton state={IButtonState.secondary} func={() => {}}>
        Share
      </SimpleButton>
      {isOwner ? (
        <>
          <SimpleButton
            state={IButtonState.secondary}
            func={() =>
              collection
                ? dispatch({
                    type: WindowActions.SET,
                    payload: <EditCollection collectionID={collection._id} />,
                  })
                : null
            }>
            Edit Collection
          </SimpleButton>
          <SimpleButton process={removePROCESS} state={IButtonState.secondary} func={remove}>
            Delete
          </SimpleButton>
        </>
      ) : null}
    </div>
  );
};

export default CollectionMenuAuth;