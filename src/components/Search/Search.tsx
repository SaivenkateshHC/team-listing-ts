import "./Search.scss";

import { FiSearch } from "react-icons/fi";

const Search = () => {

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
      />
    </div>
  );
};

export default Search;
