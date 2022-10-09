import type { NextPage } from 'next';
import style from './style.module.scss';
import SimpleInput from 'components/[ inputs ]/simple/input';
import SimpleButton from 'components/[ buttons ]/simple/button';
import CollectionRoute from 'routes/collectionRoute';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';
import { WindowActions } from 'stores/window/store';
import { SuggestActions } from 'stores/suggest/store';
import Icon, { IconVariant } from 'components/icon/icon';
import { IButtonState } from 'components/[ buttons ]/enums';
import BigInput from 'components/[ inputs ]/big/input';

const CreateCollection: NextPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [create_loading, setCreate_loading] = useState(false);

  const user = useSelector((state: IRootReducer) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WindowActions.SET_LOADED });
  }, []); // проверка на готовность

  const create = async () => {
    setCreate_loading(true);
    await CollectionRoute.upload({
      title,
      shots: [],
      createdAt: new Date(),
    });
    setCreate_loading(false);
    dispatch({
      type: SuggestActions.ADD,
      payload: (
        <>
          <Icon id={IconVariant.plus} size={24} />
          <h4>{'Collection\ncreated'}</h4>
        </>
      ),
    });
    dispatch({ type: WindowActions.HIDE });
  };

  return (
    <div className={style.state}>
      <div className={style.title}>
        <h1>Create Collection</h1>
      </div>
      <div className={style.content}>
        <SimpleInput
          topInput={
            <h4 style={{ paddingLeft: '8px', opacity: '0.75' }}>Title</h4>
          }
          autoComplete={'off'}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
          value={title}
        />
        <BigInput
          topInput={
            <h4 style={{ paddingLeft: '8px', opacity: '0.75' }}>
              Description (option)
            </h4>
          }
          autoComplete={'off'}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
          value={description}
        />
      </div>
      <div className={style.bottom}>
        <SimpleButton
          state={IButtonState.secondary}
          func={() => dispatch({ type: WindowActions.HIDE })}>
          Cancel
        </SimpleButton>
        <SimpleButton
          state={IButtonState.primary}
          process={create_loading}
          func={create}>
          Create
        </SimpleButton>
      </div>
    </div>
  );
};

export default CreateCollection;
