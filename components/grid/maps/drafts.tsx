import { IShot } from 'interfaces/models/shot';
import DraftItem from 'components/[ items ]/draft/item';
import ShotItem from 'components/[ items ]/shot/default/item';
import NullShotItem from 'components/[ items ]/shot/default/null';
import NullDraftItem from 'components/[ items ]/draft/null';


const draftsMap = (drafts: IShot[] | null) => {
if (drafts) {
  return drafts.map((draft) => <DraftItem key={draft._id} draftDB={draft} />);
} else {
  return [0,1,2,3,4,5,6,7].map((nul, index) => <NullDraftItem key={index} />);
}}


export default draftsMap;