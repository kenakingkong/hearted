import { useEffect, useState } from "react";
import IEntry from "../../../types/entry";
import MetaDataUtils from "../../(utils)/metadata";

interface IEntryBox {
  key: string;
  entry: IEntry;
}

interface ILinkData {
  title: string;
  site: string;
  url: string;
  image: string;
  price?: string;
}

const EntryBox: React.FC<IEntryBox> = ({ key, entry }) => {
  const [data, setData] = useState<ILinkData | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchMetaData = () =>
      MetaDataUtils.fetchMetaData(entry.link).then(
        (data: MetaDataUtils.IMetaValues) => {
          if (isMounted) {
            setData(MetaDataUtils.parseMetaDataValues(data));
          }
        }
      );

    fetchMetaData();

    return () => {
      isMounted = false;
    };
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
        href={data?.url || entry.link}
        className="text-xl underline underline-offset-2 hover:opacity-90"
        target="_blank"
        rel="noopener noreferrer"
      >
        {data?.title || entry.link}
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
    <div key={key} className="border-2 border-black p-4 flex gap-4">
      {EntryImage}
      {EntryDetails}
    </div>
  );
};

export default EntryBox;
