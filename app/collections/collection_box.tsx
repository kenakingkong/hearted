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
      } else if (res.length <= 3) {
        setCoverPhotos(res.slice(0, 1));
      } else {
        setCoverPhotos(res);
      }
    });
  }, []);

  const CoverPhoto =
    coverPhotos.length === 1 ? (
      <div className="h-80 w-80 border-t-2 border-black overflow-hidden">
        <img
          src={coverPhotos[0]}
          alt={`${title} cover`}
          className="w-80 h-80 object-cover"
        />
      </div>
    ) : (
      <div className="h-80 w-80 border-t-2 border-black overflow-hidden grid grid-cols-2 grid-rows-2">
        {coverPhotos.map((src: string, index: number) => (
          <img
            src={src}
            alt={`${title} cover - ${index}`}
            key={`${title}-cover-${index}`}
            className="w-40 h-40 object-cover"
          />
        ))}
      </div>
    );

  return (
    <Link
      href={`/collections/${id}`}
      className="w-80 h-96 border-2 border-black transition-all hover:scale-[1.015] flex flex-col justify-between overflow-hidden"
    >
      <p className="font-medium text-xl p-4 line-clamp-1">{title}</p>
      {CoverPhoto}
    </Link>
  );
};

export default CollectionBox;
