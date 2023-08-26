import Link from "next/link";
import ICollection from "../../types/collection";

const CollectionBox: React.FC<ICollection> = ({ id, title }) => {
  return (
    <Link
      href={`/collections/${id}`}
      className="w-72 h-96 border-2 border-black p-4 space-y-2"
    >
      <div className="w-full h-72 border-2 border-black"></div>
      <p className="font-medium text-lg">{title}</p>
    </Link>
  );
};

export default CollectionBox;
