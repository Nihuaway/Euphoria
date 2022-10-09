export default function ggg(){

}
// import type { NextPage } from 'next';
// import style from 'components/windows/[ states ]/shot/view/style.module.scss';
// import { IUser } from 'interfaces/models/user';
// import { IShot } from 'interfaces/models/shot';
// import TextLoader, { fonts } from 'components/[ loaders ]/text/text';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import SimpleButton from 'components/[ buttons ]/simple/button';
// import { WindowActions } from 'stores/window/store';
// import Icon, { IconVariant } from 'components/icon/icon';
// import { useDispatch, useSelector } from 'react-redux';
// import ShotRoute from 'routes/shot/shotRoute';
// import { UserActions } from 'stores/user/store';
// import { IRootReducer } from 'stores/store';
// import Slider from 'components/[ pages ]/shot/[ id ]/slider';
// import ShotController from 'routes/shot/shotRoute';
// import ShotStatistic from 'components/windows/[ states ]/statistic';
// import UserRoute from 'routes/user/userRoute';
// import Top from 'components/[ pages ]/shot/[ id ]/top';
// import { ShotsActions } from 'stores/shots/store';
// import { SuggestActions } from 'stores/suggest/store';
// import { IButtonState } from 'components/[ buttons ]/enums';
// import EditShot from 'components/windows/[ states ]/shot/edit/state';
//
// interface props {
//   shotID: string | null | undefined;
// }
//
// const State: NextPage<props> = ({ shotID }) => {
//   const router = useRouter();
//   const dispatch = useDispatch();
//   const user = useSelector((state: IRootReducer) => state.user);
//
//   const [shot, setShot] = useState<IShot | null>(null);
//   const [author, setAuthor] = useState<IUser | null>(null);
//
//   const [isLiked, setLiked] = useState(false);
//   const [likeProcess, setLikeProcess] = useState(false);
//   const [isSelf, setSelf] = useState(false);
//
//   useEffect(() => {
//     if (!user || !shot) return;
//     setLiked(user.likes.includes(shot._id));
//     setSelf(user.shots.includes(shot._id));
//   }, [user, shot]);
//
//   useEffect(() => {
//     if (!shotID) return;
//     const getShot = async () =>
//       await ShotRoute.get({ _id: shotID }, {}, 1, false);
//     getShot().then((res) => setShot(res.data[0]));
//   }, [shotID]);
//
//   useEffect(() => {
//     if (!shot) return;
//     const getAuthor = async () =>
//       await UserRoute.get({ _id: shot.user }, {}, 1);
//     getAuthor().then((res) => setAuthor(res.data[0]));
//   }, [shot]);
//
//   const like = async () => {
//     if (!user || !shot) return;
//     setLikeProcess(true);
//     await ShotRoute.like(shot._id).then((res) => {
//       setShot(res.data.shot);
//       dispatch({ type: ShotsActions.EDIT, payload: res.data.shot });
//       dispatch({ type: UserActions.SET_USER, payload: res.data.user });
//       setLikeProcess(false);
//     });
//   };
//
//   const remove = async () => {
//     if (!shot) return;
//     await ShotController.remove(shot._id).then(async (res) => {
//       dispatch({ type: WindowActions.SET_WINDOW, payload: null });
//       dispatch({
//         type: SuggestActions.ADD,
//         payload: (
//           <>
//             <Icon id={IconVariant.close} size={24} />
//             <h4>{'Shot\nremoved'}</h4>
//           </>
//         ),
//       });
//       router.reload();
//     });
//   };
//
//   return (
//     <div className={style.state}>
//       <div className={style.title}>
//         <Top
//           shotDB={shot}
//           authorDB={author}
//           onLike={like}
//           likePROCESS={likeProcess}
//           isLiked={isLiked}
//         />
//       </div>
//       <div className={style.content}>
//         <Slider shot={shot} />
//         <div className={style.description}>
//           {shot ? (
//             <h4 style={{ whiteSpace: 'pre-wrap' }}>{shot.content}</h4>
//           ) : (
//             <div className={style.preLoader}>
//               <TextLoader
//                 font={fonts.h14}
//                 text={null}
//                 placeholder={
//                   'Design a great experience for your users on the web and mobile platforms with Sajon. Feel free to mail me: '
//                 }
//               />
//               <TextLoader
//                 font={fonts.h14}
//                 text={null}
//                 placeholder={'contact@sajon.co'}
//               />
//               <TextLoader font={fonts.h14} text={null} placeholder={''} />
//               <TextLoader
//                 font={fonts.h14}
//                 text={null}
//                 placeholder={'UI/UX Tips - Instagram'}
//               />
//               <TextLoader
//                 font={fonts.h14}
//                 text={null}
//                 placeholder={'UI Design Kit - Gumroad'}
//               />
//               <TextLoader
//                 font={fonts.h14}
//                 text={null}
//                 placeholder={'Work Inquiries - contact@sajon.co'}
//               />
//               <TextLoader
//                 font={fonts.h14}
//                 text={null}
//                 placeholder={'Check My Behance | Linkedin | Website | Twitter'}
//               />
//               <TextLoader font={fonts.h14} text={null} placeholder={''} />
//               <TextLoader
//                 font={fonts.h14}
//                 text={null}
//                 placeholder={
//                   'Orix Creative Agency Instagram | Facebook | Behance | Linkedin'
//                 }
//               />
//             </div>
//           )}
//         </div>
//       </div>
//       {shot ? (
//         <div className={style.bottom}>
//           {isSelf ? (
//             <div className={style.left}>
//               <SimpleButton state={IButtonState.secondary} func={remove}>
//                 <Icon id={IconVariant.close} size={14} />
//                 Remove
//               </SimpleButton>
//               <SimpleButton
//                 state={IButtonState.secondary}
//                 func={() =>
//                   shot
//                     ? dispatch({
//                         type: WindowActions.SET_WINDOW,
//                         payload: {
//                           content: <EditShot shotID={shotID} />,
//                           width: '404px',
//                         },
//                       })
//                     : null
//                 }>
//                 <Icon id={IconVariant.edit} size={14} />
//                 Edit
//               </SimpleButton>
//             </div>
//           ) : (
//             <div />
//           )}
//           <div className={style.right}>
//             <SimpleButton
//               state={IButtonState.secondary}
//               isStraightForm={true}
//               orient={'top'}
//               position={0}
//               description={<h5 style={{padding: '8px 16px'}}>Details</h5>}
//               func={() =>
//                 dispatch({
//                   type: WindowActions.SET_WINDOW,
//                   payload: {
//                     title: 'Shot details',
//                     content: <ShotStatistic shot={shot} />,
//                     width: '404px',
//                   },
//                 })}>
//               <Icon id={IconVariant.info} size={14} />
//             </SimpleButton>
//             <SimpleButton
//               state={IButtonState.secondary}
//               isStraightForm={true}
//               orient={'top'}
//               position={0}
//               description={<h5 style={{padding: '8px 16px'}}>Share</h5>}
//               func={() => {}}>
//               <Icon id={IconVariant.send} size={14} />
//             </SimpleButton>
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };
//
// export default State;
// @ts-ignore
// @ts-ignore