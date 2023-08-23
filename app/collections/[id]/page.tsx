"use client";

import { useAppReducer } from "../../(context)/reducer";
import IEntry from "../../../types/entry";
import EntryBox from "./entry_box";
import CreateEntry from "./create_entry";
import Link from "next/link";

export default function CollectionPage({ params }: { params: { id: string } }) {
  const [state, dispatch] = useAppReducer();

  const entries = state.entries.filter(
    (entry: IEntry) => entry.collectionId.toString() == params.id
  );

  const createEntry = (link: string) => {
    // api convex call here...

    dispatch({
      type: "CREATE_ENTRY",
      entry: {
        id: 10,
        link: link,
        collectionId: params.id,
      },
    });
  };

  return (
    <div className="space-y-4">
      <Link href="/collections">{"<"} Back to collections</Link>
      <p className="font-semibold text-3xl">collection page {params.id}</p>
      <CreateEntry onCreate={createEntry} />
      {entries.map((entry: IEntry) => (
        <EntryBox key={`entry-${entry.id}`} entry={entry} />
      ))}
    </div>
  );
}
