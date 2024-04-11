import { BaseSyntheticEvent } from "react";
import { useSearch } from "../../context/SearchContext";
import "./Search.scss";

import { FiSearch } from "react-icons/fi";

const Search = () => {
  const { searchTerm, setSearchTerm } = useSearch();

  return (
    <div className="search-component gap-2">
      <FiSearch
        width={24}
        height={24}
        style={{ width: "24px", height: "24px" }}
      />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e: BaseSyntheticEvent) => {
          setSearchTerm(e.target.value);
        }}
      />
    </div>
  );
};

export default Search;
