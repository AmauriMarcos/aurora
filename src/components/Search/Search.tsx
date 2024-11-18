'use client'
import React from "react";
import { FaTemperatureHalf as TemperatureIcon } from "react-icons/fa6";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { IoMdInformationCircleOutline as InfoIcon } from "react-icons/io";

interface SearchProps {
  inputValue: string;
  setInputValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  apiResponse: object | null;
}

const Search: React.FC<SearchProps> = ({ inputValue, setInputValue, onSubmit, apiResponse }) => {

  return (
    <form
      onSubmit={onSubmit}
      className="flex-col items-center "
    >
      <div className="flex items-center border-b border-solid border-slate-300 ">
        <TemperatureIcon size={23} />
        <Input
          onChange={setInputValue}
          type="text"
          placeholder="City"
          className="text-zinc-300 placeholder:text-zinc-300"
          value={inputValue}
        />
        <button type="submit" className="flex items-center">
          <SearchIcon size={23} />
        </button>
      </div>
      {apiResponse === null &&
        (<div className="flex items-start mt-4 gap-2">
          <InfoIcon className="flex shrink-0" />
          <p className="text-[.675rem] ">For cities with three or fewer letters, please
            include additional information like the country or state to ensure accurate results.
            Example: “Nis, Serbia”</p>
        </div>)}
    </form>
  );
};

export default Search;
