import type { NextPage } from 'next';
import style from './style.module.scss';
import { useEffect, useState } from 'react';
import ImageRoute from 'routes/shot/imageRoute';
import { genImageUrl } from 'scripts/genImageUrl';
import { useDispatch } from 'react-redux';
import { WindowActions } from 'stores/window/store';
import UploadWindow from 'components/windows/[ states ]/upload';
import FileInput from 'components/[ inputs ]/file/input';
import { IImage } from 'interfaces/models/image';

interface props {
  id: number;
  shotID: string | undefined;
  image: IImage | null | undefined;
  isDisable: boolean;
  resolution: string;

  onAdd: (id: number, file: IImage) => void;
  onRemove: (id: number) => void;
}

const ImageItem: NextPage<props> = ({
  id,
  image,
  shotID,
  isDisable,
  resolution,
  onAdd,
  onRemove,
  children,
}) => {
  const [newImageID, setNewImageID] = useState<string | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!newImageID) return;
    const abort = new AbortController();
    const getPreview = async () =>
      await ImageRoute.get({filter: { _id: newImageID },limit: 1}, abort.signal);
    getPreview().then((res) => {
      onAdd(id, res.data[0]);
    });
    return () => abort.abort();
  }, [newImageID]);

  return (
    <div className={style.item} data-disable={isDisable}>
      <FileInput
        isDisable={isDisable}
        id={id}
        onChange={(e) => {
          if (!e.target.files || e.target.files.length === 0 || !shotID) return;
          const file = e.target.files[0];
          dispatch({
            type: WindowActions.SET,
            payload: <UploadWindow image={file} status={10} error={''} />,
          });
          const add = async (file: File) => await ImageRoute.add(shotID, file);
          add(file).then((res) => {
            dispatch({
              type: WindowActions.SET,
              payload: <UploadWindow
                image={file}
                error={!res.data && res.message ? res.message : ''}
                status={!res.data ? 50 : 100}
              />,
            });

            if (!res.data) {
              e.target.value = '';
              return;
            }
            setNewImageID(res.data);

            setTimeout(function () {
              dispatch({ type: WindowActions.HIDE});
            }, 750);
          });
        }}
        onRemove={(id) => {
          if(!image) return;
          const remove = async () => await ImageRoute.remove(image._id);
          remove().then(res => res.data ? onRemove(id) : null);
        }}
        src={genImageUrl(image, resolution)}>
        <div className={style.children}>
          {children}
        </div>
      </FileInput>
    </div>
  );
};

export default ImageItem;
