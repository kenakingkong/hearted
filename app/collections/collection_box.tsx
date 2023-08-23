import Link from "next/link";
import ICollection from "../../types/collection";

interface ICollectionBoxProps {
  key: string;
  collection: ICollection;
}

const CollectionBox: React.FC<ICollectionBoxProps> = ({ key, collection }) => {
  return (
    <Link
      href={`/collections/${collection.id}`}
      key={key}
      className="w-72 h-96 border-2 border-black p-4 space-y-2"
    >
      <div className="w-full h-72 border-2 border-black"></div>
      <p className="font-medium text-lg">{collection.title}</p>
    </Link>
  );
};

export default CollectionBox;
