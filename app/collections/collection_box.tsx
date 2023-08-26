import Link from "next/link";
import ICollection from "../../types/collection";
import { useEffect, useState } from "react";
import { useAppContext } from "../(context)/context";

const CollectionBox: React.FC<ICollection> = ({ id, title }) => {
  const { generatePhotoFromEntries } = useAppContext();

  const [coverPhotos, setCoverPhotos] = useState<string[]>([]);

  useEffect(() => {
    generatePhotoFromEntries(id).then((res: any) => {
      if (res.length === 0) {
      } else if (res.length < 3) {
        setCoverPhotos(res.slice(0, 1));
      } else {
        setCoverPhotos(res);
      }
    });
  }, []);

  const CoverPhoto =
    coverPhotos.length === 1 ? (
      <div className="w-full h-72 w-72 border-2 border-black overflow-hidden">
        <img src={coverPhotos[0]} alt={`${title} cover`} className="w-72 h-72 object-cover" />
      </div>
    ) : (
      <div className="w-full h-72 w-72 overflow-hidden border-2 border-black grid grid-cols-2 grid-rows-2">
        {coverPhotos.map((src: string, index: number) => (
          <img
            src={src}
            alt={`${title} cover - ${index}`}
            key={`${title}-cover-${index}`}
            className="w-36 h-36 object-cover"
          />
        ))}
      </div>
    );

  return (
    <Link
      href={`/collections/${id}`}
      className="w-72 h-96 border-2 border-black p-4 space-y-2"
    >
      {CoverPhoto}
      <p className="font-medium text-lg">{title}</p>
    </Link>
  );
};

export default CollectionBox;
