import type { NextPage } from 'next';
import style from './style.module.scss';
import Layout from 'components/layout/Layout';
import { useEffect, useState } from 'react';
import Top from 'components/[ pages ]/shot/upload/title';
import ImagePlaces from 'components/[ pages ]/shot/upload/images/list';
import ImagePlace from 'components/[ pages ]/shot/upload/images/main';
import { IShot } from 'interfaces/models/shot';
import ShotController from 'routes/shot/shotRoute';
import { useRouter } from 'next/router';
import ImageRoute from 'routes/shot/imageRoute';
import { useDispatch, useSelector } from 'react-redux';
import { UserActions } from 'stores/user/store';
import { IRootReducer } from 'stores/store';
import CardInput from 'components/[ inputs ]/cards/input';
import { IImage } from 'interfaces/models/image';

const UploadPage: NextPage = () => {
  const router = useRouter();
  const user = useSelector((state: IRootReducer) => state.user);
  const dispatch = useDispatch();
  const { id } = router.query;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<IImage[]>([]);
  const [shotTEMP, setShotTEMP] = useState<IShot | null>(null);
  const [tags, setTags] = useState<string[]>([]);

  const upload = async (isDraft: boolean) => {
    if (!shotTEMP) return false;
    const res = await ShotController.upload({
      _id: shotTEMP._id,
      title,
      category: 'Illustration',
      content,
      isDraft,
      tags,
      inProcess: false,
    } as IShot);
    if (!res.data) return;
    await router.push(
      isDraft ? `/user/${user.id}?page=drafts` : `/shot/${res.data._id}`
    );
  };

  useEffect(() => {
    const abort = new AbortController();

    if (id) {
      const getDraft = async () =>
        await ShotController.get(
          { filter: { _id: id }, limit: 1 },
          abort.signal
        );
      getDraft().then((res) => setShotTEMP(res.data[0]));
      return;
    }

    const getTemp = async () => await ShotController.temp(abort.signal);
    getTemp().then((res) => {
      setShotTEMP(res.data.shot);
      dispatch({ type: UserActions.SET_USER, payload: res.data.user });
    });

    return () => abort.abort();
  }, []);

  useEffect(() => {
    if (!shotTEMP || !id) return;
    const abort = new AbortController();
    const getImages = async () =>
      await ImageRoute.get({ filter: { shot: id } }, abort.signal);
    getImages().then((res) => {
      setImages(res.data);
    });

    setTitle(shotTEMP.title);
    setContent(shotTEMP.content);
    setTags(shotTEMP.tags);

    return () => abort.abort();
  }, [shotTEMP]);

  const onAdd = (id: number, image: IImage) => {
    if (id === images.length) {
      setImages((prev) => [...prev, image]);
    }
  };

  const onRemove = (id: number) => {
    let nnn = [...images];
    nnn.splice(id, 1);
    setImages(nnn);
  };
  return (
    <Layout>
      <div className={style.page}>
        <div style={{ padding: '0 24px', width: '100%' }}>
          <Top
            title={title}
            onEdit={(value) => setTitle(value)}
            onPushed={upload}
            state={!!images[0]}
          />
        </div>

        <div className={style.images}>
          <ImagePlace
            shotID={shotTEMP?._id}
            onAdd={onAdd}
            onRemove={onRemove}
            image={images[0]}
          />
          <ImagePlaces
            shotID={shotTEMP?._id}
            images={images}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        </div>

        <div className={style.description}>
          <h4>Description (option)</h4>
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </div>
        <div style={{ width: '100%', padding: '0 24px' }}>
          <CardInput
            topInput={
              <div>
                <h4>Tags</h4>
              </div>
            }
            items={tags}
            onChange={(items) => setTags(items)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default UploadPage;
