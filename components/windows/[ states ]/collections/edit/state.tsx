import type { NextPage } from 'next';
import style from './style.module.scss';
import SimpleInput from 'components/[ inputs ]/simple/input';
import SimpleButton from 'components/[ buttons ]/simple/button';
import CollectionRoute from 'routes/collectionRoute';
import { ICollection } from 'interfaces/models/collection';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';
import { WindowActions } from 'stores/window/store';
import { IButtonState } from 'components/[ buttons ]/enums';
import BigInput from 'components/[ inputs ]/big/input';
import Loading from 'components/[ loaders ]/animation/Loading';
import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
import ContentLoader from 'react-content-loader';
import { SuggestActions } from 'stores/suggest/store';
import Icon, { IconVariant } from 'components/icon/icon';

interface props {
  collectionID: string | null;
}

const EditCollection: NextPage<props> = ({ collectionID }) => {
  const window = useSelector((state: IRootReducer) => state.window);
  const dispatch = useDispatch();

  const [collection, setCollection] = useState<ICollection | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [editLoad, setEditLoad] = useState(false);

  useEffect(() => {
    if (collection) dispatch({ type: WindowActions.SET_LOADED });
  }, [collection]); // проверка на готовность

  useEffect(() => {
    const getCollection = async () =>
      await CollectionRoute.get({ _id: collectionID });
    getCollection().then((res) => setCollection(res.data[0]));
  }, [collectionID]);

  useEffect(() => {
    if (!collection) return;

    setTitle(collection.title);
    setDescription(collection.description);
  }, [collection, window]);

  const save = async () => {
    if (!collection || !title) return;
    setEditLoad(true);
    await CollectionRoute.edit(collection._id, {
      title,
      description: description ? description : '',
    }).then(res => {
      setEditLoad(false);
      if (res?.data) {
        dispatch({ type: WindowActions.HIDE });
      }
      dispatch({
        type: SuggestActions.ADD,
        payload: (
          <>
            <Icon
              id={res?.data ? IconVariant.check : IconVariant.close}
              size={16}
            />
            <h4>{res.message}</h4>
          </>
        ),
      });
    });

  };

  return (
    <div className={style.state}>
      <div className={style.title}>
        <h1>Edit Collection</h1>
        <div style={{ width: '16px', height: '16px' }}>
          <Loading process={!collection} />
        </div>
      </div>
      <div className={style.content}>
        {collection ? (
          <>
            <SimpleInput
              topInput={
                <div
                  style={{
                    marginLeft: '8px',
                    justifyContent: 'flex-start',
                    display: 'flex',
                  }}>
                  <TextLoader
                    font={fonts.h14}
                    text={collection ? 'Name' : null}
                    placeholder={'Name'}
                  />
                </div>
              }
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
            />
            <BigInput
              topInput={
                <div
                  style={{
                    marginLeft: '8px',
                    justifyContent: 'flex-start',
                    display: 'flex',
                  }}>
                  <TextLoader
                    font={fonts.h14}
                    text={collection ? 'Description (option)' : null}
                    placeholder={'Description (option)'}
                  />
                </div>
              }
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
          </>
        ) : (
          <ContentLoader
            speed={2}
            width={356}
            height={160}
            viewBox="0 0 356 160"
            backgroundColor="#f3f3f3"
            foregroundColor="#eeeeee">
            <rect x="8" y="82" rx="3" ry="3" width="118" height="16" />
            <rect x="0" y="105" rx="5" ry="5" width="356" height="56" />
            <rect x="8" y="0" rx="3" ry="3" width="36" height="16" />
            <rect x="0" y="24" rx="5" ry="5" width="356" height="36" />
          </ContentLoader>
        )}
      </div>

      <div className={style.bottom}>
        <SimpleButton
          state={IButtonState.secondary}
          func={() => dispatch({ type: WindowActions.HIDE })}>
          Cancel
        </SimpleButton>
        <SimpleButton
          state={IButtonState.primary}
          process={editLoad}
          func={save}>
          Save
        </SimpleButton>
      </div>
    </div>
  );
};

export default EditCollection;
