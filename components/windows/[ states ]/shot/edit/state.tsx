import type { NextPage } from 'next';
import style from './style.module.scss';
import winStyle from 'components/windows/style.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { WindowActions } from 'stores/window/store';
import SimpleInput from 'components/[ inputs ]/simple/input';
import { IButtonState } from 'components/[ buttons ]/enums';
import { IShot } from 'interfaces/models/shot';
import ShotRoute from 'routes/shot/shotRoute';
import BigInput from 'components/[ inputs ]/big/input';
import { SuggestActions } from 'stores/suggest/store';
import Icon, { IconVariant } from 'components/icon/icon';
import CardInput from 'components/[ inputs ]/cards/input';
import Loading from 'components/[ loaders ]/animation/Loading';
import Button from 'components/[ buttons ]/simple/button';
import ContentLoader from 'react-content-loader';

interface props {
  shotID: string | null | undefined;
}

const EditShot: NextPage<props> = ({ shotID }) => {
  const dispatch = useDispatch();

  const [shot, setShot] = useState<IShot | null>(null);
  const [title, setTitle] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [tags, setTags] = useState<string[] | null>(null);
  const [editPROCESS, setEditPROCESS] = useState(false);

  const [canSave, setCanSave] = useState<boolean>(false);

  useEffect(() => {
    setCanSave(!!title);
  }, [title]);

  useEffect(() => {
    if (!shotID) return;
    const abort = new AbortController();
    const getShot = async () =>
      await ShotRoute.get(
        { filter: { _id: shotID }, limit: 1 },
        abort.signal
      );
    getShot().then((res) => setShot(res.data[0]));
    return () => abort.abort();
  }, [shotID]); // получение shot

  useEffect(() => {
    if (!shot) return;
    setTitle(shot.title);
    setDescription(shot.content);
    setTags(shot.tags);
  }, [shot]); // set params

  const save = async () => {
    if (!shot || !canSave) return;

    setEditPROCESS(true);
    // @ts-ignore
    await ShotRoute.edit(shot._id, {
      title,
      content: description,
      // @ts-ignore
      tags,
    }).then((res) => {
      setEditPROCESS(false);
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
    <>
      <div className={winStyle.top}>
        <h1>Edit Shot</h1>
      </div>
      <div className={winStyle.middle}>
        {shot ? (
          <>
            <SimpleInput
              isRequired={true}
              isValid={!!title}
              topInput={
                <div
                  style={{
                    display: 'flex',
                    gridColumnGap: '8px',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0 8px',
                  }}>
                  <h4
                    style={{
                      opacity: '0.75',
                      color: !title ? '#FF4D4D' : undefined,
                    }}>
                    Title
                  </h4>
                  {!title ? (
                    <h5 style={{ whiteSpace: 'nowrap', color: '#FF4D4D' }}>
                      Title is required
                    </h5>
                  ) : null}
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
                    display: 'flex',
                    gridColumnGap: '12px',
                    alignItems: 'center',
                  }}>
                  <h4 style={{ paddingLeft: '8px', opacity: '0.75' }}>
                    Description (option)
                  </h4>
                </div>
              }
              value={description}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
            />
            <CardInput
              topInput={
                <div
                  style={{
                    display: 'flex',
                    gridColumnGap: '12px',
                    alignItems: 'center',
                  }}>
                  <h4 style={{ paddingLeft: '8px', opacity: '0.75' }}>Tags</h4>
                  <div style={{ width: '14px' }}>
                    <Loading process={!shot} size={14} />
                  </div>
                </div>
              }
              items={tags ? tags : []}
              onChange={(items) => setTags(items)}
            />
          </>
        ) : (
          <ContentLoader
            speed={2}
            width={356}
            height={257}
            viewBox="0 0 356 257"
            backgroundColor="#f3f3f3"
            foregroundColor="#eeeeee">
            <rect x="8" y="88" rx="3" ry="3" width="123" height="18" />
            <rect x="0" y="115" rx="5" ry="5" width="356" height="56" />
            <rect x="8" y="0" rx="3" ry="3" width="54" height="18" />
            <rect x="0" y="27" rx="5" ry="5" width="356" height="36" />
            <rect x="8" y="196" rx="3" ry="3" width="40" height="18"/>
            <rect x="0" y="222" rx="3" ry="3" width="67" height="18" />
            <rect x="76" y="222" rx="3" ry="3" width="43" height="18" />
            <rect x="131" y="222" rx="3" ry="3" width="111" height="18" />
          </ContentLoader>
        )}
      </div>
      <div className={winStyle.bottom}>
        <Button
          state={IButtonState.secondary}
          func={() => dispatch({ type: WindowActions.HIDE })}>
          Cancel
        </Button>
        <Button
          state={IButtonState.secondary}
          isDisable={!canSave}
          process={editPROCESS}
          func={save}>
          Save
        </Button>
      </div>
    </>
  );
};

export default EditShot;
