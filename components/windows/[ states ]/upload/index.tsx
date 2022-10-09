import type { NextPage } from 'next';
import style from './style.module.scss';
import ImageLoader from 'components/[ loaders ]/image/image';
import Icon, { IconVariant } from 'components/icon/icon';
import { useEffect, useState } from 'react';
import ImageRoute from 'routes/shot/imageRoute';
import { WindowActions } from 'stores/window/store';
import { useDispatch } from 'react-redux';

interface props{
  image: File;
  error: string;
  status: number;
}

const UploadWindow: NextPage<props> = ({image, error, status}) => {
  const dispatch = useDispatch();
  const [source, setSource] = useState<string | null | undefined>(null);

  useEffect(()=>{
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function(result) {
      setSource(result?.target?.result?.toString())
    }
  }, [image])


  return (
    <div className={style.state}>
      <div className={style.title}>
        <h3>Uploading image</h3>
        <h4>{error ? error : status === 100 ? 'Done!' : 'Couple of seconds'}</h4>
      </div>
      <div className={style.body}>
        <div className={style.image}>
          <div style={{borderRadius: '5px', overflow: 'hidden'}}>
            <ImageLoader src={source} layout={'responsive'} objectFit={'cover'} width={100} height={75} />
          </div>
          <div className={style.icon} data-visible={status === 100 || !!error} style={{background: status === 100 ? '#90D96E' : '#FF4D4D'}}>
            <Icon id={status === 100 ? IconVariant.check : IconVariant.close} size={12} color={'white'}/>
          </div>
        </div>
        <div className={style.bar} data-movedown={!!error}>
          <div className={style.indicator} style={{width: status + '%'}}/>
        </div>
      </div>
    </div>
  );
};

export default UploadWindow;