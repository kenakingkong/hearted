import { FormEventHandler } from "react";
import { useAppContext } from "../../(context)/context";

interface ICreateEntryProps {
  collectionId: string;
}

const CreateEntry: React.FC<ICreateEntryProps> = ({ collectionId }) => {
  const { createEntry } = useAppContext();

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!(event.target instanceof HTMLFormElement)) return;
    const newLink = event.target.link.value;
    event.target.link.value = "";
    createEntry(newLink, collectionId);
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="link" className="sr-only">
        Link
      </label>
      <input
        id="link"
        name="link"
        type="url"
        className="border-2 border-black font-medium text-lg p-2 w-full"
        placeholder="paste a link & press enter"
      />
    </form>
  );
};

export default CreateEntry;
