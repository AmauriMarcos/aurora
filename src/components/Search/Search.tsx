import React from "react";
import { FaTemperatureHalf as TemperatureIcon } from "react-icons/fa6";
import { CiSearch as SearchIcon } from "react-icons/ci";
import { Input } from "@/components/ui/input";

const Search = () => {
  return (
    <div className="flex items-center border-b border-solid border-slate-300">
      <TemperatureIcon size={23} />
      <Input type="text" placeholder="Tokyo, Japan" className="text-zinc-300 placeholder:text-zinc-300" />
      <SearchIcon size={23} />
    </div>
  );
};

export default Search;
