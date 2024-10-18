import React from "react";
import { Input } from "../ui/input";

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  setSearchTerm,
  loading,
}) => {
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative mb-4 flex-1">
      <Input
        type="text"
        placeholder="Search anime..."
        value={searchTerm}
        onChange={handleSearchInputChange}
        className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        disabled={loading}
      />
    </div>
  );
};
