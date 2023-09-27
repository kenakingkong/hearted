"use client";

import { useAppContext } from "../../(context)/context";
import IEntry from "../../../types/entry";
import EntryBox from "./entry_box";
import CreateEntry from "./create_entry";
import Link from "next/link";
import ICollection from "../../../types/collection";
import { useEffect, useState } from "react";

export default function CollectionPage({ params }: { params: { id: string } }) {
  const [showEntries, setShowEntries] = useState<boolean>(false);
  const { state } = useAppContext();

  const collection = state.collections.find(
    (collection: ICollection) => collection.id.toString() === params.id
  );

  const entries = state.entries.filter(
    (entry: IEntry) => entry.collectionId.toString() == params.id
  );

  useEffect(() => {
    setTimeout(() => setShowEntries(true), 500);
  }, []);

  return (
    <div className="space-y-4">
      <Link href="/collections">{"<"} Back to collections</Link>
      <p className="font-semibold text-3xl">{collection?.title}</p>
      <CreateEntry collectionId={params.id} />
      {entries.map((entry: IEntry, index: number) => (
        <div
          key={`entry-${entry.id}`}
          className={`transition-all ease-out ${
            showEntries
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          } `}
          style={{ transitionDelay: `${(index + 1) * 100}ms` }}
        >
          <EntryBox {...entry} />
        </div>
      ))}
    </div>
  );
}
