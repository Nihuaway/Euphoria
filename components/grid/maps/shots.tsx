import { IShot } from 'interfaces/models/shot';
import ShotItem from 'components/[ items ]/shot/default/item';
import NullShotItem from 'components/[ items ]/shot/default/null';

const shotsMap = (shots: IShot[] | null) => {
  if (shots) {
    return shots.map((shot) => <ShotItem key={shot._id} shotDB={shot} />);
  } else {
    return [0,1,2,3,4,5,6,7].map((nul, index) => <NullShotItem key={index} />);
  }
};

export default shotsMap;
