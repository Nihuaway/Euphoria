import type { NextPage } from 'next';
import style from './style.module.scss';
import SimpleButton from 'components/[ buttons ]/simple/button';
import { IButtonState } from 'components/[ buttons ]/enums';
import { WindowActions } from 'stores/window/store';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from 'stores/store';
import React, { useEffect, useState } from 'react';
import UserRoute from 'routes/user/userRoute';
import { SuggestActions } from 'stores/suggest/store';
import Icon, { IconVariant } from 'components/icon/icon';
import SimpleInput from 'components/[ inputs ]/simple/input';
import BigInput from 'components/[ inputs ]/big/input';
import CardInput from 'components/[ inputs ]/cards/input';
import ImageLoader from 'components/[ loaders ]/image/image';
import { genAvatarUrl } from 'scripts/genAvatarUrl';
import { resize } from 'services/ImageService';
import AvatarRoute from 'routes/user/avatarRoute';
import { IAvatar } from 'interfaces/models/avatar';

const State: NextPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: IRootReducer) => state.user);
  const [savePROCESS, setSavePROCESS] = useState(false);

  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.biography);
  const [skills, setSkills] = useState(user.skills);

  const [nameInputACTIVE, setNameInputACTIVE] = useState(false);

  const [avatar, setAvatar] = useState<IAvatar | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [src, setSrc] = useState<string | null | undefined>(null);
  
  useEffect(() => {
    setAvatar(null);
    dispatch({type: WindowActions.SET_LOADED})
    if (!user || !user.avatar) return;
    const abort = new AbortController();
    const getAvatar = async () =>
      await AvatarRoute.get({filter:{ _id: user.avatar }, limit:1}, abort.signal);
    getAvatar().then((res) => {
      setAvatar(res.data[0]);
    });
    return () => abort.abort();
  }, [user]);

  useEffect(() => {
    if (!file) return setSrc(genAvatarUrl(avatar, '640x640'));
    const reader = new FileReader();
    reader.onload = (result) => {
      if (!result?.target?.result) return;
      const blob = new Blob([result.target.result]);
      window.URL = window.URL || window.webkitURL;
      const blobURL = window.URL.createObjectURL(blob);

      const image = new Image();
      image.src = blobURL;
      image.onload = () => {
        setSrc(resize(image, 640, 640));
      }
    };

    reader.readAsArrayBuffer(file);
  }, [avatar,file]);

  return (
    <div className={style.state}>
      <div className={style.title}>
        <h1>Edit Profile</h1>
        <h4>Set up your Dribbble presence and hiring needs</h4>
      </div>
      <div className={style.content}>
        <div className={style.avatar}>
          <ImageLoader
            radius={44}
            src={src}
            layout={'fixed'}
            width={88}
            height={88}
          />
          <div className={style.buttons}>
            <label htmlFor={'inputTag'} className={style.upload}>
              <SimpleButton state={IButtonState.secondary} func={() => {}}>
                Upload new
              </SimpleButton>
              <input
                accept={'image/png, image/jpeg, image/gif, image/webp'}
                onChange={async (e) => {
                  setFile(e.target.files ? e.target.files[0] : null);
                }}
                id={'inputTag'}
                type={'file'}
              />
            </label>

            <SimpleButton
              state={IButtonState.secondary}
              func={() => {
                setSrc(null);
                setFile(null);
              }}>
              Remove
            </SimpleButton>
          </div>
        </div>
        <hr style={{ width: '100%' }} />
        <SimpleInput
          topInput={
            <h4 style={{ marginLeft: '8px', userSelect: 'none' }}>Title</h4>
          }
          value={name}
          onChange={(e) => setName(e.target.value)}
          isActive={nameInputACTIVE}
          onFocus={() => setNameInputACTIVE(true)}
          onBlur={() => setNameInputACTIVE(false)}
        />
        <BigInput
          topInput={
            <h4 style={{ marginLeft: '8px', userSelect: 'none' }}>Biography</h4>
          }
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
        <CardInput
          topInput={
            <h4 style={{ marginLeft: '8px', userSelect: 'none' }}>Skills</h4>
          }
          items={skills}
          onChange={(items) => setSkills(items)}
        />
      </div>
      <div className={style.bottom}>
        <SimpleButton
          state={IButtonState.secondary}
          func={() =>
            dispatch({ type: WindowActions.HIDE })
          }>
          Cancel
        </SimpleButton>
        <SimpleButton
          state={IButtonState.secondary}
          process={savePROCESS}
          func={async () => {
            setSavePROCESS(true);
            let avatarRES = null;
            if (file) {
              if(user.avatar){
                avatarRES= await AvatarRoute.edit(file);
              }
              else{
                avatarRES= await AvatarRoute.create(file);
              }
            }
            else if(!src && !!user.avatar){
              avatarRES = await AvatarRoute.remove();
            }

            avatarRES ? dispatch({
              type: SuggestActions.ADD,
              payload: (
                <>
                  <Icon
                    id={
                      avatarRES.data ? IconVariant.check : IconVariant.close
                    }
                    size={16}
                  />
                  <h4>{avatarRES.message}</h4>
                </>
              ),
            }): null;

            const editRES = await UserRoute.edit({
              name,
              biography: bio,
              skills,
            });
            dispatch({
              type: SuggestActions.ADD,
              payload: (
                <>
                  <Icon
                    id={editRES.data ? IconVariant.check : IconVariant.close}
                    size={16}
                  />
                  <h4>{editRES.message}</h4>
                </>
              ),
            });

            setSavePROCESS(false);

            dispatch({ type: WindowActions.HIDE});
          }}>
          Save
        </SimpleButton>
      </div>
    </div>
  );
};

export default State;
