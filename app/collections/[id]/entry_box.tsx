import { useEffect, useState } from "react";
import IEntry from "../../../types/entry";
import { useAppContext } from "../../(context)/context";
interface ILinkData {
  title: string;
  site: string;
  url: string;
  image: string;
  price?: string;
}

const EntryBox: React.FC<IEntry> = ({ id, link }) => {
  const [data, setData] = useState<ILinkData | null>(null);
  const { findOrFetchMetaData } = useAppContext();

  useEffect(() => {
    findOrFetchMetaData(id, link, (result) => setData(result));
  }, []);

  const EntryImage = (
    <img
      src={data?.image}
      className="border-2 border-black h-24 w-24 object-cover shrink-0"
      loading="lazy"
    />
  );

  const EntryDetails = (
    <div>
      <a
        href={data?.url || link}
        className="text-xl underline underline-offset-2 hover:opacity-90"
        target="_blank"
        rel="noopener noreferrer"
      >
        {data?.title || link}
      </a>
      {data?.site && data?.price && (
        <p>
          {data.site} | {data.price}
        </p>
      )}
      {data?.site && !data?.price && <p>{data.site}</p>}
      {!data?.site && data?.price && <p>{data.price}</p>}
    </div>
  );

  return (
    <div className="border-2 border-black p-4 flex gap-4">
      {EntryImage}
      {EntryDetails}
    </div>
  );
};

export default EntryBox;
