"use client";

import { useAppReducer } from "../(context)/reducer";
import ICollection from "../../types/collection";
import CollectionBox from "./collection_box";
import NewCollectionBox from "./new_collection_box";

export default function Home() {
  const [state, dispatch] = useAppReducer();

  const createCollection = (title: string) => {
    // api convex call here...

    dispatch({
      type: "CREATE_COLLECTION",
      collection: {
        id: 3,
        title: title,
      },
    });
  };

  return (
    <div className="flex flex-wrap gap-4">
      {state.collections.map((collection: ICollection) => (
        <CollectionBox
          key={`collection-${collection.id}`}
          collection={collection}
        />
      ))}
      <NewCollectionBox onCreate={createCollection} />
    </div>
  );
}
