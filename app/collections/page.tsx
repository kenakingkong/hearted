"use client";

import { useAppContext } from "../(context)/context";
import ICollection from "../../types/collection";
import CollectionBox from "./collection_box";
import NewCollectionBox from "./create_collection";

export default function Home() {
  const { state } = useAppContext();
  return (
    <div className="flex flex-wrap gap-4">
      {state.collections.map((collection: ICollection) => (
        <CollectionBox key={`collection-${collection.id}`} {...collection} />
      ))}
      <NewCollectionBox />
    </div>
  );
}
