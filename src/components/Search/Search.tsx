import React from "react";
import { FaTemperatureHalf as TemperatureIcon } from "react-icons/fa6";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { Input } from "@/components/ui/input";

interface SearchProps {
  setText: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

const Search: React.FC<SearchProps> = ({ setText, onSubmit }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e); // Keep the original event to get the value
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex items-center border-b border-solid border-slate-300">
      <TemperatureIcon size={23} />
      <Input
        onChange={handleSearchChange} // Use the handle function here
        type="text"
        placeholder="Tokyo, Japan"
        className="text-zinc-300 placeholder:text-zinc-300"
      />
      <SearchIcon size={23} onClick={onSubmit} />
    </form>
  );
};

export default Search;
