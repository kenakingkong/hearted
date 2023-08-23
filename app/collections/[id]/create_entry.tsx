import { FormEventHandler } from "react";

interface INewEntryProps {
  onCreate: (link: string) => void;
}

const CreateEntry: React.FC<INewEntryProps> = ({ onCreate }) => {
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    if (!(event.target instanceof HTMLFormElement)) return;
    const newLink = event.target.link.value;
    event.target.link.value = "";
    onCreate(newLink);
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
        placeholder="+ paste a link & press enter"
      />
    </form>
  );
};

export default CreateEntry;
