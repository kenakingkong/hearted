"use client";

import { useAppContext } from "../../(context)/context";
import IEntry from "../../../types/entry";
import EntryBox from "./entry_box";
import CreateEntry from "./create_entry";
import Link from "next/link";
import ICollection from "../../../types/collection";

export default function CollectionPage({ params }: { params: { id: string } }) {
  const { state } = useAppContext();

  const collection = state.collections.find(
    (collection: ICollection) => collection.id.toString() === params.id
  );

  const entries = state.entries.filter(
    (entry: IEntry) => entry.collectionId.toString() == params.id
  );

  return (
    <div className="space-y-4">
      <Link href="/collections">{"<"} Back to collections</Link>
      <p className="font-semibold text-3xl">{collection?.title}</p>
      <CreateEntry collectionId={params.id} />
      {entries.map((entry: IEntry) => (
        <EntryBox key={`entry-${entry.id}`} {...entry} />
      ))}
    </div>
  );
}
