"use client";

import { FormEventHandler, MouseEventHandler, useRef, useState } from "react";
import { useAppContext } from "../(context)/context";

const CreateCollection = () => {
  const { createCollection } = useAppContext();

  const [showForm, setShowForm] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!(event.target instanceof HTMLFormElement)) return;

    const newCollectionName = event.target.collection_name.value;
    if (inputRef.current) inputRef.current.value = "";
    createCollection(newCollectionName);
    setShowForm(false);
  };

  const handleOutsideClick: MouseEventHandler<HTMLElement> = (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (
      showForm &&
      event.target.id != "new_collection_form" &&
      (event.target.parentNode as HTMLElement)?.id != "new_collection_form"
    ) {
      if (inputRef.current) inputRef.current.value = "";
      setShowForm(false);
    }
  };

  const Button = (
    <button type="button" className="h-full" onClick={() => setShowForm(true)}>
      + new collection
    </button>
  );

  const Form = (
    <form id="new_collection_form" onSubmit={onSubmit} className="px-4">
      <label htmlFor="collection_name">New Collection Name</label>
      <input
        ref={inputRef}
        id="collection_name"
        name="collection_name"
        type="text"
        className="w-full font-medium text-lg p-2"
        placeholder="e.g. Wishlist #1"
        autoFocus
      />
    </form>
  );

  return (
    <div
      className="w-72 h-96 border-2 border-black flex flex-col items-center justify-center"
      onClick={handleOutsideClick}
    >
      {showForm ? Form : Button}
    </div>
  );
};

export default CreateCollection;
