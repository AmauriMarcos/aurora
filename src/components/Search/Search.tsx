// Search.tsx
import React from "react";
import { FaTemperatureHalf as TemperatureIcon } from "react-icons/fa6";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { Input } from "@/components/ui/input";

interface SearchProps {
  setText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>; // Update to ensure the event type is consistent
}

const Search: React.FC<SearchProps> = ({ setText, onSubmit }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e); // Keeping the event to get the value
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(e); // Call the onSubmit function with the event
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex items-center border-b border-solid border-slate-300">
      <TemperatureIcon size={23} />
      <Input
        onChange={handleSearchChange} // Correctly use the handle function
        type="text"
        placeholder="Tokyo, Japan"
        className="text-zinc-300 placeholder:text-zinc-300"
      />
      <button type="submit" className="flex items-center"> {/* Wrap the icon in a button */}
        <SearchIcon size={23} />
      </button>
    </form>
  );
};

export default Search;
