// Search.tsx

import React from "react";
import { FaTemperatureHalf as TemperatureIcon } from "react-icons/fa6";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { Input } from "@/components/ui/input";

interface SearchProps {
  inputValue: string;
  setInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const Search: React.FC<SearchProps> = ({ inputValue, setInputValue, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center border-b border-solid border-slate-300"
    >
      <TemperatureIcon size={23} />
      <Input
        onChange={setInputValue}
        type="text"
        placeholder="Tokyo, Japan"
        className="text-zinc-300 placeholder:text-zinc-300"
        value={inputValue}
      />
      <button type="submit" className="flex items-center">
        <SearchIcon size={23} />
      </button>
    </form>
  );
};

export default Search;
