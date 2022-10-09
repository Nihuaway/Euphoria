import CollectionItem from 'components/[ items ]/collection/default/item';
import { ICollection } from 'interfaces/models/collection';
import NullCollectionItem from 'components/[ items ]/collection/default/null';

const collectionsMap = (collections: ICollection[] | null) => {
  if (collections) {
    return collections.map((collection) => (
      <CollectionItem key={collection._id} collectionDB={collection} />
    ));
  } else {
    return [0, 1, 2, 3].map((nul, index) => <NullCollectionItem key={index}/>);
  }
};

export default collectionsMap;